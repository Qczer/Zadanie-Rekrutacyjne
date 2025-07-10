using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{ 
  public class OrderUpdateDto
  {
    [Required]
    public List<OrderItemCreateDto> Products { get; set; } = new List<OrderItemCreateDto>();
  }
}