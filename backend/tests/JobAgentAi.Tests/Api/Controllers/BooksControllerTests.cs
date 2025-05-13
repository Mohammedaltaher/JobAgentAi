using JobAgentAi.Application.DTOs;
using JobAgentAi.Application.Features.Books.Commands;
using JobAgentAi.Application.Features.Books.Queries;
using JobAgentAi.Api.Controllers;
using JobAgentAi.Domain.Entities;
using JobAgentAi.Infrastructure.Data;
using JobAgentAi.Tests;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Microsoft.Extensions.Logging;

namespace JobAgentAi.Tests.Api.Controllers
{
    public class BooksControllerTests : TestBase
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly BooksController _controller;

        public BooksControllerTests()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new BooksController(_mediatorMock.Object, Mock.Of<ILogger<BooksController>>());
        }

        [Fact]
        public async Task GetAll_ShouldReturnBooks()
        {
            // Arrange
            var books = new List<BookDto>
            {
                new BookDto(1, "Book 1", "Author 1", DateTime.Now, "1234567890"),
                new BookDto(2, "Book 2", "Author 2", DateTime.Now, "0987654321")
            };

            _mediatorMock.Setup(m => m.Send(It.IsAny<GetAllBooksQuery>(), default))
                .ReturnsAsync(books);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Value.Should().BeEquivalentTo(books);
        }

        [Fact]
        public async Task Create_ShouldReturnCreated()
        {
            // Arrange
            var createBookDto = new CreateBookDto("Book 1", "Author 1", DateTime.Now, "1234567890");
            var bookDto = new BookDto(1, "Book 1", "Author 1", DateTime.Now, "1234567890");

            _mediatorMock.Setup(m => m.Send(It.IsAny<CreateBookCommand>(), default))
                .ReturnsAsync(bookDto);

            // Act
            var result = await _controller.Create(createBookDto);

            // Assert
            var createdAtActionResult = result as CreatedAtActionResult;
            createdAtActionResult.Should().NotBeNull();
            createdAtActionResult.Value.Should().BeEquivalentTo(bookDto);
        }
    }
}
