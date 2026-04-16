"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@mui/material";

export default function SearchPagination({
  total_pages,
}: {
  total_pages?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q") || "";

  function handlePage(_: React.ChangeEvent<unknown>, value: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(value));
    params.set("q", q);

    replace(`${pathname}?${params.toString()}`);
  }

  return <Pagination count={total_pages} page={page} onChange={handlePage} />;
}
