using JobAgentAi.Application.Validators;
using JobAgentAi.Infrastructure.Data;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using JobAgentAi.Domain.Interfaces;
using JobAgentAi.Api.Middleware;
using JobAgentAi.Domain.Entities;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Builder; // Add this using directive

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddFluentValidation(fv => 
    {
        fv.RegisterValidatorsFromAssemblyContaining<CreateBookDtoValidator>();
        fv.DisableDataAnnotationsValidation = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Ensure the Swashbuckle.AspNetCore NuGet package is installed in your project.
// Run the following command in the terminal if it's not installed:
// dotnet add package Swashbuckle.AspNetCore
// Add MediatR
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Add DbContext
builder.Services.AddDbContext<JobAgentAiContext>(options =>
    options.UseInMemoryDatabase("JobAgentAiDb"));

// Add Infrastructure Services
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwagger();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<JobAgentAiContext>();
    
    if (!context.Books.Any())
    {
        context.Books.AddRange(
            new Book("Clean Code", "Robert C. Martin", new DateTime(2008, 8, 1), "9780132350884"),
            new Book("Domain-Driven Design", "Eric Evans", new DateTime(2003, 8, 30), "9780321125217")
        );
        context.SaveChanges();
    }
}

app.Run();
