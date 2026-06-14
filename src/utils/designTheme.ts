import type { WeddingDesign } from '../types/wedding';
import { TITLE_FONT_MAP, BODY_FONT_MAP } from '../types/wedding';

const LEGACY_TITLE: Record<string, number> = { sm: 28, md: 36, lg: 44 };
const LEGACY_BODY:  Record<string, number> = { sm: 13, md: 15, lg: 17 };

export function buildCssVars(design: WeddingDesign): React.CSSProperties {
  const point = design.pointColor ?? design.keyColor ?? '#d4a5a5';

  const titlePx = typeof design.titleFontSize === 'number'
    ? design.titleFontSize
    : (LEGACY_TITLE[design.titleFontSize as unknown as string] ?? 36);

  const bodyPx = typeof design.bodyFontSize === 'number'
    ? design.bodyFontSize
    : (LEGACY_BODY[design.bodyFontSize as unknown as string] ?? 15);

  const headingPx    = design.headingFontSize ?? 16;
  const coverSubPx   = design.coverSubFontSize ?? 13;

  return {
    '--wf-title':          TITLE_FONT_MAP[design.titleFont],
    '--wf-body':           BODY_FONT_MAP[design.bodyFont],
    '--wf-title-size':     `${titlePx}px`,
    '--wf-heading-size':   `${headingPx}px`,
    '--wf-body-size':      `${bodyPx}px`,
    '--wf-cover-sub-size': `${coverSubPx}px`,
    '--wf-key':          point,
    '--bg-color':        design.bgColor   ?? '#FFF5F5',
    '--text-color':      design.textColor ?? '#44403c',
    '--heading-color':   design.headingColor ?? design.textColor ?? '#44403c',
    '--point-color':     point,
    '--sub-text-color':  design.subTextColor ?? '#78716c',
  } as React.CSSProperties;
}
