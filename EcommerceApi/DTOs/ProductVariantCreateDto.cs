using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{
  public class ProductVariantCreateDto
  {
    [Required]
    public string Color { get; set; } = string.Empty;

    [Required]
    public string Size { get; set; } = string.Empty;

    [Required, Range(0.01, double.MaxValue)]
    public decimal UnitPrice { get; set; }
    
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
  }
}