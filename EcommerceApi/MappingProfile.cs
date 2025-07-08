using AutoMapper;
using EcommerceApi.Models;
using EcommerceApi.DTOs;

namespace EcommerceApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Product
            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();

            // OrderProduct
            CreateMap<OrderProductCreateDto, OrderProduct>();
            CreateMap<OrderProduct, OrderProductReadDto>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));
                
            // Order
            CreateMap<Order, OrderReadDto>();
            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.OrderProducts, opt => opt.Ignore()); // bo mapujesz ręcznie w kontrolerze
        }
    }
}
