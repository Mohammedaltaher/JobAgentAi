using JobAgentAi.Application.DTOs;
using JobAgentAi.Domain.Entities;
using JobAgentAi.Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace JobAgentAi.Application.Features.Books.Commands
{
    public class CreateBookCommand : IRequest<BookDto>
    {
        public CreateBookDto CreateBookDto { get; }

        public CreateBookCommand(CreateBookDto createBookDto)
        {
            CreateBookDto = createBookDto;
        }
    }

    public class CreateBookCommandHandler : IRequestHandler<CreateBookCommand, BookDto>
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateBookCommandHandler(
            IBookRepository bookRepository,
            IUnitOfWork unitOfWork)
        {
            _bookRepository = bookRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<BookDto> Handle(CreateBookCommand request, CancellationToken cancellationToken)
        {
            var book = new Book(
                request.CreateBookDto.Title,
                request.CreateBookDto.Author,
                request.CreateBookDto.PublishedDate,
                request.CreateBookDto.ISBN
            );

            await _bookRepository.AddAsync(book);
            await _unitOfWork.CommitAsync();

            return new BookDto(
                book.Id,
                book.Title,
                book.Author,
                book.PublishedDate,
                book.ISBN
            );
        }
    }
}
