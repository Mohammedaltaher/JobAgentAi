using System;

namespace JobAgentAi.Domain.Entities
{
    public class Book : Entity
    {
        public string Title { get; private set; }
        public string Author { get; private set; }
        public DateTime PublishedDate { get; private set; }
        public string ISBN { get; private set; }

        protected Book() { }

        public Book(string title, string author, DateTime publishedDate, string isbn)
        {
            Title = title;
            Author = author;
            PublishedDate = publishedDate;
            ISBN = isbn;

            Validate();
        }

        public void Update(string title, string author, DateTime publishedDate, string isbn)
        {
            Title = title;
            Author = author;
            PublishedDate = publishedDate;
            ISBN = isbn;

            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Title))
                throw new ArgumentException("Title cannot be empty");
                
            if (string.IsNullOrWhiteSpace(Author))
                throw new ArgumentException("Author cannot be empty");
                
            if (string.IsNullOrWhiteSpace(ISBN))
                throw new ArgumentException("ISBN cannot be empty");
        }
    }
}
