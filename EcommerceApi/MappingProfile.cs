using AutoMapper;
using EcommerceApi.Models;
using EcommerceApi.DTOs;

namespace EcommerceApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Product and Variant Mappings
            CreateMap<ProductVariant, ProductVariantReadDto>();
            CreateMap<ProductVariantCreateDto, ProductVariant>();

            CreateMap<ProductCreateDto, Product>()
                .ForMember(dest => dest.ProductVariants, opt => opt.MapFrom(src => src.Variants));

            CreateMap<ProductUpdateDto, Product>();

            CreateMap<Product, ProductReadDto>()
                .ForMember(dest => dest.Variants, opt => opt.MapFrom(src => src.ProductVariants));

            CreateMap<OrderItem, OrderItemReadDto>()
                .ForMember(dest => dest.ProductVariantId, opt => opt.MapFrom(src => src.ProductVariantId))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.ProductVariant.Product.Name))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.ProductVariant.Color))
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.ProductVariant.Size));

            CreateMap<Order, OrderReadDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.OrderItems))
                .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.OrderItems.Sum(oi => oi.Quantity * oi.UnitPrice)));
        }
    }
}
