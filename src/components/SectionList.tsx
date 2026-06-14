import type { ComponentType } from 'react';
import type { SectionConfig } from '../types/wedding';
import { DEFAULT_SECTIONS } from '../types/wedding';
import Cover from './Cover';
import Greeting from './Greeting';
import WeddingInfo from './WeddingInfo';
import Gallery from './Gallery';
import Location from './Location';
import Contact from './Contact';
import Account from './Account';
import Guestbook from './Guestbook';
import Rsvp from './Rsvp';

const SECTION_COMPONENT_MAP: Record<string, ComponentType> = {
  cover:       Cover,
  greeting:    Greeting,
  weddingInfo: WeddingInfo,
  gallery:     Gallery,
  location:    Location,
  contact:     Contact,
  account:     Account,
  guestbook:   Guestbook,
  rsvp:        Rsvp,
};

export default function SectionList({ sections }: { sections?: SectionConfig[] }) {
  const sorted = [...(sections ?? DEFAULT_SECTIONS)].sort((a, b) => a.order - b.order);
  return (
    <>
      {sorted
        .filter(s => s.enabled)
        .map(s => {
          const Comp = SECTION_COMPONENT_MAP[s.id];
          return Comp ? <Comp key={s.id} /> : null;
        })}
    </>
  );
}
