namespace EcommerceApi.Models
{
  public class OrderDto
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderProductDto> Products { get; set; } = null!;
  }
}