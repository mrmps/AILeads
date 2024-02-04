"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { SparklesIcon, SparkleIcon } from "lucide-react"
import React, { useState } from "react"
import { useRouter } from 'next/navigation'

export function SearchView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const query = new URLSearchParams({ search: searchQuery }).toString();
    router.push(`/?${query}`);
  };

  return (
   <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-800 dark:text-white">Find Lookalike companies</h1>
        <Button className="text-gray-600 dark:text-gray-300" variant="outline">
          Clear all
        </Button>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-6 p-4 border border-zinc-200 rounded-md">
          <Input 
            className="border-none dark:border-gray-700 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0" 
            placeholder="Eg: Amazon.com, exa.ai, roamresearch.com, AI Biotech Company hiring" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex justify-between">
            <Button className="bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-gray-300" variant="secondary">
              <SparkleIcon /> <span className="ml-2">AI suggest</span>
            </Button>
            <Button className="bg-blue-700 text-white hover:bg-blue-900" onClick={handleSearch}>
               <span className="mr-2">Find Lookalikes</span><SparklesIcon className="text-blue-200"/>
            </Button>
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <Select>
            <SelectTrigger id="refine-keywords">
              <SelectValue placeholder="Keywords" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger id="refine-location">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectContent>
          </Select>
          <Button className="text-gray-600 dark:text-gray-300" variant="outline">
            Apply additional filters
          </Button>
          <Button className="text-gray-600 dark:text-gray-300" variant="outline">
            Add to list
          </Button>
          <Select>
            <SelectTrigger id="export">
              <SelectValue placeholder="Export" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">XLSX</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

   </>
  )
}

