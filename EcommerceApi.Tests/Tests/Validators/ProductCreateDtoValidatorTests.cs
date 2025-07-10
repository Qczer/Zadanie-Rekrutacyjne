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

        // --- Tests for Product-level properties ---

        [Fact]
        public void Should_Have_Error_When_Name_Is_Empty()
        {
            var model = new ProductCreateDto { Name = "" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.Name)
                .WithErrorMessage("Product name is required.");
        }

        [Fact]
        public void Should_Not_Have_Error_When_Name_Is_Specified()
        {
            var model = new ProductCreateDto { Name = "Test Product", Variants = { new ProductVariantCreateDto { Color="Red", Size="S", UnitPrice=1, StockQuantity=1} } };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.Name);
        }

        [Fact]
        public void Should_Have_Error_When_ImageUrl_Is_Invalid()
        {
            var model = new ProductCreateDto { ImageUrl = "not-a-valid-url" };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.ImageUrl)
                .WithErrorMessage("The provided Image URL is not a valid URL.");
        }

        [Fact]
        public void Should_Not_Have_Error_When_ImageUrl_Is_Valid_Http()
        {
            var model = new ProductCreateDto { ImageUrl = "http://example.com/image.jpg" };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.ImageUrl);
        }

        [Fact]
        public void Should_Not_Have_Error_When_ImageUrl_Is_Local_Asset()
        {
            var model = new ProductCreateDto { ImageUrl = "assets/images/local.png" };
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveValidationErrorFor(p => p.ImageUrl);
        }

        // --- Tests for the Variants list ---

        [Fact]
        public void Should_Have_Error_When_Variants_List_Is_Empty()
        {
            var model = new ProductCreateDto
            {
                Name = "Product with no variants",
                Variants = new List<ProductVariantCreateDto>() // Empty list
            };
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(p => p.Variants)
                .WithErrorMessage("A product must have at least one variant.");
        }

        [Fact]
        public void Should_Have_Error_When_A_Variant_In_The_List_Is_Invalid()
        {
            // This test ensures the nested validator is working.
            var model = new ProductCreateDto
            {
                Name = "Test Product",
                Variants = new List<ProductVariantCreateDto>
                {
                    new() { Color = "Blue", Size = "M", UnitPrice = 19.99m, StockQuantity = 10 },
                    new() { Color = "", Size = "L", UnitPrice = 19.99m, StockQuantity = 5 } // Invalid variant
                }
            };
            var result = _validator.TestValidate(model);

            // Check for the specific error from the nested validator
            result.ShouldHaveValidationErrorFor("Variants[1].Color")
                .WithErrorMessage("Variant color cannot be empty.");
        }

        [Fact]
        public void Should_Not_Have_Any_Errors_For_A_Completely_Valid_ProductCreateDto()
        {
            var model = new ProductCreateDto
            {
                Name = "Fully Valid Product",
                Description = "A great product.",
                ImageUrl = "https://example.com/image.jpg",
                Variants = new List<ProductVariantCreateDto>
                {
                    new() { Color = "Red", Size = "S", UnitPrice = 29.99m, StockQuantity = 100 }
                }
            };

            var result = _validator.TestValidate(model);
            result.ShouldNotHaveAnyValidationErrors();
        }
    }
}