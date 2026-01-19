import { PianoKeyboard } from '~/components/keyboard/piano-keyboard';
import { interval, type Note, randomNote } from '~/music/notes';
import { type Interval, randomInterval, semitones, transpose } from '~/music/interval';
import { useState } from 'react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import type { Result } from '~/types/game';
import { GameHint } from '~/components/game/gameHint';
import { GameTimer } from '~/components/game/gameTimer';
import { GameResult } from '~/components/game/gameResult';
import { GameSummary } from '~/components/game/gameSummary';
import { Game } from '~/components/game/game';
import { GameContent } from '~/components/game/gameContent';
import { GameFooter } from '~/components/game/gameFooter';

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

  const onNoteSelected = (note: Note): void => {
    const result = interval(data.rootNote, note);

    const difference = semitones(data.interval);
    const check = result === difference % 12;
    const currentResult: Result = {
      result: check,
      time: new Date().getTime() - data.timeStart,
      description: check
        ? `${note} is ${data.interval} of ${data.rootNote}`
        : `${note} is NOT ${data.interval} of ${data.rootNote}. Correct answer is ${transpose(data.rootNote, data.interval)}.`
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
              <span className="text-primary">{data.interval}</span> of {data.rootNote}
            </TypographyH1>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !result && (
        <GameFooter>
          <GameHint hint={`${data.interval} equals to ${semitones(data.interval)} semitones`}></GameHint>
          <PianoKeyboard onNoteClick={onNoteSelected} disabled={timer} selectedNote={data.rootNote} play={true} />
        </GameFooter>
      )}
    </Game>
  );
}
