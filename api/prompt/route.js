import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();

    console.log(" -----userPrompts api");
    const userPrompts = await Prompt.find({}).populate("creator");
    console.log(" -----userPrompts api", userPrompts);
    return new Response(JSON.stringify(userPrompts), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to find any prompt", { status: 500 });
  }
};
