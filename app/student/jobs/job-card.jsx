"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  Send,
} from "lucide-react";
import { useState } from "react";

export function JobCard({ job }) {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(job.applied);

  const handleApply = async () => {
    setIsApplying(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setHasApplied(true);
    setIsApplying(false);
  };

  return (
    <Card className="border-4 border-black dark:border-gray-400 shadow-[8px_8px_0px_0px_black] dark:shadow-[8px_8px_0px_0px_#6b7280] rounded-none hover:shadow-[4px_4px_0px_0px_black] dark:hover:shadow-[4px_4px_0px_0px_#6b7280] hover:translate-x-1 hover:translate-y-1 transition-all duration-150">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center">
              <div className="text-lg font-black">{job.company[0]}</div>
            </div>
            <div>
              <CardTitle className="font-black uppercase text-lg">
                {job.company}
              </CardTitle>
              <p className="font-bold text-muted-foreground">{job.position}</p>
            </div>
          </div>
          {hasApplied && (
            <Badge className="bg-green-300 text-black border-2 border-black font-black">
              <CheckCircle className="mr-1 h-3 w-3" />
              APPLIED
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="font-bold">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="font-bold">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-bold">{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-bold">Due: {job.deadline}</span>
          </div>
        </div>

        {/* Description */}
        <div className="p-3 bg-gray-100 border-2 border-black">
          <p className="font-bold text-sm">{job.description}</p>
        </div>

        {/* Skills Required */}
        <div>
          <h4 className="font-black uppercase text-sm mb-2">
            Skills Required:
          </h4>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((skill) => (
              <Badge
                key={skill}
                className="bg-blue-300 text-black border-2 border-black font-bold text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          {!hasApplied ? (
            <Button
              onClick={handleApply}
              disabled={isApplying}
              className="flex-1 bg-red-400 text-black border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] font-black uppercase transition-all"
            >
              {isApplying ? (
                "APPLYING..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  APPLY NOW
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 bg-gray-300 text-black border-4 border-black font-black uppercase opacity-70"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              APPLIED
            </Button>
          )}

          <Button
            variant="outline"
            className="bg-yellow-300 text-black border-4 border-black font-black uppercase px-6"
          >
            DETAILS
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
