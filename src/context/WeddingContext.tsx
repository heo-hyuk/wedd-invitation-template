import { createContext, useContext } from 'react';
import type { WeddingConfig } from '../types/wedding';
import { config } from '../data/config';

export const WeddingContext = createContext<WeddingConfig>(config);

export function useWeddingConfig(): WeddingConfig {
  return useContext(WeddingContext);
}
