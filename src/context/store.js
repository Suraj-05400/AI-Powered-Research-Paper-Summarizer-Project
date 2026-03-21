import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Single method to set both (useful for Login/Register)
      setAuth: (token, user) => set({ token, user }),
      
      setUser: (user) => set({ user }),
      
      setToken: (token) => set({ token }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),

      logout: () => set({ user: null, token: null, error: null }),

      // Check if authenticated based on current state
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage', // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const usePaperStore = create((set) => ({
  papers: [],
  selectedPaper: null,
  isLoading: false,
  error: null,

  setPapers: (papers) => set({ papers }),
  setSelectedPaper: (paper) => set({ selectedPaper: paper }),
  addPaper: (paper) => set((state) => ({ papers: [paper, ...state.papers] })),
  removePaper: (paperId) =>
    set((state) => ({
      papers: state.papers.filter((p) => p.id !== paperId),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export const useUIStore = create((set) => ({
  showUploadModal: false,
  showQAModal: false,
  showSearchModal: false,
  sidebarOpen: true,

  toggleUploadModal: () => set((state) => ({ showUploadModal: !state.showUploadModal })),
  toggleQAModal: () => set((state) => ({ showQAModal: !state.showQAModal })),
  toggleSearchModal: () => set((state) => ({ showSearchModal: !state.showSearchModal })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));