import { CardContent, Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  ThumbsDown,
  ThumbsUp,
  Building2,
  Globe,
  Locate,
  MoreHorizontal,
  Wand2,
} from "lucide-react";
import { Button } from "./ui/button";
import { OpenAIStream } from "ai";
import { Tokens } from "ai/react";
import { ResponsiveDrawer } from "./responsive-drawer";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

interface CompanyCardData {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  description: string;
}

export interface CompanyCardProps {
    id: string;
    url: string;
}

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export async function getData(id: string) {
    try {
        const res = await fetch('https://dc72-107-3-134-29.ngrok-free.app/get_company_summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ids: [id]
            })
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export async function CompanyCard({
  id,
  url,
}: CompanyCardProps) {

  let data;
  try {
    data = await getData(id);
    console.log(data);
  } catch (error) {
    console.error(error);
    return;
  }
  const { name, industry, description, contact, location } = data[0];
  
  if (!name) {
    return null;
  }

  return (
    <Card className="mb-6 bg-gray-100 dark:bg-gray-700">
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div className="flex items-start">
            <Checkbox
              className="text-gray-600 dark:text-gray-300 mt-1"
              id={`input-company-${id}`}
            />

            <div className="ml-4">
              <div className="flex items-center">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
                  className="h-4 w-4 mr-2 -ml-[2px] rounded-full"
                />
                <h3 className="font-semibold">{name}</h3>
              </div>

              <div className="mt-2">
                <div className="flex items-center">
                  <Wand2 className="h-3 w-3 mr-2" />
                  <p className="text-sm">{description}</p>
                </div>
                <div className="flex items-center">
                  <Building2 className="h-3 w-3 mr-2" />
                  <p className="text-sm">{industry}</p>
                </div>
                {contact && (
                  <div className="flex items-center">
                    <Globe className="h-3 w-3 mr-2" />
                    <p className="text-sm">{contact}</p>
                  </div>
                )}
                <div className="flex items-center">
                  <Locate className="h-3 w-3 mr-2" />
                  <p className="text-sm">{location}</p>
                </div>
                <div className="flex items-center">
                  <LinkedinIcon className="h-3 w-3 mr-2" />
                  {url && (
                    <Link
                      className="text-sm text-blue-500 underline"
                      href={url}
                    >
                      {url}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <ThumbsUp className="h-4 w-4 mt-3" />
            <ThumbsDown className="h-4 w-4 mt-3" />
            {/* <MoreHorizontal className="h-4 w-4 mt-2" /> */}
            <ResponsiveDrawer>
                <Suspense
                  key={"summary"}
                  fallback={
                    <Skeleton
                      className="h-32 rounded-lg animate-pulse bg-zinc-200"
                      style={{ width: "100%" }}
                    />
                  }
                >
                  <Wrapper url={url} />
                </Suspense>
              </ResponsiveDrawer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


async function Wrapper({ url }: { url: string }) {
    try {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new JSDOM(html);
    const reader = new Readability(doc.window.document);
    const article = reader.parse();
    const siteText = article?.content.substring(0, 5000);
    
    const prompt =
      "Give me any information that would be relevant about this company from a b2b perspective as a quick human readable summary of no more than 200 words.\n\n" +
      siteText +
      "\n\nImportant info:";


  
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            stream: true,
            max_tokens: 580,
            frequency_penalty: 1,
            temperature: 1,
            messages: [
              {
                role: "system",
                content:
                  "You are an B2B company information sources specializing in finding and summarizing company data in a digestable way. Be precise and concise in your responses.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );
  
      // Convert the response into a friendly text-stream
      const stream = OpenAIStream(response)
  
      if (!response.ok) {
        return "Well this sucks. Looks like I ran out of money to pay for summaries. Please be patient until a benevolent sponsor gives me either cash or sweet sweet OpenAI credits. If you would like to be that sponsor, feel free to reach out to contact@smry.ai!";
      }
  
      return <Tokens stream={stream} />;
    } catch (error) {
      return `Well this sucks. Looks like an unexpected error occured, so no summary for this site :( No I won't tell you the error, that is private. Really, you insist? Fine. The error is ${error} Happy?`;
    }
  }