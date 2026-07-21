"use client";

import { MotionConfig } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type MotionPreferenceValue = {
  hydrated: boolean;
  reduceMotion: boolean;
  toggleMotion: () => void;
};

const MotionPreferenceContext = createContext<MotionPreferenceValue | null>(null);
const subscribeToHydration = () => () => {};
const getClientHydration = () => true;
const getServerHydration = () => false;
const MOTION_STORAGE_KEY = "picodavi-motion";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServerSnapshot = () => false;
const MOTION_CHANGE_EVENT = "picodavi-motion-change";

function subscribeToMotionOverride(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(MOTION_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(MOTION_CHANGE_EVENT, onStoreChange);
  };
}

const getMotionOverrideSnapshot = () => localStorage.getItem(MOTION_STORAGE_KEY);
const getMotionOverrideServerSnapshot = () => null;

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydration,
    getServerHydration,
  );
  const systemReduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const motionOverride = useSyncExternalStore(
    subscribeToMotionOverride,
    getMotionOverrideSnapshot,
    getMotionOverrideServerSnapshot,
  );
  const reduceMotion =
    motionOverride === "reduced"
      ? true
      : motionOverride === "full"
        ? false
        : systemReduceMotion;

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? "reduced" : "full";
  }, [reduceMotion]);

  return (
    <MotionPreferenceContext.Provider
      value={{
        hydrated,
        reduceMotion,
        toggleMotion: () => {
          const next = !reduceMotion;
          localStorage.setItem(MOTION_STORAGE_KEY, next ? "reduced" : "full");
          window.dispatchEvent(new Event(MOTION_CHANGE_EVENT));
        },
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
