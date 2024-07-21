import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("The prompt is not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.parse("Failed to get the prompt."), {
      status: 500,
    });
  }
};

// PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tags } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response("The prompt is not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tags = tags;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.parse("Failed to update the prompt."), {
      status: 500,
    });
  }
};

// DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.parse("Failed to delete the prompt."), {
      status: 500,
    });
  }
};
