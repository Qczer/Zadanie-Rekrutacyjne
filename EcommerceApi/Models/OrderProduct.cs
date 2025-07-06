using System.Text.Json.Serialization;

namespace EcommerceApi.Models
{
    public class OrderProduct
    {
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}