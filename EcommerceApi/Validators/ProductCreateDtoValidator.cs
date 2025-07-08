using FluentValidation;
using EcommerceApi.DTOs;

namespace EcommerceApi.Validators
{
  public class ProductCreateDtoValidator : AbstractValidator<ProductCreateDto>
  {
    public ProductCreateDtoValidator()
    {
      RuleFor(p => p.Name).NotEmpty().MaximumLength(100);
      RuleFor(p => p.Price).GreaterThan(0);
    }
  }
}