import { randomNote } from '~/music/notes';
import { Interval } from '~/music/interval';
import { useState } from 'react';
import { TypographyH2, TypographyH3 } from '~/components/ui/typography';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import type { Chord, MajorChord, MinorChord } from '~/types/chord';
import { chordName, compareChords } from '~/music/chord';
import { Game } from '~/components/game/game';
import { GameContent } from '~/components/game/gameContent';
import { GameFooter } from '~/components/game/gameFooter';
import { ChordKeyboard } from '~/components/keyboard/chord-keyboard';
import { GameChordNotes } from '~/components/game/gameChordNotes';

type GameDataMajorChord = {
  readonly type: 'major';
  readonly chord: MajorChord;
  readonly timeStart: number;
};

type GameDataMinorChord = {
  readonly type: 'minor';
  readonly chord: MinorChord;
  readonly timeStart: number;
};

type GameData = GameDataMinorChord | GameDataMajorChord;

function generateData(): GameData {
  const type = Math.random() < 0.5 ? 'major' : 'minor';

  if (type === 'major') {
    return {
      chord: [randomNote(), Interval.MajorThird, Interval.MinorThird],
      type,
      timeStart: new Date().getTime()
    };
  }

  return {
    chord: [randomNote(), Interval.MinorThird, Interval.MajorThird],
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
            <TypographyH2>Name the chord</TypographyH2>
            <GameChordNotes chord={data.chord} />
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !result && (
        <GameFooter>
          <ChordKeyboard onSelect={onChordSelected} types={['Major', 'Minor']} />
        </GameFooter>
      )}
    </Game>
  );
}
