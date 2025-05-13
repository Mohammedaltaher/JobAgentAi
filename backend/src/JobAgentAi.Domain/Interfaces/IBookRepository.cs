using System.Threading.Tasks;
using JobAgentAi.Domain.Entities;

namespace JobAgentAi.Domain.Interfaces
{
    public interface IBookRepository : IRepository<Book>
    {
        Task<Book> GetByIsbnAsync(string isbn);
    }
}
