using JobAgentAi.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace JobAgentAi.Infrastructure.Data
{
    public class JobAgentAiContext : DbContext
    {
        public JobAgentAiContext(DbContextOptions<JobAgentAiContext> options) 
            : base(options) { }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().HasKey(b => b.Id);
            modelBuilder.Entity<Book>().Property(b => b.Title).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.Author).IsRequired();
            modelBuilder.Entity<Book>().Property(b => b.ISBN).IsRequired();
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
