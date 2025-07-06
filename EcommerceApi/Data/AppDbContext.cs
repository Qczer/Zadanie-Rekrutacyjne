using Microsoft.EntityFrameworkCore;
using EcommerceApi.Models;

namespace EcommerceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderProduct> OrderProducts => Set<OrderProduct>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>()
                .HasKey(oi => new { oi.OrderId, oi.ProductId });

            modelBuilder.Entity<OrderProduct>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(oi => oi.ProductId);
        }
    }
}