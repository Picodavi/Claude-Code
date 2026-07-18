"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type MotionPreferenceValue = {
  hydrated: boolean;
  reduceMotion: boolean;
  systemReduced: boolean;
  toggleMotion: () => void;
};

const MotionPreferenceContext = createContext<MotionPreferenceValue | null>(null);
const subscribeToHydration = () => () => {};
const getClientHydration = () => true;
const getServerHydration = () => false;

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydration,
    getServerHydration,
  );
  const systemReduced = hydrated && Boolean(prefersReducedMotion);
  const [motionOverride, setMotionOverride] = useState(false);
  const reduceMotion = systemReduced && !motionOverride;

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "reduced" : "full";
  }, [reduceMotion]);

  return (
    <MotionPreferenceContext.Provider
      value={{
        hydrated,
        reduceMotion,
        systemReduced,
        toggleMotion: () => setMotionOverride((enabled) => !enabled),
      }}
    >
      <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  const value = useContext(MotionPreferenceContext);
  if (!value) throw new Error("useMotionPreference must be used inside MotionPreferenceProvider");
  return value;
}
