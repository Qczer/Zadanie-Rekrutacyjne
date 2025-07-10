namespace EcommerceApi.DTOs
{
  public class OrderItemReadDto
  {
    public int ProductVariantId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
  }
}