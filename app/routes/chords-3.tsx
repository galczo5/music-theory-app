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
import type { Major7Chord, Major9Chord, Minor7Chord, Minor9Chord } from '~/types/chord';
import { GameChord } from '~/components/game/gameChord';
import { chordName, chordNotes } from '~/music/chord';

type GameDataMajor7Chord = {
  readonly type: 'major7';
  readonly chord: Major7Chord;
  readonly timeStart: number;
};

type GameDataMinor7Chord = {
  readonly type: 'minor7';
  readonly chord: Minor7Chord;
  readonly timeStart: number;
};

type GameDataMajor9Chord = {
  readonly type: 'major9';
  readonly chord: Major9Chord;
  readonly timeStart: number;
};

type GameDataMinor9Chord = {
  readonly type: 'minor9';
  readonly chord: Minor9Chord;
  readonly timeStart: number;
};

type GameData = GameDataMajor7Chord | GameDataMinor7Chord | GameDataMajor9Chord | GameDataMinor9Chord;

function generateData(): GameData {
  const type1 = Math.random() < 0.5 ? 'major7' : 'minor7';
  const type2 = Math.random() < 0.5 ? 'major9' : 'minor9';
  const type = Math.random() < 0.5 ? type1 : type2;

  if (type === 'major7') {
    return {
      chord: [randomNote(), Interval.MajorThird, Interval.MinorThird, Interval.MajorThird],
      type,
      timeStart: new Date().getTime()
    };
  }

  if (type === 'minor7') {
    return {
      chord: [randomNote(), Interval.MinorThird, Interval.MajorThird, Interval.MinorThird],
      type,
      timeStart: new Date().getTime()
    };
  }

  if (type === 'major9') {
    return {
      chord: [randomNote(), Interval.MajorThird, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird],
      type,
      timeStart: new Date().getTime()
    };
  }

  return {
    chord: [randomNote(), Interval.MinorThird, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird],
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

    if (newNotes.length < data.chord.length) {
      setSelectedNotes(newNotes);
      return;
    }

    const firstIntervalCorrect = interval(newNotes[0], newNotes[1]) === semitones(data.chord[1]);
    const secondIntervalCorrect = interval(newNotes[1], newNotes[2]) === semitones(data.chord[2]);
    const thirdIntervalCorrect = interval(newNotes[2], newNotes[3]) === semitones(data.chord[3]);
    let forthIntervalCorrect = true;

    if (data.chord.length === 5) {
      forthIntervalCorrect = interval(newNotes[3], newNotes[4]) === semitones(data.chord[4]);
    }

    const check = firstIntervalCorrect && secondIntervalCorrect && thirdIntervalCorrect && forthIntervalCorrect;
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
