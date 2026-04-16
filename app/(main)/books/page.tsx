import { Suspense } from "react";
import SearchInput from "./_components/SearchInput";
import SearchPagination from "./_components/SearchPagination";
import List from "./_components/List";

import { Paper } from "@mui/material";
import { getBooks } from "./_lib/data";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const params = await searchParams;
  const query = params.q || "search terms";
  const page = params.page || "1";

  const { totalPages } = await getBooks(query, page);

  return (
    <>
      <Paper
        sx={{ position: "sticky", top: 0, left: 0, right: 0, p: 2 }}
        elevation={0}
        className="border-b"
      >
        <SearchInput />
      </Paper>

      <Suspense key={query + page} fallback={<p>Loading...</p>}>
        <List query={query} page={page} />
      </Suspense>

      <SearchPagination total_pages={totalPages} />
    </>
  );
}
