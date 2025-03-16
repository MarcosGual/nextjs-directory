import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Configure one or more authentication providers
  providers: [Github({ clientId: process.env.AUTH_GITHUB_ID || "", clientSecret: process.env.AUTH_SECRET || "" })],
});

// export default NextAuth(authOptions)