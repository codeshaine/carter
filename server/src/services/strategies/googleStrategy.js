import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import prismaClient from "../../clients/prismaClient.js";
dotenv.config();
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/api/user/auth/google/callback",
    scope: ["profile", "email"],
  },
  async function (accessToken, refreshToken, profile, cb) {
    //implement the user logic
    const name = profile._json.name;
    const email = profile._json.email;
    const profile_url = profile._json.picture;
    const isGoogleAuth = true;
    let user;
    try {
      user = await prismaClient.users.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        return cb(null, user.user_id);
      }
    } catch (err) {
      console.log("google strategy error", err);
      return cb(null, null);
    }

    try {
      user = await prismaClient.users.create({
        data: {
          name,
          email,
          profile_url,
          isGoogleAuth,
        },
      });

      return cb(null, user.user_id);
    } catch (err) {
      console.log("Google strategy error:", err);
      return cb(null, null);
    }
  }
);
