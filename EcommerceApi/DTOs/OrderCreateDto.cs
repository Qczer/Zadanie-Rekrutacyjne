using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{ 
  public class OrderCreateDto
  {
    [Required, MinLength(1)]
    public List<OrderItemCreateDto> Items { get; set; } = new();
  }
}