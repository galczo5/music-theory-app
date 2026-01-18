import { type Note, randomNote } from '~/music/notes';
import { type Interval, randomInterval, semitones } from '~/music/interval';
import { useState } from 'react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { GameNav } from '~/components/game/gameNav';
import type { Result } from '~/types/game';
import { GameHint } from '~/components/game/gameHint';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import { PlayerButton } from '~/components/midi-player/player-button';
import { IntervalsSelector } from '~/components/keyboard/intervals-selector';

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
  const [gameEnd, setGameEnd] = useState(false);
  const [data, setData] = useState(generateData());
  const [timer, setTimer] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [counter, setCounter] = useState(0);

  const onIntervalSelected = (interval: Interval): void => {
    const difference = semitones(data.interval);
    const check = interval === data.interval;
    const currentResult: Result = {
      result: check,
      time: new Date().getTime() - data.timeStart,
      description: check
        ? `${interval} is difference of ${difference} semitones.`
        : `${data.interval} is difference of ${difference} semitones. Your answer was ${interval} - ${semitones(interval)} semitones.`
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
    <div className="h-screen flex flex-col items-center justify-center h">
      <GameNav />
      <div className="grow flex flex-col gap-3 items-center justify-center">
        {timer && <GameTimer seconds={5} onTimeout={timerEnd} />}
        {!gameEnd && !timer && !result && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH1>Listen to two notes and name the interval</TypographyH1>
            <div className="mt-3">
              <PlayerButton interval={[data.rootNote, data.interval]} />
            </div>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </div>
      {!gameEnd && !timer && !result && (
        <div className="flex flex-col items-center justify-center p-6">
          <GameHint hint={`${data.interval} equals to ${semitones(data.interval)} semitones`}></GameHint>
          <IntervalsSelector onIntervalClick={onIntervalSelected} />
        </div>
      )}
    </div>
  );
}
