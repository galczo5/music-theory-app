import { Keyboard } from '~/components/keyboard/keyboard';
import { interval, type Note, randomNote } from '~/music/notes';
import { type Interval, randomInterval, semitones } from '~/music/interval';
import { useState } from 'react';
import { TypographyH1 } from '~/components/ui/typography';

type GameData = {
  readonly rootNote: Note;
  readonly interval: Interval;
};

function generateData(): GameData {
  return {
    rootNote: randomNote(),
    interval: randomInterval()
  };
}

export default function () {
  const [data, setData] = useState(generateData());

  const onNoteSelected = (note: Note): void => {
    const result = interval(data.rootNote, note);

    console.log({
      result,
      semitones: semitones(data.interval)
    });

    if (result === semitones(data.interval) % 12) {
      alert('OK');
      setData(generateData());
    } else {
      alert('ERROR');
    }
  };

  return (
    <div>
      <TypographyH1>
        {data.interval} of {data.rootNote}
      </TypographyH1>
      <Keyboard onNoteClick={onNoteSelected} />
    </div>
  );
}
