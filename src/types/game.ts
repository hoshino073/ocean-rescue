/** Stages of the fitting activity. */
export type GamePhase =
  | 'selecting' // choosing which device to use
  | 'positioning' // dragging / nudging the device into place
  | 'testing' // playing the short swim test after a good fit
  | 'results'; // score + educational fact

export interface Feedback {
  tone: 'info' | 'success' | 'retry';
  message: string;
}
