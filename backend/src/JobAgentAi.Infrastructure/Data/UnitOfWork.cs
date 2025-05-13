using System.Threading.Tasks;
using JobAgentAi.Domain.Interfaces;

namespace JobAgentAi.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly JobAgentAiContext _context;

        public UnitOfWork(JobAgentAiContext context)
        {
            _context = context;
        }

        public async Task<bool> CommitAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
