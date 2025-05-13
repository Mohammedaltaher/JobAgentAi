using JobAgentAi.Api;
using JobAgentAi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace JobAgentAi.Tests
{
    public abstract class TestBase
    {
        protected JobAgentAiContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<JobAgentAiContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new JobAgentAiContext(options);
            context.Database.EnsureCreated();

            return context;
        }

        protected ServiceProvider GetServiceProvider(JobAgentAiContext context)
        {
            var services = new ServiceCollection();

            services.AddSingleton(context);
            services.AddLogging();

            return services.BuildServiceProvider();
        }
    }
}
