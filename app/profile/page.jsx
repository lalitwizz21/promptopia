"use client";

import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPrompts = async () => {
      const url = `api/users/${session?.user?.id}/posts`;
      try {
        const response = await fetch(url);
        const prompts = await response.json();
        console.log("---prompts", prompts);
        setPosts(prompts);
      } catch (err) {
        console.error(err);
      }
    };

    if (session?.user?.id) fetchPrompts();
  }, []);

  const handleEdit = (id) => {
    router.push(`update-prompt?id=${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete the prompt?"
    );
    console.log("---confirmDelete", confirmDelete);
    if (confirmDelete) {
      try {
        const deletedPrompt = await fetch(`api/prompt/${id}`, {
          method: "DELETE",
        });

        const filteredPrompt = posts.filter((prompt) => prompt?._id !== id);
        setPosts(filteredPrompt);
      } catch (error) {
        console.error("Unable to delete the prompt.");
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your Profile menu."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
