namespace EcommerceApi.DTOs
{
  public class ProductVariantReadDto
  {
    public int Id { get; set; }
    public string Color { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int StockQuantity { get; set; }
  }
}