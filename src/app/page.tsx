"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { jobApi } from "@/services/jobApi";
import { Job, UserProfile } from "@/types/job";
import { profileStorage } from "@/utils/localStorage";
import JobCard from "@/components/JobCard";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const profile = profileStorage.get();
    setUserProfile(profile);

    if (profile && profile.desiredJobTitle && !currentQuery) {
      setCurrentQuery(profile.desiredJobTitle);
      setSearchQuery(profile.desiredJobTitle);
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    currentQuery ? ["jobs", currentQuery] : null,
    ([, query]) => jobApi.searchJobs(query),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentQuery(searchQuery.trim());
    }
  };

  const jobs: Job[] = data?.data || [];

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("lastSearchResults", JSON.stringify(jobs));
    }
  }, [jobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isClient && userProfile
            ? `Welcome back, ${userProfile.name}!`
            : "Find Your Dream Job"}
        </h1>

        {isClient && userProfile && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Looking for:</strong> {userProfile.desiredJobTitle}
            </p>
            <p className="text-blue-700 text-sm mt-1">{userProfile.aboutMe}</p>
          </div>
        )}

        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jobs (e.g., Software Engineer, Marketing Manager)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={!searchQuery.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {isClient && !userProfile && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              💡 <strong>Tip:</strong> Create a profile to get personalized job
              recommendations!
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">
            Error loading jobs. Please check your API key and try again.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!isLoading && !error && currentQuery && jobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No jobs found</div>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      )}

      {!isLoading && !error && !currentQuery && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            Start your job search
          </div>
          <p className="text-gray-400">
            Enter a job title or keyword to find opportunities
          </p>
        </div>
      )}

      {jobs.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {jobs.length} jobs found for "{currentQuery}"
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
