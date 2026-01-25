import './app.css';
import { ThemeProvider } from '~/themeProvider';
import { player, PlayerContext } from '~/components/midi-player/player';
import { HashRouter, Route, Routes } from 'react-router';
import Home from '~/routes/home';
import Chooser from '~/routes/chooser';
import IntervalNames from '~/components/game/games/interval-names-1';
import IntervalNames2 from '~/components/game/games/interval-names-2';
import IntervalNames3 from '~/components/game/games/interval-names-3';
import Notes1 from '~/components/game/games/notes-1';
import Chords1 from '~/components/game/games/chords-1';
import Chords2 from '~/components/game/games/chords-2';
import Chords3 from '~/components/game/games/chords-3';
import Chords4 from '~/components/game/games/chords-4';
import Chords5 from '~/components/game/games/chords-5';
import Chords6 from '~/components/game/games/chords-6';
import Chords7 from '~/components/game/games/chords-7';
import Chords8 from '~/components/game/games/chords-8';
import Chords9 from '~/components/game/games/chords-9';
import { DefaultSettingsContext, SettingsContext } from '~/components/settings/settingsContext';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayerContext.Provider value={player}>
        <SettingsContext.Provider value={DefaultSettingsContext}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<Chooser />} />
              <Route path="/play/notes-1" element={<Notes1 />} />
              <Route path="/play/interval-names-1" element={<IntervalNames />} />
              <Route path="/play/interval-names-2" element={<IntervalNames2 />} />
              <Route path="/play/interval-names-3" element={<IntervalNames3 />} />
              <Route path="/play/chords-1" element={<Chords1 />} />
              <Route path="/play/chords-2" element={<Chords2 />} />
              <Route path="/play/chords-3" element={<Chords3 />} />
              <Route path="/play/chords-4" element={<Chords4 />} />
              <Route path="/play/chords-5" element={<Chords5 />} />
              <Route path="/play/chords-6" element={<Chords6 />} />
              <Route path="/play/chords-7" element={<Chords7 />} />
              <Route path="/play/chords-8" element={<Chords8 />} />
              <Route path="/play/chords-9" element={<Chords9 />} />
            </Routes>
          </HashRouter>
        </SettingsContext.Provider>
      </PlayerContext.Provider>
    </ThemeProvider>
  );
}
