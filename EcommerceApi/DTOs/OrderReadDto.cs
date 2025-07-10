namespace EcommerceApi.DTOs
{
  public class OrderReadDto
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItemReadDto> Items { get; set; } = new();
    public decimal TotalAmount { get; set; }
  }
}