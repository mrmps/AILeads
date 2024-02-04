import { CardContent, Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "./ui/skeleton";
import {
  ThumbsDown,
  ThumbsUp,
  Building2,
  Globe,
  Locate,
  MoreHorizontal,
  Wand2,
} from "lucide-react";

export function CompanyCardSkeleton(title: string) {
  return (
    <Card className="mb-6 bg-gray-100 dark:bg-gray-700">
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div className="flex items-start">
            <Checkbox
              className="text-gray-600 dark:text-gray-300 mt-1"
              id={`input-company-skeleton`}
            />

            <div className="ml-4">
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2 -ml-[2px] rounded-full" />
                <Skeleton className="h-6 w-24 ml-2 rounded-md" />
              </div>

              <div className="mt-2">
                <Skeleton className="h-3 w-full mb-2 rounded-md" />
                <Skeleton className="h-3 w-full mb-2 rounded-md" />
                <Skeleton className="h-3 w-full mb-2 rounded-md" />
                <Skeleton className="h-3 w-full rounded-md" />
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-md" />
            <Skeleton className="h-4 w-4 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
