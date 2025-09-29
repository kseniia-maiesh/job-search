"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { jobApi } from "@/services/jobApi";
import { Job } from "@/types/job";
import { likedJobsStorage } from "@/utils/localStorage";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const [isLiked, setIsLiked] = useState(false);

  const { data, error, isLoading } = useSWR(
    jobId ? ["job-details", jobId] : null,
    ([, id]) => jobApi.getJobDetails(id),
    {
      revalidateOnFocus: false,
    }
  );

  const job: Job = data?.data?.[0] || data?.data || data;

  useEffect(() => {
    if (job && job.job_id) {
      setIsLiked(likedJobsStorage.isLiked(job.job_id));
    }
  }, [job]);

  const handleLike = () => {
    if (!job) return;

    if (isLiked) {
      likedJobsStorage.remove(job.job_id);
      setIsLiked(false);
    } else {
      likedJobsStorage.add(job);
      setIsLiked(true);
    }
  };

  const formatSalary = () => {
    if (!job) return null;
    if (job.job_min_salary && job.job_max_salary) {
      return `$${job.job_min_salary.toLocaleString()} - $${job.job_max_salary.toLocaleString()} ${
        job.job_salary_period || "per year"
      }`;
    }
    return null;
  };

  const formatLocation = () => {
    if (!job) return "";
    const parts = [job.job_city, job.job_state, job.job_country].filter(
      Boolean
    );
    return parts.join(", ");
  };

  const formatPostedDate = () => {
    if (!job) return "";
    const date = new Date(job.job_posted_at_datetime_utc);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Error loading job details: {error.message}
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Job ID: {jobId}</p>
            <p>Check browser console for more details</p>
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  if (!job || !job.job_id) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Job details not found or incomplete data received.
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Job ID: {jobId}</p>
            <p>Check browser console for API response details</p>
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to jobs
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              {job.employer_logo && (
                <img
                  src={job.employer_logo}
                  alt={`${job.employer_name} logo`}
                  className="w-16 h-16 rounded-lg object-contain"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.job_title}
                </h1>
                <p className="text-xl text-gray-600">{job.employer_name}</p>
              </div>
            </div>

            <button
              onClick={handleLike}
              className={`p-3 rounded-full transition-colors ${
                isLiked
                  ? "text-red-500 hover:text-red-600 bg-red-50"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              aria-label={
                isLiked ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                className="w-8 h-8"
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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-3"
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
                <span>{formatLocation()}</span>
                {job.job_is_remote && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Remote
                  </span>
                )}
              </div>

              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-3"
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
                <span>{job.job_employment_type}</span>
              </div>

              {formatSalary() && (
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-3"
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
                  <span>{formatSalary()}</span>
                </div>
              )}

              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-3"
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
                <span>Posted {formatPostedDate()}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href={job.job_apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center"
              >
                Apply Now
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.job_description }}
            />
          </div>

          {job.job_highlights && (
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Job Highlights
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {job.job_highlights.Qualifications && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Qualifications
                    </h3>
                    <ul className="space-y-2">
                      {job.job_highlights.Qualifications.map(
                        (qualification, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            <span className="text-gray-700">
                              {qualification}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {job.job_highlights.Responsibilities && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {job.job_highlights.Responsibilities.map(
                        (responsibility, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <span className="text-gray-700">
                              {responsibility}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {job.job_highlights.Benefits && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {job.job_highlights.Benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-600 mr-2">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {job.job_required_skills && job.job_required_skills.length > 0 && (
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.job_required_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
