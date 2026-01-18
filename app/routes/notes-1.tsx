import { Keyboard } from '~/components/keyboard/keyboard';
import { type Note, randomNote } from '~/music/notes';
import { useState } from 'react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { GameNav } from '~/components/game/gameNav';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import { PlayerButton } from '~/components/midi-player/player-button';

type GameData = {
  readonly rootNote: Note;
  readonly timeStart: number;
};

function generateData(): GameData {
  return {
    rootNote: randomNote(),
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

  const onNoteSelected = (note: Note): void => {
    const check = note === data.rootNote;
    const currentResult: Result = {
      result: check,
      time: new Date().getTime() - data.timeStart,
      description: check
        ? `You selected correct note - ${note}.`
        : `You selected wrong note - ${note}, correct answer is ${data.rootNote}.`
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
            <TypographyH1>
              <TypographyH1>Listen and select the right note</TypographyH1>
            </TypographyH1>
            <div className="mt-3">
              <PlayerButton note={data.rootNote} />
            </div>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </div>
      {!gameEnd && !timer && !result && (
        <div className="flex flex-col items-center justify-center p-6">
          <Keyboard onNoteClick={onNoteSelected} play={true} />
        </div>
      )}
    </div>
  );
}
