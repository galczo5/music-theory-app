import type { Game } from '~/types/game';

export const GAMES: Game[] = [
  {
    id: 'interval-names',
    type: 'theory',
    name: 'Interval values',
    description:
      'Test your knowledge of interval distances by identifying the exact number of semitones for each given interval name.',
    path: '/play/interval-names'
  },
  {
    id: 'interval-names-2',
    type: 'theory',
    name: 'Interval names',
    description:
      'Train your interval recognition skills by naming the correct musical interval when given its distance in semitones.',
    path: '/play/interval-names-2'
  }
];
