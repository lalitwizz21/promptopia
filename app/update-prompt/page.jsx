"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
    tags: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  console.log("promptId", promptId);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`api/prompt/${promptId}`);
        const prompt = await res.json();
        console.log("----prompt", prompt);
        setFormData({
          prompt: prompt.prompt,
          tags: prompt.tags,
        });
      } catch (error) {
        console.log("Failed to fetch the prompt", error);
      }
    };

    promptId && fetchPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("formData", formData);

    if (!promptId) return alert("Prompt ID not found!!!");

    try {
      const createPrompt = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: formData.prompt,
          tags: formData.tags,
        }),
      });

      console.log("createPrompt", createPrompt);
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
      type="Edit"
      submitting={submitting}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
