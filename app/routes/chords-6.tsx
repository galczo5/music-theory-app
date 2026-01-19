import { type Note, randomNote } from '~/music/notes';
import { Interval } from '~/music/interval';
import { useState } from 'react';
import { TypographyH2, TypographyH3 } from '~/components/ui/typography';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import type { Chord, Major7Chord, Major9Chord, Minor7Chord, Minor9Chord } from '~/types/chord';
import { chordName, compareChords } from '~/music/chord';
import { Game } from '~/components/game/game';
import { GameContent } from '~/components/game/gameContent';
import { GameFooter } from '~/components/game/gameFooter';
import { PlayerButton } from '~/components/midi-player/player-button';
import { ChordKeyboard } from '~/components/keyboard/chord-keyboard';

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

  const onChordSelected = (chord: Chord): void => {
    const check = compareChords(chord, data.chord);
    const currentResult: Result = {
      result: check,
      time: new Date().getTime() - data.timeStart,
      description: check
        ? `It is ${chordName(data.chord)}`
        : `Correct answer is ${chordName(data.chord)}, not ${chordName(chord)}.`
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

    if (results.length === ROUNDS) {
      setGameEnd(true);
    } else {
      setData(generateData());
    }
  };

  return (
    <Game>
      <GameContent>
        {timer && <GameTimer seconds={5} onTimeout={timerEnd} />}
        {!gameEnd && !timer && !result && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH2>Listen to the chord</TypographyH2>
            <PlayerButton chord={data.chord} />
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !result && (
        <GameFooter>
          <ChordKeyboard onSelect={onChordSelected} types={['Major 7', 'Minor 7', 'Major 9', 'Minor 9']} />
        </GameFooter>
      )}
    </Game>
  );
}
