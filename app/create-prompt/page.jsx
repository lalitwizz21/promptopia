"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
    tags: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const createPrompt = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: formData.prompt,
          tags: formData.tags,
          userId: session?.user?.id,
        }),
      });

      console.log("createPrompt", createPrompt);
      console.log("createPrompt", router);
      if (createPrompt?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error when clicked on create button", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      submitting={submitting}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePrompt;
