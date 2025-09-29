import { Job, UserProfile } from "@/types/job";

export const localStorageKeys = {
  LIKED_JOBS: "likedJobs",
  USER_PROFILE: "userProfile",
} as const;

export const likedJobsStorage = {
  get: (): Job[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(localStorageKeys.LIKED_JOBS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading liked jobs from localStorage:", error);
      return [];
    }
  },

  add: (job: Job): void => {
    if (typeof window === "undefined") return;
    try {
      const likedJobs = likedJobsStorage.get();
      const isAlreadyLiked = likedJobs.some(
        (likedJob) => likedJob.job_id === job.job_id
      );

      if (!isAlreadyLiked) {
        const updatedJobs = [...likedJobs, job];
        localStorage.setItem(
          localStorageKeys.LIKED_JOBS,
          JSON.stringify(updatedJobs)
        );
      }
    } catch (error) {
      console.error("Error adding job to liked jobs:", error);
    }
  },

  remove: (jobId: string): void => {
    if (typeof window === "undefined") return;
    try {
      const likedJobs = likedJobsStorage.get();
      const updatedJobs = likedJobs.filter((job) => job.job_id !== jobId);
      localStorage.setItem(
        localStorageKeys.LIKED_JOBS,
        JSON.stringify(updatedJobs)
      );
    } catch (error) {
      console.error("Error removing job from liked jobs:", error);
    }
  },

  isLiked: (jobId: string): boolean => {
    if (typeof window === "undefined") return false;
    try {
      const likedJobs = likedJobsStorage.get();
      return likedJobs.some((job) => job.job_id === jobId);
    } catch (error) {
      console.error("Error checking if job is liked:", error);
      return false;
    }
  },
};

export const profileStorage = {
  get: (): UserProfile | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(localStorageKeys.USER_PROFILE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error reading profile from localStorage:", error);
      return null;
    }
  },

  set: (profile: UserProfile): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        localStorageKeys.USER_PROFILE,
        JSON.stringify(profile)
      );
    } catch (error) {
      console.error("Error saving profile to localStorage:", error);
    }
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(localStorageKeys.USER_PROFILE);
    } catch (error) {
      console.error("Error clearing profile from localStorage:", error);
    }
  },
};
