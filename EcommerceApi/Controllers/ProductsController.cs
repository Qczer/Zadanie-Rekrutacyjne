using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;       // namespace DbContext
using EcommerceApi.Models;
using EcommerceApi.DTOs;
using AutoMapper;     // namespace modeli

namespace EcommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProductReadDto>>(products));
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReadDto>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return Ok(_mapper.Map<ProductReadDto>(product));
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductReadDto>> PostProduct(ProductCreateDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var readDto = _mapper.Map<ProductReadDto>(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, readDto);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductUpdateDto productDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _mapper.Map(productDto, product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Products.AnyAsync(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}