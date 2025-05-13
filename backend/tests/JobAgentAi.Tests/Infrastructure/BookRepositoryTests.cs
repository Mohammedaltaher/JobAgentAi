using JobAgentAi.Domain.Entities;
using JobAgentAi.Infrastructure.Data;
using JobAgentAi.Tests;
using FluentAssertions;
using Xunit;

namespace JobAgentAi.Tests.Infrastructure
{
    public class BookRepositoryTests : TestBase
    {
        [Fact]
        public async Task AddAsync_ShouldAddBook()
        {
            // Arrange
            var context = GetDbContext();
            var repository = new BookRepository(context);

            var book = new Book("Test Book", "Test Author", DateTime.Now, "1234567890");

            // Act
            await repository.AddAsync(book);
            await context.SaveChangesAsync();

            // Assert
            var result = await repository.GetByIdAsync(book.Id);
            result.Should().NotBeNull();
            result.Title.Should().Be("Test Book");
        }

        [Fact]
        public async Task GetByIsbnAsync_ShouldReturnBook()
        {
            // Arrange
            var context = GetDbContext();
            var repository = new BookRepository(context);

            var book = new Book("Test Book", "Test Author", DateTime.Now, "1234567890");
            await repository.AddAsync(book);
            await context.SaveChangesAsync();

            // Act
            var result = await repository.GetByIsbnAsync("1234567890");

            // Assert
            result.Should().NotBeNull();
            result.ISBN.Should().Be("1234567890");
        }
    }
}
