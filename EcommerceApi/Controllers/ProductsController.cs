using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data; // namespace DbContext
using EcommerceApi.Models; // namespace modeli
using EcommerceApi.DTOs;
using AutoMapper;

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
            var products = await _context.Products
                .Include(p => p.ProductVariants)
                .ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProductReadDto>>(products));
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReadDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.ProductVariants)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return NotFound();

            return Ok(_mapper.Map<ProductReadDto>(product));
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductReadDto>> PostProduct(ProductCreateDto productDto)
        {
            // Step 1: Map the DTO to the domain models.
            // This creates the Product and its list of ProductVariants in memory.
            var product = _mapper.Map<Product>(productDto);

            // Step 2: Add the entire object graph to the context and save.
            // EF Core is smart enough to save the product and all its variants.
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // --- THE FIX IS HERE ---

            // Step 3: Re-query the database for the product we just created.
            // Crucially, we must use .Include() to explicitly load the related variants
            // to ensure they are present for the response DTO.
            var createdProductWithVariants = await _context.Products
                .Include(p => p.ProductVariants)
                .FirstAsync(p => p.Id == product.Id);

            // Step 4: Map the newly fetched, fully loaded entity to our response DTO.
            var readDto = _mapper.Map<ProductReadDto>(createdProductWithVariants);

            return CreatedAtAction(nameof(GetProduct), new { id = readDto.Id }, readDto);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductUpdateDto productDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _mapper.Map(productDto, product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}