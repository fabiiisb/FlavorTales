import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  callbacks: {
    session: async ({ session, token } : {session: any, token: any}) => {
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
}

const handler = nextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }
          )
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, options
        )

        const response = await res.json()
        const user = response.userData

        const backResp = {
          message: response.message,
          error: response.error
        }

        if (response.error === true) throw backResp

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.image
        }
      }
    })
  ],
  pages: {
    signIn: '../../../login'
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.image = user.image
      }
      if (trigger === 'update' && session?.image) {
        token.image = session.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.image as string | null | undefined;
      }
   
      return session
    }
  }
})

export { handler as GET, handler as POST }
