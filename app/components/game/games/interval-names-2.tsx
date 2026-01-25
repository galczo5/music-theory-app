import { type Interval, randomInterval, semitones } from '~/music/interval';
import { useState } from 'react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import type { Result } from '~/types/game';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import { IntervalsKeyboard } from '~/components/keyboard/intervals-keyboard';
import { Game } from '~/components/game/game';
import { GameContent } from '~/components/game/gameContent';
import { GameFooter } from '~/components/game/gameFooter';
import { getStoredSetting } from '~/components/settings/settingsContext';
import { StoredSettings } from '~/config/storedSettings';

type GameData = {
  readonly interval: Interval;
  readonly timeStart: number;
};

function generateData(): GameData {
  return {
    interval: randomInterval(),
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

  const onIntervalSelected = (interval: Interval): void => {
    const check = interval === data.interval;
    const difference = semitones(data.interval);
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
    <Game>
      <GameContent>
        {timer && <GameTimer seconds={5} onTimeout={timerEnd} />}
        {!gameEnd && !timer && !result && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH1>
              Name interval of <span className="text-primary">{semitones(data.interval)}</span> semitones
            </TypographyH1>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !timer && !result && (
        <GameFooter>
          <IntervalsKeyboard onIntervalClick={onIntervalSelected} randomize={true} />
        </GameFooter>
      )}
    </Game>
  );
}
