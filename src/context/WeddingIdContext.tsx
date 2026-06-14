import { createContext, useContext } from 'react';

export const WeddingIdContext = createContext<string | null>(null);

export function useWeddingId(): string | null {
  return useContext(WeddingIdContext);
}
