namespace EcommerceApi.DTOs
{
  public class OrderReadDto
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderProductReadDto> Products { get; set; } = new List<OrderProductReadDto>();
  }
}