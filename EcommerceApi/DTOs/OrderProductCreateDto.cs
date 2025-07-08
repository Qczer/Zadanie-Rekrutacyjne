using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{

  public class OrderProductCreateDto
  {
    [Required]
    public int ProductId { get; set; }
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
    [Range(0.01, double.MaxValue)]
    public decimal UnitPrice { get; set; }
  }
}