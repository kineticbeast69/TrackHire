import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import InitUSerBoard from "./init-user-board";
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            if (user.id) await InitUSerBoard(user.id);
          } catch (error) {
            console.log(
              `can't initialize the InitUserBoard funtion for user ${user.id}`,
            );
          }
        },
      },
    },
  },
  secret: process.env["BETTER_AUTH_SECRET"],
});

export async function getSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
}
