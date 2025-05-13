using System;
using System.ComponentModel.DataAnnotations;

namespace JobAgentAi.Application.DTOs
{
    public record CreateBookDto(
        [Required] string Title,
        [Required] string Author,
        [Required] DateTime PublishedDate,
        [Required] string ISBN
    );
}
