import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tags } = await req.json();

  try {
    await connectToDB();
    const createPrompt = new Prompt({
      creator: userId,
      prompt,
      tags,
    });

    await createPrompt.save();

    return new Response(JSON.stringify(createPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create the prompt!", { status: 500 });
  }
};
