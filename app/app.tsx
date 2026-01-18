import './app.css';
import { ThemeProvider } from '~/themeProvider';
import { player, PlayerContext } from '~/components/midi-player/player';
import { HashRouter, Route, Routes } from 'react-router';
import Home from '~/routes/home';
import Chooser from '~/routes/chooser';
import IntervalNames from '~/routes/interval-names-1';
import IntervalNames2 from '~/routes/interval-names-2';
import IntervalNames3 from '~/routes/interval-names-3';
import Notes1 from '~/routes/notes-1';
import Chords1 from '~/routes/chords-1';
import Chords2 from '~/routes/chords-2';
import Chords3 from '~/routes/chords-3';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayerContext.Provider value={player}>
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
          </Routes>
        </HashRouter>
      </PlayerContext.Provider>
    </ThemeProvider>
  );
}
