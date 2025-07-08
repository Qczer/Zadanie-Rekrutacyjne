using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EcommerceApi.Models
{
    public class OrderProduct
    {
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }
        [Range(0.01, int.MaxValue, ErrorMessage = "Unit price must be positive.")]
        public decimal UnitPrice { get; set; }
    }
}