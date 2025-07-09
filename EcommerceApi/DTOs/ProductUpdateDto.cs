using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{
    public class ProductUpdateDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public string ImageUrl { get; set; } = string.Empty;
        public List<string> Sizes { get; set; } = new();
        public List<string> Colors { get; set; } = new();
    }
}
