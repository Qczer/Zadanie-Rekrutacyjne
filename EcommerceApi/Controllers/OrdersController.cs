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
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                .ToListAsync();

            return Ok(_mapper.Map<List<OrderReadDto>>(orders));
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderReadDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return NotFound();

            return Ok(_mapper.Map<OrderReadDto>(order));
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<OrderReadDto>> PostOrder([FromBody] OrderCreateDto orderDto)
        {
            var newOrder = new Order { CreatedAt = DateTime.UtcNow };

            foreach (var itemDto in orderDto.Items)
            {
                var variant = await _context.ProductVariants
                    .FirstOrDefaultAsync(v => v.Id == itemDto.ProductVariantId);

                if (variant == null)
                    return BadRequest($"Product variant with ID {itemDto.ProductVariantId} not found.");

                if (variant.StockQuantity < itemDto.Quantity)
                    return BadRequest($"Not enough stock for product variant ID {itemDto.ProductVariantId}. Available: {variant.StockQuantity}");

                var orderItem = new OrderItem
                {
                    ProductVariantId = variant.Id,
                    Quantity = itemDto.Quantity,
                    UnitPrice = variant.UnitPrice // Use the price from the variant
                };
                newOrder.OrderItems.Add(orderItem);

                // Decrease stock
                variant.StockQuantity -= itemDto.Quantity;
            }

            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            var createdOrder = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.ProductVariant)
                        .ThenInclude(pv => pv.Product)
                .FirstAsync(o => o.Id == newOrder.Id);

            var orderReadDto = _mapper.Map<OrderReadDto>(createdOrder);

            return CreatedAtAction(nameof(GetOrder), new { id = orderReadDto.Id }, orderReadDto);
        }


        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, [FromBody] OrderCreateDto orderDto)
        {
            // Use a database transaction to ensure atomicity.
            // All changes will be saved together, or all will be rolled back if an error occurs.
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 1. Fetch the existing order with its current items
                var order = await _context.Orders
                    .Include(o => o.OrderItems) // We need the old items to adjust stock
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (order == null)
                {
                    // No need to roll back, as no changes were made.
                    return NotFound($"Order with ID {id} not found.");
                }

                // 2. Return the stock from all the old items in the order
                foreach (var oldItem in order.OrderItems)
                {
                    var variant = await _context.ProductVariants.FindAsync(oldItem.ProductVariantId);
                    // It's good practice to check if the variant still exists
                    if (variant != null)
                    {
                        variant.StockQuantity += oldItem.Quantity;
                    }
                }
                
                // 3. Remove all old items from the order.
                // EF Core will track these for deletion.
                _context.OrderItems.RemoveRange(order.OrderItems);


                // 4. Now, process the updated list of items as if it were a new order
                if (orderDto.Items == null || !orderDto.Items.Any())
                {
                    // If the updated order is empty, we just save the changes (which will delete all items)
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return NoContent(); // The order is now empty
                }

                foreach (var newItemDto in orderDto.Items)
                {
                    var variant = await _context.ProductVariants.FindAsync(newItemDto.ProductVariantId);

                    if (variant == null)
                    {
                        await transaction.RollbackAsync(); // Abort the transaction
                        return BadRequest($"Product variant with ID {newItemDto.ProductVariantId} not found.");
                    }

                    // Check if there's enough stock for the new/updated quantity
                    if (variant.StockQuantity < newItemDto.Quantity)
                    {
                        await transaction.RollbackAsync(); // Abort the transaction
                        return BadRequest($"Not enough stock for variant {variant.Id}. Available: {variant.StockQuantity}, Requested: {newItemDto.Quantity}.");
                    }

                    // Deduct the new stock quantity
                    variant.StockQuantity -= newItemDto.Quantity;

                    // Create the new order item and add it to the order
                    var newOrderItem = new OrderItem
                    {
                        OrderId = order.Id,
                        ProductVariantId = newItemDto.ProductVariantId,
                        Quantity = newItemDto.Quantity,
                        UnitPrice = variant.UnitPrice // Get the current price
                    };
                    // Add to the context directly, as we are managing the relationship.
                    _context.OrderItems.Add(newOrderItem);
                }
                
                // 5. Save all the tracked changes (stock updates, item deletions, item additions)
                await _context.SaveChangesAsync();

                // 6. If everything succeeded, commit the transaction
                await transaction.CommitAsync();

                return NoContent(); // Standard success response for a PUT request
            }
            catch (Exception ex)
            {
                // If any error occurred at any step, roll back the entire transaction
                await transaction.RollbackAsync();
                
                // Log the exception (using a proper logging framework is recommended)
                Console.WriteLine($"Error updating order: {ex.Message}");
                
                // Return a generic server error
                return StatusCode(500, "An internal error occurred. The order was not updated.");
            }
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}