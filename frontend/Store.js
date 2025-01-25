import { create } from 'zustand'

const useStore = create((set) => ({
    link: '',
    user: '',
    setUser: (newUser) => set({user: newUser}),
    setLink: (newLink) => set({ link: newLink }),
}))

export default useStore;
