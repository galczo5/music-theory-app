export type Lesson = {
  readonly title: string;
  readonly loader: () => Promise<string>;
};

export const LESSONS: Lesson[] = [
  {
    title: 'Lesson 1: The Musical Notes',
    loader: () => import('~/config/lessons/01.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 2: Intervals',
    loader: () => import('~/config/lessons/02.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 3: The Major Chord',
    loader: () => import('~/config/lessons/03.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 4: The Minor Chord',
    loader: () => import('~/config/lessons/04.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 5: Augmented and Diminished Chords',
    loader: () => import('~/config/lessons/05.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 6: 7th and 9th Chords',
    loader: () => import('~/config/lessons/06.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Chord Summary Table',
    loader: () => import('~/config/lessons/07.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 7: Introduction to Musical Modes',
    loader: () => import('~/config/lessons/08.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 8: Building Scales (The Formulas)',
    loader: () => import('~/config/lessons/09.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 9: Building Chords from a Scale',
    loader: () => import('~/config/lessons/10.md?raw').then((lesson) => lesson.default as unknown as string)
  },
  {
    title: 'Lesson 10: Chord Progressions',
    loader: () => import('~/config/lessons/11.md?raw').then((lesson) => lesson.default as unknown as string)
  }
];
