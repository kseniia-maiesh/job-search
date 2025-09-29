"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserProfile } from "@/types/job";
import { profileStorage } from "@/utils/localStorage";

const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  desiredJobTitle: Yup.string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be less than 100 characters")
    .required("Desired job title is required"),
  aboutMe: Yup.string()
    .min(10, "About me must be at least 10 characters")
    .max(500, "About me must be less than 500 characters")
    .required("About me is required"),
});

export default function CreateProfilePage() {
  const router = useRouter();
  const [existingProfile, setExistingProfile] = useState<UserProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profile = profileStorage.get();
    setExistingProfile(profile);
    setIsLoading(false);
  }, []);

  const handleSubmit = (values: UserProfile) => {
    profileStorage.set(values);
    router.push("/");
  };

  const handleClearProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      profileStorage.clear();
      setExistingProfile(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const initialValues: UserProfile = existingProfile || {
    name: "",
    desiredJobTitle: "",
    aboutMe: "",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {existingProfile ? "Update Profile" : "Create Profile"}
        </h1>
        <p className="text-gray-600">
          {existingProfile
            ? "Update your information to get better job recommendations"
            : "Tell us about yourself to get personalized job recommendations"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="desiredJobTitle"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Desired Job Title *
                </label>
                <Field
                  type="text"
                  id="desiredJobTitle"
                  name="desiredJobTitle"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer, Marketing Manager, Data Analyst"
                />
                <ErrorMessage
                  name="desiredJobTitle"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This will be used to show you relevant job recommendations
                </p>
              </div>

              <div>
                <label
                  htmlFor="aboutMe"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  About Me *
                </label>
                <Field
                  as="textarea"
                  id="aboutMe"
                  name="aboutMe"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your experience, skills, and what you're looking for in your next role..."
                />
                <ErrorMessage
                  name="aboutMe"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
                <div className="mt-1 text-sm text-gray-500">
                  {values.aboutMe.length}/500 characters
                </div>
              </div>

              <div className="flex justify-between items-center pt-6">
                {existingProfile && (
                  <button
                    type="button"
                    onClick={handleClearProfile}
                    className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Delete Profile
                  </button>
                )}

                <div className="flex space-x-4 ml-auto">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isSubmitting
                      ? "Saving..."
                      : existingProfile
                      ? "Update Profile"
                      : "Create Profile"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {existingProfile && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Current Profile
          </h3>
          <div className="space-y-2 text-blue-800">
            <p>
              <strong>Name:</strong> {existingProfile.name}
            </p>
            <p>
              <strong>Desired Job Title:</strong>{" "}
              {existingProfile.desiredJobTitle}
            </p>
            <p>
              <strong>About Me:</strong> {existingProfile.aboutMe}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">
          💡 How it works
        </h3>
        <ul className="space-y-2 text-yellow-800">
          <li>• Your profile is stored locally in your browser</li>
          <li>
            • We'll use your desired job title to show relevant recommendations
          </li>
          <li>
            • Your information helps us personalize your job search experience
          </li>
          <li>• You can update or delete your profile anytime</li>
        </ul>
      </div>
    </div>
  );
}
