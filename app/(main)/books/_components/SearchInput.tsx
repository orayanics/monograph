"use client";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TextField } from "@mui/material";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams);
    params.set("q", query);
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <TextField
      fullWidth
      label="Search for books"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch(query);
        }
      }}
    />
  );
}
