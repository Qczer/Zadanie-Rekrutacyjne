using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{ 
  public class OrderCreateDto
  {
    [Required]
    public List<OrderProductCreateDto> Products { get; set; } = new List<OrderProductCreateDto>();
  }
}