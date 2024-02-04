import { Suspense } from "react";
import { CompanyCard, CompanyCardProps } from "./company-card";
import { CompanyCardSkeleton } from "./card-skeleton";

export async function getData(query: string) {
    if (query === '') {
        return [];
    }
    const res = await fetch('https://dc72-107-3-134-29.ngrok-free.app/get_company_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: JSON.stringify(query), // Pass the query
        })
    })

    return res.json()
}



export async function CompanyResults(query: string) {

//   console.log(searchParams)
//   const query = searchParams?.search || '';
//   console.log('query is', query)
  let companies = [];
  if (query !== '') {
    companies = await getData(query);
  }
  console.log(companies)

//   const renderCards = Promise.all(
//     companies && companies.map((company: CompanyCardProps) => (
//             <CompanyCard key={company.id} id={company.id} />
//       ))
//   )
  return (
    <div>
      {companies && companies.map((company: CompanyCardProps) => (
        <Suspense key={company.id} fallback={<CompanyCardSkeleton />}>  
            {/* @ts-expect-error Server Component */}
            <CompanyCard key={company.id} id={company.id} url={company.url} title={company.title}/>
        </Suspense>
      ))}
      {/* {..renderCards} */}
    </div>
  )

  
//   return (
//     <div>
//       {companies && companies.map((company: CompanyCardProps) => (
//         // <Suspense key={company.id} fallback={<div>Loading...</div>}>
//             <CompanyCard key={company.id} id={company.id} />
//         // </Suspense>
//       ))}
//     </div>
//   );
}