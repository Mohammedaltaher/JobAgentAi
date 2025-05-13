using System.Threading.Tasks;
using JobAgentAi.Application.DTOs;
using JobAgentAi.Application.Features.Books.Commands;
using JobAgentAi.Application.Features.Books.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace JobAgentAi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<BooksController> _logger;

        public BooksController(
            IMediator mediator,
            ILogger<BooksController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _mediator.Send(new GetAllBooksQuery());
            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookDto createBookDto)
        {
            var command = new CreateBookCommand(createBookDto);
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetAll), result);
        }
    }
}
