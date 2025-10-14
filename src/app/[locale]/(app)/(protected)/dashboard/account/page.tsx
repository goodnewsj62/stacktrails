"use client";

import { useAppStore } from "@/store";
import { Avatar, IconButton } from "@mui/material";
import { FaEdit } from "react-icons/fa";

export default function Page() {
  const { user, currentProfile } = useAppStore((state) => state);
  return (
    <ProfilePage
      email={user?.email ?? "-"}
      displayName={currentProfile?.display_name}
      username={user?.username}
      avatar={currentProfile?.avatar}
      bio={currentProfile?.bio}
    />
  );
}

interface ProfilePageProps {
  avatar?: string | null;
  displayName?: string | null;
  username?: string | null;
  bio?: string | null;
  email: string;
  country?: string | null;
  language?: string | null;
  xHandle?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  website?: string | null;
}

function ProfilePage({
  avatar,
  displayName,
  username,
  bio,
  email,
  country,
  language,
  xHandle,
  instagram,
  facebook,
  youtube,
  tiktok,
  website,
}: ProfilePageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header Section */}
      <section className="rounded-xl border border-gray-200 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar
            alt={displayName || username || "User Avatar"}
            src={avatar || undefined}
            sx={{ width: 64, height: 64 }}
          />
          <div>
            {displayName && (
              <h2 className="text-xl font-semibold text-gray-900">
                {displayName}
              </h2>
            )}
            {username && <p className="text-sm text-gray-500">@{username}</p>}
            {country && <p className="text-sm text-gray-400">{country}</p>}
          </div>
        </div>
        <IconButton size="small" aria-label="edit">
          <FaEdit fontSize="small" />
        </IconButton>
      </section>

      {/* Basic Information */}
      <section className="rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Basic Information
          </h3>
          <IconButton size="small" aria-label="edit">
            <FaEdit fontSize="small" />
          </IconButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Language</p>
            <p className="font-medium  text-gray-900">{language || "-"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Bio</p>
            <p className="font-medium text-gray-900 whitespace-pre-line">
              {bio || "-"}
            </p>
          </div>
        </div>
      </section>

      {/* Social Links Section (Optional / Future) */}
      <section className=" rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
          <IconButton size="small" aria-label="edit">
            <FaEdit fontSize="small" />
          </IconButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "X", value: xHandle },
            { label: "Instagram", value: instagram },
            { label: "Facebook", value: facebook },
            { label: "YouTube", value: youtube },
            { label: "TikTok", value: tiktok },
            { label: "Website", value: website },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-gray-500">{item.label}</p>
              {item.value ? (
                <a
                  href={
                    item.value.startsWith("http")
                      ? item.value
                      : `https://${item.value}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline break-words"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-medium text-gray-900">-</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
