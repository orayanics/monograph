import React from "react";

export default async function BookSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div className="min-h-screen">My Post: {slug}</div>;
}
