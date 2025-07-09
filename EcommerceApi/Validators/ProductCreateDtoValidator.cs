using FluentValidation;
using EcommerceApi.DTOs;
using System;

namespace EcommerceApi.Validators
{
  public class ProductCreateDtoValidator : AbstractValidator<ProductCreateDto>
  {
    public ProductCreateDtoValidator()
    {
      RuleFor(p => p.Name).NotEmpty().MaximumLength(100);
      RuleFor(p => p.Price).GreaterThan(0);

      RuleFor(p => p.ImageUrl)
        .NotEmpty().WithMessage("URL obrazka jest wymagany.")
        .Must(BeAValidUrl).WithMessage("Podany URL obrazka jest nieprawidłowy.");

      RuleFor(p => p.Sizes)
        .NotNull().WithMessage("Lista rozmiarów nie może być nullem.");

      RuleForEach(p => p.Sizes)
        .NotEmpty().WithMessage("Rozmiar nie może być pusty.");

      RuleFor(p => p.Colors)
        .NotNull().WithMessage("Lista kolorów nie może być nullem.");

      RuleForEach(p => p.Colors)
        .NotEmpty().WithMessage("Kolor nie może być pusty.");
    }

    // Prywatna metoda pomocnicza do walidacji URL
    private bool BeAValidUrl(string url)
    {
      if (url.StartsWith("assets")) return true;
      return Uri.TryCreate(url, UriKind.Absolute, out _);
    }
  }
}