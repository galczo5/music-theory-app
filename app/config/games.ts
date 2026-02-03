import type { Game } from '~/types/game';

export const GAMES: Game[] = [
  {
    id: 'notes-1',
    type: 'listen',
    name: 'Notes 1',
    description: 'Listen to the audio and identify note names.',
    path: '/play/notes-1'
  },
  {
    id: 'notes-3',
    type: 'listen',
    name: 'Notes 3',
    description: 'Listen to the audio and identify note names.',
    path: '/play/notes-3'
  },
  {
    id: 'intervals-1',
    type: 'theory',
    name: 'Intervals 1',
    description: 'Select the correct notes for the specified interval name.',
    path: '/play/interval-names-1'
  },
  {
    id: 'intervals-2',
    type: 'theory',
    name: 'Intervals 2',
    description: 'Identify the interval name based on the number of semitones.',
    path: '/play/interval-names-2'
  },
  {
    id: 'intervals-3',
    type: 'listen',
    name: 'Interval 3',
    description: 'Listen to the audio and identify the interval played.',
    path: '/play/interval-names-3'
  },
  {
    id: 'chords-1',
    type: 'theory',
    name: 'Chords 1',
    description: 'Construct major and minor chords.',
    path: '/play/chords-1'
  },
  {
    id: 'chords-2',
    type: 'theory',
    name: 'Chords 2',
    description: 'Construct diminished and augmented chords.',
    path: '/play/chords-2'
  },
  {
    id: 'chords-3',
    type: 'theory',
    name: 'Chords 3',
    description: 'Construct seventh and ninth chords.',
    path: '/play/chords-3'
  },
  {
    id: 'chords-4',
    type: 'listen',
    name: 'Chords 4',
    description: 'Listen to the audio and identify major and minor chords.',
    path: '/play/chords-4'
  },
  {
    id: 'chords-5',
    type: 'listen',
    name: 'Chords 5',
    description: 'Listen to the audio and identify diminished and augmented chords.',
    path: '/play/chords-5'
  },
  {
    id: 'chords-6',
    type: 'listen',
    name: 'Chords 6',
    description: 'Listen to the audio and identify seventh and ninth chords.',
    path: '/play/chords-6'
  },
  {
    id: 'chords-7',
    type: 'theory',
    name: 'Chords 7',
    description: 'Identify the correct major or minor chord name based on the provided notes.',
    path: '/play/chords-7'
  },
  {
    id: 'chords-8',
    type: 'theory',
    name: 'Chords 8',
    description: 'Identify the correct diminished or augmented chord name based on the provided notes.',
    path: '/play/chords-8'
  },
  {
    id: 'chords-9',
    type: 'theory',
    name: 'Chords 9',
    description: 'Identify the correct seventh or ninth chord name based on the provided notes.',
    path: '/play/chords-9'
  },
  {
    id: 'scales-1',
    type: 'listen',
    name: 'Scales 1',
    description: 'Identify the scale type based on the provided notes.',
    path: '/play/scales-1',
    disabled: true
  },
  {
    id: 'scales-2',
    type: 'listen',
    name: 'Scales 2',
    description: 'Construct the requested musical scales.',
    path: '/play/scales-2',
    disabled: true
  }
];
