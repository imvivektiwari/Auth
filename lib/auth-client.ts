import { createAuthClient } from "better-auth/react"

// This is a client-side only module, so we can safely create the auth client here
//signIn, signUp, signOut, getSession, getUser, onAuthStateChange
export const authClient =  createAuthClient({
    //   baseURL: "http://localhost:3000"
})