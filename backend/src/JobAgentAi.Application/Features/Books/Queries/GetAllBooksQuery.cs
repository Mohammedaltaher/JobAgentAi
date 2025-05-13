using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using JobAgentAi.Application.DTOs;
using JobAgentAi.Domain.Interfaces;
using MediatR;

namespace JobAgentAi.Application.Features.Books.Queries
{
    public class GetAllBooksQuery : IRequest<IEnumerable<BookDto>> { }

    public class GetAllBooksQueryHandler : IRequestHandler<GetAllBooksQuery, IEnumerable<BookDto>>
    {
        private readonly IBookRepository _bookRepository;

        public GetAllBooksQueryHandler(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<BookDto>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
        {
            var books = await _bookRepository.GetAllAsync();
            var bookDtos = new List<BookDto>();

            foreach (var book in books)
            {
                bookDtos.Add(new BookDto(
                    book.Id,
                    book.Title,
                    book.Author,
                    book.PublishedDate,
                    book.ISBN
                ));
            }

            return bookDtos;
        }
    }
}
