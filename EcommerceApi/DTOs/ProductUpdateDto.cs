using System.ComponentModel.DataAnnotations;

namespace EcommerceApi.DTOs
{
    public class ProductUpdateDto
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
