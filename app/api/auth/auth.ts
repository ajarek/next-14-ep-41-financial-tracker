import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { User } from '@/lib/models'
import connectToDb from '@/lib/connectToDb'
import bcrypt from 'bcryptjs'
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    error: '/register',
  },
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '#0E78F9', // Hex color code
    logo: '/images/logo.png', // Absolute URL to image
    buttonText: '#ffffff', // Hex color code
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        username: { type: 'text', required: true },
        password: { type: 'password', required: true },
      },
      async authorize(credentials: any) {
        await connectToDb()
        try {
          const user = await User.findOne({ username: credentials.username })
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )
            if (isPasswordCorrect) {
              return user
            }
          }
        } catch (err: any) {
          throw new Error(err)
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`
    },
  },
})
