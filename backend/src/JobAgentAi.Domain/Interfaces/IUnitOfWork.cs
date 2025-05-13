using System.Threading.Tasks;

namespace JobAgentAi.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> CommitAsync();
    }
}
