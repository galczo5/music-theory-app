import { PianoKeyboard } from '~/components/keyboard/piano-keyboard';
import { type Note, randomNote } from '~/music/notes';
import { useState } from 'react';
import { TypographyH2, TypographyH3 } from '~/components/ui/typography';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import { PlayerButton } from '~/components/midi-player/player-button';
import { Game } from '~/components/game/game';
import { GameContent } from '~/components/game/gameContent';
import { GameFooter } from '~/components/game/gameFooter';

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
    <Game>
      <GameContent>
        {timer && <GameTimer seconds={5} onTimeout={timerEnd} />}
        {!gameEnd && !timer && !result && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH2>Listen and select the right note</TypographyH2>
            <div className="mt-3">
              <PlayerButton note={data.rootNote} />
            </div>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !result && (
        <GameFooter>
          <PianoKeyboard onNoteClick={onNoteSelected} disabled={timer} play={true} />
        </GameFooter>
      )}
    </Game>
  );
}
