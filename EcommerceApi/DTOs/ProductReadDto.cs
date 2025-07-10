namespace EcommerceApi.DTOs
{
  public class ProductReadDto
  {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<ProductVariantReadDto> Variants { get; set; } = new();
  }
}