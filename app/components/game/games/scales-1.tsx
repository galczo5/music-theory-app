import { type Note } from '~/music/notes';
import { useState } from 'react';
import { TypographyH2, TypographyH3 } from '~/components/ui/typography';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import { Game } from '~/components/game/game';
import { GameContent } from '~/components/game/gameContent';
import { GameFooter } from '~/components/game/gameFooter';
import { getStoredSetting } from '~/components/settings/settingsContext';
import { StoredSettings } from '~/config/storedSettings';
import { ScalesKeyboard } from '~/components/keyboard/scales-keyboard';
import type { Scale } from '~/types/scale';
import { randomScale } from '~/music/scale';
import { GameScaleNotes } from '~/components/game/gameScaleNotes';

type GameData = {
  readonly scale: Scale;
  readonly timeStart: number;
};

function generateData(): GameData {
  return {
    scale: randomScale(),
    timeStart: new Date().getTime()
  };
}

const ROUNDS = getStoredSetting(StoredSettings.infiniteModeEnabled) ? 50 : 10;

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
            <TypographyH2>Name the scale</TypographyH2>
            <div className="mt-3">
              <GameScaleNotes scale={data.scale} />
            </div>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !result && (
        <GameFooter>
          <ScalesKeyboard />
        </GameFooter>
      )}
    </Game>
  );
}
