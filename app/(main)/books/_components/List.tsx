import Image from "next/image";
import { getBooks } from "../_lib/data";

interface Props {
  query: string;
  page: string;
}

export default async function List({ query, page }: Props) {
  const { data } = await getBooks(query, page);

  if (data.length === 0) {
    return <p className="p-4">No results found.</p>;
  }

  return (
    <ul
      className="space-y-2 p-4
    grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {data.map((book) => {
        if (!book.volumeInfo.imageLinks?.thumbnail) {
          return null;
        }

        return (
          <li key={book.id} className="flex flex-col gap-2">
            <Image
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.description || book.volumeInfo.title}
              width={100}
              height={150}
              className="object-cover border border-foreground rounded
              h-37.5 w-25"
              loading="eager"
            />

            <div>
              <p className="font-bold text-2xl truncate">
                {book.volumeInfo.title}
              </p>
              <p>{book.volumeInfo.authors?.join(", ")}</p>
              <p>{book.volumeInfo.publishedDate}</p>
              {book.volumeInfo.pageCount !== 0 && (
                <p>{book.volumeInfo.pageCount} pages</p>
              )}
              <p>{book.volumeInfo.categories} </p>
              <p>{book.volumeInfo.printType}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
