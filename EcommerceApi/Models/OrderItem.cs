using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EcommerceApi.Models
{
    public class OrderItem
    {
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; } = null!;

        public int ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; } = null!;

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
        
        [Column(TypeName = "decimal(18, 2)")]
        public decimal UnitPrice { get; set; }
    }
}