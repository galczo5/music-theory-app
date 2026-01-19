import type { ReactElement } from 'react';
import { Ear, Hammer, Music } from 'lucide-react';

export type GameType = 'theory' | 'listen';

export interface Game {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: GameType;
  readonly path: string;
  readonly disabled?: boolean;
}

export function getGameIcon(game: Game): ReactElement {
  if (game.disabled) {
    return <Hammer />;
  }

  switch (game.type) {
    case 'listen':
      return <Ear size={20} />;
    default:
      return <Music size={20} />;
  }
}

export interface Result {
  readonly result: boolean;
  readonly time: number;
  readonly description?: string;
}
