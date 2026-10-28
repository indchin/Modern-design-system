"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as external state — avoids a setState-in-effect cascade and
 * returns false during SSR, so pointer effects mount only on the client.
 */
export function useMedia(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** True only where pointer effects are allowed — see §9.4. */
export function usePointerEffects() {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const calm = useMedia("(prefers-reduced-motion: reduce)");
  return fine && !calm;
}
