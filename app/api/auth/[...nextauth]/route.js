import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();

        const user = await User.findOne({
          email: session.user.email,
        });
        console.log("user", user);
        console.log("session", session);
        session.user.id = user?._id?.toString();

        return session;
      } catch (error) {
        console.error("Error fetching user during session", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        console.log("started sign in.");
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        console.log("userExists", userExists);
        console.log("profile", profile);
        if (!userExists) {
          console.log("new user", {
            email: profile.email,
            username: profile.name?.replace(" ", "")?.toLowerCase(),
            image: profile.image,
          });
          await User.create({
            email: profile.email,
            username: profile.name?.replace(" ", "")?.toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Problem in signing in.", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
