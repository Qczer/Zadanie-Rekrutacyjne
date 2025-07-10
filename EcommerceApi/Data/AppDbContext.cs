using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using EcommerceApi.Models;
using System.Text.Json;

namespace EcommerceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Product> Products => Set<Product>();
        public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // --- Product and ProductVariant Relationship --- If a product is deleted, its variants are deleted too.
            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductVariants)
                .WithOne(pv => pv.Product)
                .HasForeignKey(pv => pv.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // --- Order and OrderItem Relationship --- If an order is deleted, its items are deleted too.
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // --- ProductVariant and OrderItem Relationship --- Prevent deleting a variant if it's in an order.
            modelBuilder.Entity<ProductVariant>()
                .HasMany(pv => pv.OrderItems)
                .WithOne(oi => oi.ProductVariant)
                .HasForeignKey(oi => oi.ProductVariantId)
                .OnDelete(DeleteBehavior.Restrict);

            // --- Define Composite Key for the OrderItem junction table ---
            modelBuilder.Entity<OrderItem>()
                .HasKey(oi => new { oi.OrderId, oi.ProductVariantId });
        }
    }
}