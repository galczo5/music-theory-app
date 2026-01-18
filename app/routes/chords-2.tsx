import { Keyboard } from '~/components/keyboard/keyboard';
import { interval, type Note, randomNote } from '~/music/notes';
import { Interval, semitones } from '~/music/interval';
import { useState } from 'react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { GameNav } from '~/components/game/gameNav';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import type { AugmentedChord, DiminishedChord } from '~/types/chord';
import { GameChord } from '~/components/game/gameChord';
import { chordName, chordNotes } from '~/music/chord';

type GameDataAugmentedChord = {
  readonly type: 'augmented';
  readonly chord: AugmentedChord;
  readonly timeStart: number;
};

type GameDataMinorDiminishedChord = {
  readonly type: 'diminished';
  readonly chord: DiminishedChord;
  readonly timeStart: number;
};

type GameData = GameDataAugmentedChord | GameDataMinorDiminishedChord;

function generateData(): GameData {
  const type = Math.random() < 0.5 ? 'diminished' : 'augmented';

  if (type === 'diminished') {
    return {
      chord: [randomNote(), Interval.MinorThird, Interval.MinorThird],
      type,
      timeStart: new Date().getTime()
    };
  }

  return {
    chord: [randomNote(), Interval.MajorThird, Interval.MajorThird],
    type,
    timeStart: new Date().getTime()
  };
}

const ROUNDS = 10;

export default function () {
  const [gameEnd, setGameEnd] = useState(false);
  const [data, setData] = useState(generateData());
  const [timer, setTimer] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [counter, setCounter] = useState(0);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const onNoteSelected = (note: Note): void => {
    const newNotes = [...selectedNotes, note];

    if (newNotes.length < 3) {
      setSelectedNotes(newNotes);
      return;
    }

    const firstIntervalCorrect = interval(newNotes[0], newNotes[1]) === semitones(data.chord[1]);
    const secondIntervalCorrect = interval(newNotes[1], newNotes[2]) === semitones(data.chord[2]);
    const check = firstIntervalCorrect && secondIntervalCorrect;
    const currentResult: Result = {
      result: check,
      time: new Date().getTime() - data.timeStart,
      description: check
        ? `${chordName(data.chord)} contains ${newNotes.join(' ')}`
        : `${chordName(data.chord)} contains ${chordNotes(data.chord).join(' ')}, you selected ${newNotes.join(' ')}`
    };

    setResults([...results, currentResult]);
    setResult(currentResult);
    setCounter(counter + 1);
  };

  const timerEnd = () => {
    setTimer(false);
    setData(generateData());
  };

  const onContinue = () => {
    setResult(null);
    setSelectedNotes([]);

    if (results.length === ROUNDS) {
      setGameEnd(true);
    } else {
      setData(generateData());
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center h">
      <GameNav />
      <div className="grow flex flex-col gap-3 items-center justify-center">
        {timer && <GameTimer seconds={5} onTimeout={timerEnd} />}
        {!gameEnd && !timer && !result && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH1>Construct the chord</TypographyH1>
            <GameChord chord={data.chord} />
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </div>
      {!gameEnd && !timer && !result && (
        <div className="flex flex-col items-center justify-center p-6">
          <Keyboard onNoteClick={onNoteSelected} selectedNote={selectedNotes} play={true} />
        </div>
      )}
    </div>
  );
}
