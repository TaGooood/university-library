import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="">{title}</h1>
        <div className="book-info">
          <p>
            By <span className="text-light-200 font-semibold">{author}</span>
          </p>
          <p>
            Category: <span className="text-light-200 font-semibold">{genre}</span>
          </p>
          <div className="flex flex-row items-center gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Book <span>{totalCopies}</span>
          </p>
          <p>
            Available Books <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <Button className="book-overview_btn!">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-dark-100 text-xl">Borrow</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover variant="wide" className="z-10" coverColor={coverColor} coverUrl={coverUrl} />
          <div className="absolute top-10 left-16 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
