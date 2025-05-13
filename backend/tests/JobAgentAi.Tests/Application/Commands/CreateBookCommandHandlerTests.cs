using JobAgentAi.Application.DTOs;
using JobAgentAi.Application.Features.Books.Commands;
using JobAgentAi.Domain.Entities;
using JobAgentAi.Infrastructure.Data;
using JobAgentAi.Tests;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace JobAgentAi.Tests.Application.Commands
{
    public class CreateBookCommandHandlerTests : TestBase
    {
        [Fact]
        public async Task Handle_ShouldCreateBook()
        {
            // Arrange
            var context = GetDbContext();
            var repository = new BookRepository(context);
            var unitOfWork = new UnitOfWork(context);

            var handler = new CreateBookCommandHandler(repository, unitOfWork);

            var createBookDto = new CreateBookDto(
                "Test Book", 
                "Test Author", 
                DateTime.Now, 
                "1234567890");

            var command = new CreateBookCommand(createBookDto);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().NotBeNull();
            result.Title.Should().Be("Test Book");

            var bookInDb = await context.Books.FirstOrDefaultAsync();
            bookInDb.Should().NotBeNull();
            bookInDb.Title.Should().Be("Test Book");
        }
    }
}
