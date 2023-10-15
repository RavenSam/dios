import { logout } from "@/appwrite"
import { getSession } from "@/utils/get-funcs"
import { Models } from "appwrite"
import { create } from "zustand"

interface UserState {
   isLoading: boolean
   setIsLoading: (isLoading: boolean) => void

   getUserSession: () => void

   userSession: Models.User<Models.Preferences> | null
   setUserSession: (userSession: Models.User<Models.Preferences> | null) => void

   signOut: () => void
}

export const useUserStore = create<UserState>()((set) => ({
   isLoading: false,
   setIsLoading: (isLoading: boolean) => set({ isLoading }),

   getUserSession: async () => {
      set({ isLoading: true })
      const userSession = await getSession()
      set({ userSession, isLoading: false })
   },

   userSession: null,
   setUserSession: (userSession: Models.User<Models.Preferences> | null) => set({ userSession }),

   signOut: async () => {
      logout()
      await fetch("/api/auth", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ logout: true }),
      })
      set({ userSession: null })
   },
}))
