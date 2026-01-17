import { Keyboard } from '~/components/keyboard/keyboard';
import { interval, type Note, randomNote } from '~/music/notes';
import { type Interval, randomInterval, semitones } from '~/music/interval';
import { useState } from 'react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { GameNav } from '~/components/game/gameNav';
import type { Result } from '~/types/game';
import { GameHint } from '~/components/game/gameHint';
import { Timer } from '~/components/game/timer';

type GameData = {
  readonly rootNote: Note;
  readonly interval: Interval;
  readonly timeStart: number;
};

function generateData(): GameData {
  return {
    rootNote: randomNote(),
    interval: randomInterval(),
    timeStart: new Date().getTime()
  };
}

const ROUNDS = 10;

export default function () {
  const [data, setData] = useState(generateData());
  const [timer, setTimer] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [counter, setCounter] = useState(0);

  const onNoteSelected = (note: Note): void => {
    const result = interval(data.rootNote, note);

    const difference = semitones(data.interval);
    if (result === difference % 12) {
      setResults([
        ...results,
        {
          result: true,
          time: new Date().getTime() - data.timeStart
        }
      ]);
    } else {
      setResults([
        ...results,
        {
          result: false,
          time: new Date().getTime() - data.timeStart
        }
      ]);
    }

    setCounter(counter + 1);
    setData(generateData());
  };

  const timerEnd = () => {
    setTimer(false);
    setData(generateData());
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center h">
      <GameNav />
      <div className="grow flex flex-col gap-3 items-center justify-center">
        {timer && <Timer seconds={5} onTimeout={timerEnd} />}
        {!timer && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH1>
              <span className="text-primary">{data.interval}</span> of {data.rootNote}
            </TypographyH1>
          </>
        )}
      </div>
      {!timer && (
        <div className="flex flex-col items-center justify-center p-6">
          <GameHint hint={`${data.interval} equals to ${semitones(data.interval)} semitones`}></GameHint>
          <Keyboard onNoteClick={onNoteSelected} selectedNote={data.rootNote} />
        </div>
      )}
    </div>
  );
}
