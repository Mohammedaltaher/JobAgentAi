using System.Threading.Tasks;
using JobAgentAi.Domain.Entities;
using JobAgentAi.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobAgentAi.Infrastructure.Data
{
    public class BookRepository : Repository<Book>, IBookRepository
    {
        public BookRepository(JobAgentAiContext context) : base(context) { }

        public async Task<Book> GetByIsbnAsync(string isbn)
        {
            return await _context.Books
                .FirstOrDefaultAsync(b => b.ISBN == isbn);
        }
    }
}
