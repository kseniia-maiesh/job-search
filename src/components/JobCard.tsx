"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Job } from "@/types/job";
import { likedJobsStorage } from "@/utils/localStorage";

interface JobCardProps {
  job: Job;
  showRemoveButton?: boolean;
  onRemove?: (jobId: string) => void;
}

export default function JobCard({
  job,
  showRemoveButton = false,
  onRemove,
}: JobCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedJobsStorage.isLiked(job.job_id));
  }, [job.job_id]);

  const handleLike = () => {
    if (isLiked) {
      likedJobsStorage.remove(job.job_id);
      setIsLiked(false);
      if (showRemoveButton && onRemove) {
        onRemove(job.job_id);
      }
    } else {
      likedJobsStorage.add(job);
      setIsLiked(true);
    }
  };

  const formatSalary = () => {
    if (job.job_min_salary && job.job_max_salary) {
      return `$${job.job_min_salary.toLocaleString()} - $${job.job_max_salary.toLocaleString()} ${
        job.job_salary_period || "per year"
      }`;
    }
    return null;
  };

  const formatLocation = () => {
    const parts = [job.job_city, job.job_state, job.job_country].filter(
      Boolean
    );
    return parts.join(", ");
  };

  const formatPostedDate = () => {
    const date = new Date(job.job_posted_at_datetime_utc);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {job.employer_logo && (
            <img
              src={job.employer_logo}
              alt={`${job.employer_name} logo`}
              className="w-12 h-12 rounded-lg object-contain"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {job.job_title}
            </h3>
            <p className="text-gray-600">{job.employer_name}</p>
          </div>
        </div>
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition-colors ${
            isLiked
              ? "text-red-500 hover:text-red-600"
              : "text-gray-400 hover:text-red-500"
          }`}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className="w-6 h-6"
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {formatLocation()}
          {job.job_is_remote && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Remote
            </span>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-600">
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
            />
          </svg>
          {job.job_employment_type}
        </div>

        {formatSalary() && (
          <div className="flex items-center text-sm text-gray-600">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            {formatSalary()}
          </div>
        )}

        <div className="flex items-center text-sm text-gray-500">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Posted {formatPostedDate()}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 text-sm line-clamp-3">
          {job.job_description.replace(/<[^>]*>/g, "").substring(0, 200)}...
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={`/job-details/${job.job_id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Details
        </Link>

        {showRemoveButton && (
          <button
            onClick={() => onRemove?.(job.job_id)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
