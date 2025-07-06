namespace EcommerceApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<OrderProduct> OrderProducts { get; set; } = new();
    }
}