using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EcommerceApi.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public string ImageUrl { get; set; } = string.Empty;
        public List<string> Sizes { get; set; } = new();
        public List<string> Colors { get; set; } = new();

        [JsonIgnore]
        public List<OrderProduct> OrderProducts { get; set; } = new();
    }
}