import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: { // 🔥 Aquí está la corrección (antes era "callback")
        async signIn({
            user: { name, email, image },
            profile,
        }) {
            if (profile) {
                const { id, login, bio } = profile;

                const existingUser = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                        id,
                    });

                if (!existingUser) {
                    await writeClient.create({
                        _type: "author",
                        id,
                        name,
                        username: login,
                        email,
                        image,
                        bio: bio || "",
                    });
                }
            }

            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                        id: profile?.id,
                    });

                token.id = user?._id;
            }

            return token;
        },
        async session({ session, token }) {
            Object.assign(session, { id: token.id });
            return session;
        },
    },
});