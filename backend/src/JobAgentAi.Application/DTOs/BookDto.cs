using System;

namespace JobAgentAi.Application.DTOs
{
    public record BookDto(
        int Id,
        string Title,
        string Author,
        DateTime PublishedDate,
        string ISBN
    );
}
