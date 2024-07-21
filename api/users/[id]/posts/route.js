import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    console.log("-------params?.id", params);
    const prompts = await Prompt.find({ creator: params?.id }).populate(
      "creator"
    );
    console.log("--------user prompts", prompts);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Can't fetch the posts for the user", { status: 500 });
  }
};
