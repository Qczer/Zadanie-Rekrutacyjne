using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{

  public class OrderItemCreateDto
  {
    [Required]
    public int ProductVariantId { get; set; }

    [Required, Range(1, 100)]
    public int Quantity { get; set; }
  }
}