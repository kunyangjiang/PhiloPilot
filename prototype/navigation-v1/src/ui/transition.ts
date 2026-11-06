// Cross-view choreography state. A view that starts a transition records where
// the motion should originate (e.g. the CN1 node's screen position), and the
// arriving view reads it to continue the motion from the same place.

export interface Origin {
  x: number;
  y: number;
  r?: number;
}

let pending: { kind: 'iris-open' | 'iris-close' | 'weave'; origin?: Origin; rows?: DOMRect[] } | null = null;

export const setPending = (p: typeof pending) => (pending = p);
export const takePending = () => {
  const p = pending;
  pending = null;
  return p;
};
export const peekPending = () => pending;
