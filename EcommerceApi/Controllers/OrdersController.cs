using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;       // namespace DbContext
using EcommerceApi.Models;     // namespace modeli
using EcommerceApi.DTOs;
using AutoMapper;     // namespace DTO

namespace EcommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderReadDto>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderProducts)
                    .ThenInclude(op => op.Product)
                .ToListAsync();

            var ordersDto = _mapper.Map<List<OrderReadDto>>(orders);

            return Ok(ordersDto);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderReadDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderProducts)
                    .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            var orderDto = _mapper.Map<OrderReadDto>(order);

            return Ok(orderDto);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<OrderReadDto>> PostOrder([FromBody] OrderCreateDto orderDto)
        {
            if (orderDto.Products == null || !orderDto.Products.Any())
                return BadRequest("Lista produktów nie może być pusta.");

            var order = new Order
            {
                CreatedAt = DateTime.UtcNow,
                OrderProducts = new List<OrderProduct>()
            };

            foreach (var item in orderDto.Products)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    return BadRequest($"Produkt o ID {item.ProductId} nie istnieje.");

                order.OrderProducts.Add(new OrderProduct
                {
                    Product = product,
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Mapowanie Order na OrderReadDto
            var orderReadDto = _mapper.Map<OrderReadDto>(order);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, orderReadDto);
        }


        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, [FromBody] OrderCreateDto orderDto)
        {
            if (orderDto.Products == null || !orderDto.Products.Any())
                return BadRequest("Lista produktów nie może być pusta.");

            var order = await _context.Orders
                .Include(o => o.OrderProducts)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            // Stara lista produktów
            var existingOrderProducts = order.OrderProducts.ToList();

            // Nowe dane wejściowe
            var updatedProducts = orderDto.Products;

            // Aktualizacja istniejących i dodawanie nowych
            foreach (var item in updatedProducts)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    return BadRequest($"Produkt o ID {item.ProductId} nie istnieje.");

                var existing = existingOrderProducts.FirstOrDefault(op => op.ProductId == item.ProductId);
                if (existing != null)
                {
                    // Zaktualizuj ilość i cenę
                    existing.Quantity = item.Quantity;
                    existing.UnitPrice = product.Price;
                    existingOrderProducts.Remove(existing); // usunięty z listy "do usunięcia"
                }
                else
                {
                    // Dodaj nowy produkt do zamówienia
                    order.OrderProducts.Add(new OrderProduct
                    {
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    });
                }
            }

            // Usuń produkty, które nie są już w zamówieniu
            foreach (var toRemove in existingOrderProducts)
            {
                _context.OrderProducts.Remove(toRemove);
            }
            
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}