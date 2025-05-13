using JobAgentAi.Application.DTOs;
using JobAgentAi.Application.Validators;
using FluentValidation.TestHelper;
using Xunit;

namespace JobAgentAi.Tests.Application.Validators
{
    public class CreateBookDtoValidatorTests
    {
        private readonly CreateBookDtoValidator _validator;

        public CreateBookDtoValidatorTests()
        {
            _validator = new CreateBookDtoValidator();
        }

        [Fact]
        public void Should_Have_Error_When_Title_Is_Empty()
        {
            var model = new CreateBookDto("", "Author", DateTime.Now, "1234567890");
            var result = _validator.TestValidate(model);
            result.ShouldHaveValidationErrorFor(x => x.Title);
        }

        [Fact]
        public void Should_Not_Have_Error_When_All_Fields_Are_Valid()
        {
            var model = new CreateBookDto("Title", "Author", DateTime.Now, "1234567890");
            var result = _validator.TestValidate(model);
            result.ShouldNotHaveAnyValidationErrors();
        }
    }
}
