import Link from "next/link";
import React from "react";

const Form = ({ type, submitting, formData, setFormData, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Prompt</h1>
      <p className="desc text-left max-w-full">
        {type} and share prompts that helps you in the AI-powered platform. Let
        your imagination run wild by with the amazing prompts.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-full flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="prompt">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Prompt
          </span>
          <textarea
            id="prompt"
            placeholder="Enter you prompt here..."
            className="form_textarea"
            value={formData.prompt}
            required
            onChange={(e) =>
              setFormData({ ...formData, prompt: e.target.value })
            }
          />
        </label>

        <label htmlFor="tags">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags (#tech, #webdev #IT)
          </span>
          <input
            type="text"
            id="tags"
            className="form_input"
            required
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </label>

        <div className="flex flex-end gap-5 mx-3 mb-3 text-sm">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 border py-2 bg-orange-600 text-white rounded-full"
          >
            {type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
