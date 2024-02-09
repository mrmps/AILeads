import Image from "next/image";
import { SearchView } from "@/components/search-view";
import { CompanyResults } from "@/components/company-results";

export default function Home({
  // params,
  searchParams,
}: {
  // params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  const query = searchParams && searchParams.search ? searchParams.search.toString() : "";
  console.log("query is", query);
  return (
    <main className="min-h-screen mx-24 my-24">
      <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-sm border border-zinc-100 dark:bg-gray-800">
        <SearchView />

        <div className="mt-8">
          {query && (
            <h2 className="text-xs font-medium text-gray-800 dark:text-white mb-6 uppercase">
              Lookalike Results
            </h2>
          )}
        </div>
        {query && (
          <CompanyResults query={query} />
        )}
      </div>
    </main>
  );
}
