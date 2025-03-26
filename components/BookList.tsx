import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-light-100 text-4xl">{title}</h2>
      <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
