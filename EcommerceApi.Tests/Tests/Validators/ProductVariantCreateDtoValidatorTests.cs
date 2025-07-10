using Xunit;
using FluentValidation.TestHelper;
using EcommerceApi.DTOs;
using EcommerceApi.Validators;

namespace EcommerceApi.Tests.Validators
{
  public class ProductVariantCreateDtoValidatorTests
  {
    private readonly ProductVariantCreateDtoValidator _validator;

    public ProductVariantCreateDtoValidatorTests()
    {
      _validator = new ProductVariantCreateDtoValidator();
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void Should_Have_Error_When_Color_Is_Empty(string color)
    {
      var model = new ProductVariantCreateDto { Color = color };
      var result = _validator.TestValidate(model);
      result.ShouldHaveValidationErrorFor(v => v.Color);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void Should_Have_Error_When_Size_Is_Empty(string size)
    {
      var model = new ProductVariantCreateDto { Size = size };
      var result = _validator.TestValidate(model);
      result.ShouldHaveValidationErrorFor(v => v.Size);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-10.50)]
    public void Should_Have_Error_When_UnitPrice_Is_Not_Positive(decimal price)
    {
      var model = new ProductVariantCreateDto { UnitPrice = price };
      var result = _validator.TestValidate(model);
      result.ShouldHaveValidationErrorFor(v => v.UnitPrice);
    }
    
    [Fact]
    public void Should_Have_Error_When_StockQuantity_Is_Negative()
    {
      var model = new ProductVariantCreateDto { StockQuantity = -1 };
      var result = _validator.TestValidate(model);
      result.ShouldHaveValidationErrorFor(v => v.StockQuantity);
    }

    [Fact]
    public void Should_Not_Have_Error_For_Valid_Variant()
    {
      var model = new ProductVariantCreateDto
      {
        Color = "Blue",
        Size = "M",
        UnitPrice = 19.99m,
        StockQuantity = 100
      };
      var result = _validator.TestValidate(model);
      result.ShouldNotHaveAnyValidationErrors();
    }
  }
}