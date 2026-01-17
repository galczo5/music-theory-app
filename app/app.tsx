import './app.css';
import { ThemeProvider } from '~/themeProvider';
import { player, PlayerContext } from '~/components/midi-player/player';
import { HashRouter, Route, Routes } from 'react-router';
import Home from '~/routes/home';
import Chooser from '~/routes/chooser';
import IntervalNames from '~/routes/interval-names';
import IntervalNames2 from '~/routes/interval-names-2';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayerContext.Provider value={player}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Chooser />} />
            <Route path="/play/interval-names" element={<IntervalNames />} />
            <Route path="/play/interval-names-2" element={<IntervalNames2 />} />
          </Routes>
        </HashRouter>
      </PlayerContext.Provider>
    </ThemeProvider>
  );
}
