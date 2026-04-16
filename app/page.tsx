import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href="/books">Go to Books</Link>
    </div>
  );
}
