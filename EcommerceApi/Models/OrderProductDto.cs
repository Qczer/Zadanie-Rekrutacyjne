namespace EcommerceApi.Models
{

  public class OrderProductDto
  {
    public int ProductId { get; set; }
    public string ProductName { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
  }
}