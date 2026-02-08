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
import { PianoKeyboard } from '~/components/keyboard/piano-keyboard';
import type { Scale } from '~/types/scale';
import { randomScale, scaleName, scaleNotes } from '~/music/scale';
import { GameScale } from '~/components/game/gameScale';
import { type Note, notesMatch } from '~/music/notes';

type GameData = {
  readonly scale: Scale;
  readonly timeStart: number;
};

const SCALE_NOTE_COUNT = 8;

function generateData(): GameData {
  return {
    scale: randomScale(),
    timeStart: new Date().getTime()
  };
}

const ROUNDS = getStoredSetting(StoredSettings.infiniteModeEnabled) ? 50 : 10;

export default function Scales2() {
  const [gameEnd, setGameEnd] = useState(false);
  const [data, setData] = useState(generateData());
  const [timer, setTimer] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [counter, setCounter] = useState(0);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

  const expectedNotes = scaleNotes(data.scale);
  const correctName = scaleName(data.scale);

  const onNoteClick = (note: Note): void => {
    const newNotes = [...selectedNotes, note];

    if (newNotes.length < SCALE_NOTE_COUNT) {
      setSelectedNotes(newNotes);
      return;
    }

    const check = notesMatch(newNotes, expectedNotes);
    const currentResult: Result = {
      result: check,
      time: new Date().getTime() - data.timeStart,
      description: check
        ? `You selected the correct scale - ${correctName}.`
        : `You selected the wrong notes: ${newNotes.join(' ')}. The correct scale is ${correctName}: ${expectedNotes.join(' ')}.`
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
    <Game>
      <GameContent>
        {timer && <GameTimer seconds={5} onTimeout={timerEnd} />}
        {!gameEnd && !timer && !result && (
          <>
            <TypographyH3>
              {counter + 1} of {ROUNDS}
            </TypographyH3>
            <TypographyH2>Construct the scale</TypographyH2>
            <div className="mt-3">
              <GameScale scale={data.scale} />
            </div>
          </>
        )}
        {!gameEnd && result && <GameResult result={result} onContinue={onContinue} />}
        {gameEnd && <GameSummary results={results} />}
      </GameContent>
      {!gameEnd && !result && (
        <GameFooter>
          <PianoKeyboard onNoteClick={onNoteClick} selectedNote={selectedNotes} play={true} disabled={timer} />
        </GameFooter>
      )}
    </Game>
  );
}
