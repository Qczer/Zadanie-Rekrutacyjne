using FluentValidation;
using EcommerceApi.DTOs;
using System;

namespace EcommerceApi.Validators
{
  public class ProductUpdateDtoValidator : AbstractValidator<ProductUpdateDto>
  {
    public ProductUpdateDtoValidator()
    {
      RuleFor(p => p.Name)
        .NotEmpty().WithMessage("Product name is required.")
        .MaximumLength(100);
      
      RuleFor(p => p.Description)
        .MaximumLength(1000).WithMessage("Description cannot exceed 1000 characters.");

      RuleFor(p => p.ImageUrl)
        .Must(BeAValidUrl).WithMessage("The provided Image URL is not a valid URL.")
        .When(p => !string.IsNullOrEmpty(p.ImageUrl)); // Only validate if a URL is provided.
    }

    private bool BeAValidUrl(string url)
    {
      if (string.IsNullOrEmpty(url)) return true; // Allow empty
      if (url.StartsWith("assets")) return true;   // Allow local asset paths

      return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
        && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
  }
}