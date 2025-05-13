using JobAgentAi.Application.DTOs;
using FluentValidation;

namespace JobAgentAi.Application.Validators
{
    public class CreateBookDtoValidator : AbstractValidator<CreateBookDto>
    {
        public CreateBookDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters");

            RuleFor(x => x.Author)
                .NotEmpty().WithMessage("Author is required")
                .MaximumLength(100).WithMessage("Author must not exceed 100 characters");

            RuleFor(x => x.ISBN)
                .NotEmpty().WithMessage("ISBN is required")
                .Length(10, 13).WithMessage("ISBN must be between 10 and 13 characters");

            RuleFor(x => x.PublishedDate)
                .NotEmpty().WithMessage("Published date is required")
                .LessThan(DateTime.Now).WithMessage("Published date cannot be in the future");
        }
    }
}
