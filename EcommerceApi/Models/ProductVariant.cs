using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EcommerceApi.Models
{
    public class ProductVariant
    {
      public int Id { get; set; }

      public int ProductId { get; set; }
      [JsonIgnore]
      public Product Product { get; set; } = null!;

      [Required]
      public string Size { get; set; } = string.Empty;

      [Required]
      public string Color { get; set; } = string.Empty;

      [Required]
      [Column(TypeName = "decimal(18, 2)")]
      public decimal UnitPrice { get; set; }

      public int StockQuantity { get; set; }

      [JsonIgnore]
      public List<OrderItem> OrderItems { get; set; } = new();
    }
}