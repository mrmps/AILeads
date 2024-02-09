import { Suspense } from "react";
import { CompanyCard, CompanyCardProps } from "./company-card";
import { CompanyCardSkeleton } from "./card-skeleton";

export async function getData(query: string) {
  if (query === "") {
    return [];
  }
  const res = await fetch(
    "https://dc72-107-3-134-29.ngrok-free.app/get_company_data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: JSON.stringify(query), // Pass the query
      }),
    }
  );

  return res.json();
}

export async function CompanyResults({ query }: { query: string }) {
  if (query === "") {
    return null;
  }
  let companies = [];
  if (query !== "") {
    companies = await getData(query);
  }
  console.log(companies);

  return (
    <div>
      {companies &&
        companies.map((company: CompanyCardProps) => (
          <Suspense key={company.id} fallback={<CompanyCardSkeleton />}>
            <CompanyCard key={company.id} id={company.id} url={company.url} />
          </Suspense>
        ))}
      {/* {..renderCards} */}
    </div>
  );
}
