export enum Interval {
  PerfectUnison = 'Perfect unison',
  MinorSecond = 'Minor second',
  MajorSecond = 'Major second',
  MinorThird = 'Minor third',
  MajorThird = 'Major third',
  PerfectFourth = 'Perfect fourth',
  Tritone = 'Tritone',
  PerfectFifth = 'Perfect fifth',
  MinorSixth = 'Minor sixth',
  MajorSixth = 'Major sixth',
  MinorSeventh = 'Minor seventh',
  MajorSeventh = 'Major seventh',
  PerfectOctave = 'Perfect octave'
}

export function semitones(interval: Interval): number {
  return Object.values(Interval).indexOf(interval);
}

export function randomInterval(): Interval {
  const intervalArray = Object.values(Interval);

  const length = intervalArray.length;
  const random = Math.floor(Math.random() * length);
  return intervalArray.at(random) || Interval.PerfectOctave;
}
