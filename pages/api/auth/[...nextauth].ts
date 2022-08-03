import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { SessionNextAuth } from '../../../context/Auth/useUser.utils';
import { checkUserEmailPassword, OAuthoDbUser } from './../../../database/dbUsers';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        return await checkUserEmailPassword(email, password);
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (!account) return token;

      token.accessToken = account.access_token;

      switch (account.type) {
        case 'oauth':
          token.user = await OAuthoDbUser(token.email || '', token.name || '');
          break;
        case 'email':
          break;
        case 'credentials':
          const authData = user as unknown as SessionNextAuth;
          token.user = {
            ...authData._doc,
            email: authData.email,
          };
          break;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
});
