import { create } from 'zustand'

export const useStore = create((set) => ({
    currentScene: 'boot', // boot, neural, ai-lab, project, experience, contact
    selectedProject: null,
    isAudioEnabled: false,

    // New: System Status for Pratham OS Console
    isSystemReady: false,
    consoleOutput: [], // Start clean for authentic terminal feel

    setScene: (scene) => set({ currentScene: scene }),
    selectProject: (project) => set({ selectedProject: project, currentScene: 'project' }),
    toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),

    // Console Actions
    setSystemReady: (ready) => set({ isSystemReady: ready }),
    addToLog: (entry) => set((state) => ({ consoleOutput: [...state.consoleOutput, entry] })),
    clearLog: () => set({ consoleOutput: [] }),
}))
