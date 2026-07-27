export type ExhibitId = 'coral-garden' | 'bleached-reef' | 'plastic-cove' | 'rehab-bay';

/** Which extra prop set an exhibit renders on top of the base environment. */
export type PropSet = 'none' | 'debris' | 'rehab';

/** Every visual knob that makes one exhibit look different from another.
 * The scene geometry is shared; only these values change. */
export interface ExhibitTheme {
  /** Background and fog colour of the water. */
  waterColor: string;
  fogNear: number;
  fogFar: number;
  ambientIntensity: number;
  directionalIntensity: number;
  lightColor: string;
  sandColor: string;
  rockColor: string;
  /** Coral cluster colours; a bleached reef uses pale greys. */
  coralPalette: string[];
  kelpColor: string;
  /** 0-1. Scales how many kelp strands and how lush they look. */
  kelpDensity: number;
  /** Multiplier on the ambient fish count — damaged water holds less life. */
  fishDensity: number;
  propSet: PropSet;
}

export interface Exhibit {
  id: ExhibitId;
  name: string;
  /** Short label shown on the switcher tab. */
  tagline: string;
  /** True for exhibits that depict a damaged environment. */
  isDamaged: boolean;
  /** One-line summary shown in the HUD. */
  summary: string;
  /** What is happening here (2-3 sentences, factual and non-alarmist). */
  description: string;
  /** What helps — the constructive takeaway. */
  whatHelps: string;
  theme: ExhibitTheme;
}
