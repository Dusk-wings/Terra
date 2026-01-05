import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

function LoadingCard() {
  return (
    <Card className="">
      <CardContent className="grid grid-rows-3 gap-4 h-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col grow gap-1">
            <div className="h-3 w-2/6 bg-secondary/80 animate-pulse rounded-md"></div>
            <div className="h-5 w-2/5 bg-secondary/80 animate-pulse rounded-md"></div>
          </div>
          <div className="h-5 w-5 bg-secondary/80 animate-pulse rounded-md"></div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="h-3 w-2/6 bg-secondary/80 animate-pulse rounded-md"></p>
          <p className="h-5 w-full bg-secondary/80 animate-pulse rounded-md"></p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Badge variant="secondary" className="animate-pulse rounded-md">
              <div className="h-1 w-5"></div>
            </Badge>
            <Badge variant="secondary" className="animate-pulse rounded-md">
              <div className="h-1 w-5"></div>
            </Badge>
          </div>
          <Badge className="animate-pulse rounded-md">
            <div className="h-1 w-5"></div>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoadingCard;
