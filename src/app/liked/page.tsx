"use client";

import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { likedJobsStorage } from "@/utils/localStorage";
import JobCard from "@/components/JobCard";

export default function LikedJobsPage() {
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jobs = likedJobsStorage.get();
    setLikedJobs(jobs);
    setIsLoading(false);
  }, []);

  const handleRemoveJob = (jobId: string) => {
    likedJobsStorage.remove(jobId);
    setLikedJobs((prev) => prev.filter((job) => job.job_id !== jobId));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all liked jobs?")) {
      likedJobs.forEach((job) => likedJobsStorage.remove(job.job_id));
      setLikedJobs([]);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Liked Jobs
            </h1>
            <p className="text-gray-600">
              {likedJobs.length} job{likedJobs.length !== 1 ? "s" : ""} saved
              for later
            </p>
          </div>

          {likedJobs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {likedJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No liked jobs yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start browsing jobs and click the heart icon to save them here.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Browse Jobs
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {likedJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                showRemoveButton={true}
                onRemove={handleRemoveJob}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
