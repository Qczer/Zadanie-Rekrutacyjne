using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{ 
  public class OrderUpdateDto
  {
    [Required]
    public List<OrderProductCreateDto> Products { get; set; } = new List<OrderProductCreateDto>();
  }
}