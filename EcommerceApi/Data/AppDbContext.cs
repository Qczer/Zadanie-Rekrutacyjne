using Microsoft.EntityFrameworkCore;
using EcommerceApi.Models;
using System.Text.Json;

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
            // Klucz złożony do tabeli łączącej
            modelBuilder.Entity<OrderProduct>()
                .HasKey(oi => new { oi.OrderId, oi.ProductId });

            // Relacje
            modelBuilder.Entity<OrderProduct>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(oi => oi.ProductId);

            // NOWA KONFIGURACJA DLA LIST W PRODUKCIE
            // Konwersja listy stringów (Sizes i Colors) na string JSON i z powrotem
            var options = new JsonSerializerOptions();

            modelBuilder.Entity<Product>()
                .Property(p => p.Sizes)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, options),
                    v => JsonSerializer.Deserialize<List<string>>(v, options) ?? new List<string>()
                );

            modelBuilder.Entity<Product>()
                .Property(p => p.Colors)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, options),
                    v => JsonSerializer.Deserialize<List<string>>(v, options) ?? new List<string>()
                );
        }
    }
}