using System.Collections.Generic;
using System.Threading.Tasks;
using JobAgentAi.Domain.Entities;
using JobAgentAi.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobAgentAi.Infrastructure.Data
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly JobAgentAiContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(JobAgentAiContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
        public async Task UpdateAsync(T entity) => _dbSet.Update(entity);
        public async Task DeleteAsync(T entity) => _dbSet.Remove(entity);
    }
}
