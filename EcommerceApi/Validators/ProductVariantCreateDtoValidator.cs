using FluentValidation;
using EcommerceApi.DTOs;

namespace EcommerceApi.Validators
{
  public class ProductVariantCreateDtoValidator : AbstractValidator<ProductVariantCreateDto>
  {
    public ProductVariantCreateDtoValidator()
    {
      RuleFor(v => v.Color)
        .NotEmpty().WithMessage("Variant color cannot be empty.")
        .MaximumLength(50);

      RuleFor(v => v.Size)
        .NotEmpty().WithMessage("Variant size cannot be empty.")
        .MaximumLength(20);

      RuleFor(v => v.UnitPrice)
        .GreaterThan(0).WithMessage("Variant unit price must be positive.");

      RuleFor(v => v.StockQuantity)
        .GreaterThanOrEqualTo(0).WithMessage("Stock quantity cannot be negative.");
    }
  }
}