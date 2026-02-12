import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),

    CredentialsProvider({
      name: "Cuenta Demo",
      credentials: {
        email: { 
            label: "Email", 
            type: "text", 
            placeholder: "demo@gmail.com" 
        },
        password: { 
            label: "Contraseña (usar: admin123)", 
            type: "password", 
            placeholder: "admin123" 
        }
      },
      async authorize(credentials) {
        const demoUser = {
          email: "demo@gmail.com",
          password: "admin123" 
        };

        if (credentials.email === demoUser.email && credentials.password === demoUser.password) {
          return {
            id: "demo-user-id",
            name: "Admin Demo",
            email: "demo@gmail.com",
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            role: "admin"
          };
        }
        
        return null;
      }
    })
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
}

export default NextAuth(authOptions)