import { useWeddingConfig } from '../context/WeddingContext';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const { language } = useWeddingConfig();
  return translations[language ?? 'ko'];
}
