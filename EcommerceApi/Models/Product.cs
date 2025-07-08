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
        [JsonIgnore]
        public List<OrderProduct> OrderProducts { get; set; } = new();
    }
}