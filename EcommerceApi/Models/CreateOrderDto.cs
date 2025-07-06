namespace EcommerceApi.Models
{ 
  public class CreateOrderDto
  {
    public List<CreateOrderProductDto> Products { get; set; } = null!;
  }
}