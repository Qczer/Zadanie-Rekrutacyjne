using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public List<ProductVariant> ProductVariants { get; set; } = new();
    }
}