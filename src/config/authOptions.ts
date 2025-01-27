/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Profile } from "next-auth";
import { sendWelcomeEmail } from "@/nodemailer/email";
import { dbConnect, dbDisconnect } from "./dbConnect";
import { User as UserSchema } from "@/lib/schemas/UserSchema";
import { splitGoogleName } from "@/utils/Helpers";
// import { selectRoleRoute } from "@/utils/Routes";

interface CustomUser {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  companyEmail?: string;
  phone?: string;
  password?: string;
  google?: boolean;
  nin?: string;
  skillSet?: string;
  isNinVerified?: boolean;
  lastLogin?: Date;
  isVerified?: boolean;
  profilePicture?: string;
  bio?: string;
  reservations?: string[];
  role?: "" | "user" | "admin" | "host";
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExtendedProfile extends Profile {
  picture: string; // or the correct type
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();

        try {
          const user = await UserSchema.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("Incorrect email or password");
          }

          const isPasswordCorrect = await compare(
            credentials.password,
            user.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect email or password");
          }

          if (!user.isVerified) {
            throw new Error(
              "Email not verified. Please verify your email to proceed.",
            );
          }

          const customUser: CustomUser = {
            _id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            companyEmail: user.companyEmail,
            phone: (user as CustomUser).phone,
            google: user.google,
            nin: user.nin,
            skillSet: user.skillSet,
            isNinVerified: user.isNinVerified,
            lastLogin: user.lastLogin,
            isVerified: user.isVerified,
            profilePicture: user.profilePicture,
            bio: user.bio,
            reservations: user.reservations,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };

          return customUser as any;
        } catch (err: any) {
          // Re-throw the error with a more user-friendly message or log it as needed
          throw new Error(err.message || "An unexpected error occurred");
        } finally {
          await dbDisconnect();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      try {
        await dbConnect();

        if (trigger === "signIn" && account?.provider === "google") {
          const dbUser = await UserSchema.findOne({ email: token.email });
          if (dbUser) {
            return {
              ...token,
              _id: dbUser._id.toString(),
              firstname: dbUser.firstname,
              lastname: dbUser.lastname,
              email: dbUser.email,
              companyEmail: dbUser.companyEmail,
              phone: dbUser.phone,
              google: dbUser.google,
              nin: dbUser.nin,
              skillSet: dbUser.skillSet,
              isNinVerified: dbUser.isNinVerified,
              isVerified: dbUser.isVerified,
              profilePicture: dbUser.profilePicture,
              bio: dbUser.bio,
              role: dbUser.role,
              createdAt: dbUser.createdAt,
              updatedAt: dbUser.updatedAt,
              exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
              // redirectUrl: dbUser.role === "" ? selectRoleRoute : "/",
            };
          }
        } else if (user) {
          // Regular credentials login
          // if (trigger === "update") {
          //   // Fetch the most recent user data
          //   const updatedUser = await UserSchema.findOne({
          //     email: token.email,
          //   });

          //   if (updatedUser) {
          //     return {
          //       ...token,
          //       _id: updatedUser._id.toString(),
          //       firstname: updatedUser.firstname,
          //       lastname: updatedUser.lastname,
          //       email: updatedUser.email,
          //       companyEmail: updatedUser.companyEmail,
          //       phone: updatedUser.phone,
          //       google: updatedUser.google,
          //       nin: updatedUser.nin,
          //       skillSet: updatedUser.skillSet,
          //       isNinVerified: updatedUser.isNinVerified,
          //       isVerified: updatedUser.isVerified,
          //       profilePicture: updatedUser.profilePicture,
          //       role: updatedUser.role,
          //       createdAt: updatedUser.createdAt,
          //       updatedAt: updatedUser.updatedAt,
          //       exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
          //     };
          //   }
          // }

          return {
            ...token,
            _id: (user as CustomUser)._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            companyEmail: user.companyEmail,
            phone: (user as CustomUser).phone,
            google: user.google,
            nin: user.nin,
            skillSet: user.skillSet,
            isNinVerified: user.isNinVerified,
            isVerified: user.isVerified,
            profilePicture: user.profilePicture,
            bio: user.bio,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
            // redirectUrl: user.role === "" ? selectRoleRoute : "/",
          };
        }

        if (trigger === "update") {
          console.log("it updatessssssss");
          return {
            ...token,
            _id: session.user._id,
            firstname: session.user.firstname,
            lastname: session.user.lastname,
            email: session.user.email,
            companyEmail: session.user.companyEmail,
            phone: session.user.phone,
            google: session.user.google,
            nin: session.user.nin,
            skillSet: session.user.skillSet,
            isNinVerified: session.user.isNinVerified,
            isVerified: session.user.isVerified,
            profilePicture: session.user.profilePicture,
            role: session.user.role,
            createdAt: session.user.createdAt,
            updatedAt: session.user.updatedAt,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
          };
        }

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      } finally {
        await dbDisconnect();
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token._id as string,
          _id: token._id as string,
          firstname: token.firstname as string | undefined,
          lastname: token.lastname as string | undefined,
          email: token.email as string,
          companyEmail: token.companyEmail as string | undefined,
          phone: token.phone as string | undefined,
          google: token.google as boolean,
          nin: token.nin as string | undefined,
          skillSet: token.skillSet as string | undefined,
          isNinVerified: token.isNinVerified as boolean | undefined,
          isVerified: token.isVerified as boolean | undefined,
          profilePicture: token.profilePicture as string | undefined,
          bio: token.bio as string | undefined,
          role: (token.role as "user" | "admin" | "host" | undefined) || "",
          createdAt: token.createdAt as Date | undefined,
          updatedAt: token.updatedAt as Date | undefined,
          // redirectUrl: token.redirectUrl as string | undefined,
        };
      }
      return session;
    },

    async signIn({ profile, credentials }) {
      try {
        await dbConnect();

        if (profile) {
          const existingUser = await UserSchema.findOne({
            email: profile.email,
          });

          // if (existingUser && !existingUser.google) {
          //   // Return an error indicating the user did not sign up with Google
          //   throw new Error("User did not sign up with Google");
          // }

          if (!existingUser) {
            const { firstName, lastName } = splitGoogleName(profile.name || "");
            const newUser = await UserSchema.create({
              firstname: firstName,
              lastname: lastName,
              email: profile.email,
              profilePicture: (profile as ExtendedProfile).picture,
              isVerified: true,
              google: true,
            });

            // console.log("New user created:", newUser, profile);
            if (newUser) {
              sendWelcomeEmail(profile.email || "", firstName, lastName);
              return true;
            }
            return false;
          }
          return true;
        }

        if (credentials) {
          const user = await UserSchema.findOne({
            email: credentials.email,
          });
          return !!user;
        }

        return false;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      } finally {
        await dbDisconnect();
      }
    },

    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2, // 2 hours
  },
};

// export async function updateUserSession() {
//   // This triggers the session update via the 'update' method
//   const result = await fetch("/api/auth/session", {
//     method: "POST",
//     body: JSON.stringify({ update: true }),
//   });
//   return result.json();
// }
