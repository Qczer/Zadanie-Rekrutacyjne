using Xunit;
using FluentValidation.TestHelper;
using EcommerceApi.DTOs;
using EcommerceApi.Validators;
using System.Collections.Generic;

namespace EcommerceApi.Tests.Validators
{
    public class ProductCreateDtoValidatorTests
    {
        private readonly ProductCreateDtoValidator _validator;

        public ProductCreateDtoValidatorTests()
        {
            _validator = new ProductCreateDtoValidator();
        }

        [Fact]
        public void Should_Have_Error_When_Name_Is_Empty()
        {
            var model = new ProductCreateDto { Name = "" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.Name);
        }

        [Fact]
        public void Should_Not_Have_Error_When_Name_Is_Specified()
        {
            var model = new ProductCreateDto { Name = "Test Product" };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.Name);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-10)]
        public void Should_Have_Error_When_Price_Is_Not_Positive(decimal price)
        {
            var model = new ProductCreateDto { Price = price };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.Price);
        }

        // --- TESTY DLA NOWYCH PÓL ---

        [Fact]
        public void Should_Have_Error_When_ImageUrl_Is_Empty()
        {
            var model = new ProductCreateDto { ImageUrl = "" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.ImageUrl);
        }

        [Fact]
        public void Should_Have_Error_When_ImageUrl_Is_Invalid()
        {
            var model = new ProductCreateDto { ImageUrl = "not-a-valid-url" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.ImageUrl)
                .WithErrorMessage("Podany URL obrazka jest nieprawidłowy.");
        }

        [Fact]
        public void Should_Not_Have_Error_When_ImageUrl_Is_Valid()
        {
            var model = new ProductCreateDto { ImageUrl = "https://example.com/image.jpg" };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.ImageUrl);
        }

        [Fact]
        public void Should_Have_Error_When_Sizes_List_Contains_Empty_String()
        {
            var model = new ProductCreateDto { Sizes = new List<string> { "S", "", "L" } };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor("Sizes[1]") // FluentValidation wskazuje na konkretny element
                .WithErrorMessage("Rozmiar nie może być pusty.");
        }

        [Fact]
        public void Should_Not_Have_Error_For_Valid_Sizes_List()
        {
            var model = new ProductCreateDto { Sizes = new List<string> { "S", "M", "L" } };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.Sizes);
        }

        [Fact]
        public void Should_Not_Have_Error_When_Colors_List_Is_Empty()
        {
            // Pusta lista jest dozwolona, błąd jest tylko gdy jest null lub zawiera puste stringi
            var model = new ProductCreateDto { Colors = new List<string>() };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.Colors);
        }
    }
}