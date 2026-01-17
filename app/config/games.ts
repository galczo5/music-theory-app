import type { Game } from '~/types/game';

export const GAMES: Game[] = [
  {
    id: 'intervals-1',
    type: 'theory',
    name: 'Intervals 1',
    description:
      'Test your knowledge of interval distances by identifying the exact number of semitones for each given interval name.',
    path: '/play/interval-names'
  },
  {
    id: 'intervals-2',
    type: 'theory',
    name: 'Intervals 2',
    description:
      'Train your interval recognition skills by naming the correct musical interval when given its distance in semitones.',
    path: '/play/interval-names-2'
  },
  {
    id: 'intervals-3',
    type: 'listen',
    name: 'Interval 3',
    description:
      'Train your interval recognition skills by naming the correct musical interval when given its distance in semitones.',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'chords-1',
    type: 'theory',
    name: 'Chords 1',
    description: 'Major and minor chords',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'chords-2',
    type: 'theory',
    name: 'Chords 2',
    description: 'Diminished and Augmented chords',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'chords-3',
    type: 'theory',
    name: 'Chords 3',
    description: 'Seventh and ninth chords',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'chords-4',
    type: 'listen',
    name: 'Chords 4',
    description: 'Listen to major and minor chords',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'chords-5',
    type: 'listen',
    name: 'Chords 5',
    description: 'Listen to Diminished and Augmented chords',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'chords-5',
    type: 'listen',
    name: 'Chords 5',
    description: 'Listen to Seventh and ninth chords',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'scales-1',
    type: 'listen',
    name: 'Scales 1',
    description: 'Recognize scales',
    path: '/play/interval-names-3',
    disabled: true
  },
  {
    id: 'scales-2',
    type: 'listen',
    name: 'Scales 2',
    description: 'Build scales',
    path: '/play/interval-names-3',
    disabled: true
  }
];
