using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{

  public class OrderProductCreateDto
  {
    [Required]
    public int ProductVariantId { get; set; }

    [Required]
    [Range(1, 100, ErrorMessage = "Quantity must be between 1 and 100.")]
    public int Quantity { get; set; }
  }
}