import { useWeddingConfig } from '../context/WeddingContext';
import FlowerPetal from './FlowerPetal';
import RosePetal from './RosePetal';
import SnowFlake from './SnowFlake';
import StarParticle from './StarParticle';
import Glitter from './Glitter';
import CoverPolaroid from './CoverPolaroid';
import CoverTypo from './CoverTypo';
import CoverFullscreen from './CoverFullscreen';
import CoverMinimal from './CoverMinimal';
import CoverWatercolor from './CoverWatercolor';
import CoverDarkBotanical from './CoverDarkBotanical';
import CoverFilm from './CoverFilm';

function IntroEffect({ type }: { type: string }) {
  if (type === 'flower')  return <FlowerPetal />;
  if (type === 'rose')    return <RosePetal />;
  if (type === 'snow')    return <SnowFlake />;
  if (type === 'star')    return <StarParticle />;
  if (type === 'glitter') return <Glitter />;
  return null;
}

export default function Cover() {
  const { design } = useWeddingConfig();

  return (
    <section className="relative overflow-hidden">
      <IntroEffect type={design.introEffect} />
      {design.coverStyle === 'polaroid'   && <CoverPolaroid />}
      {design.coverStyle === 'typo'       && <CoverTypo />}
      {design.coverStyle === 'fullscreen' && <CoverFullscreen />}
      {design.coverStyle === 'minimal'    && <CoverMinimal />}
      {design.coverStyle === 'watercolor' && <CoverWatercolor />}
      {design.coverStyle === 'botanical'  && <CoverDarkBotanical />}
      {design.coverStyle === 'film'       && <CoverFilm />}
    </section>
  );
}
