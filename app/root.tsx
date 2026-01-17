import { Outlet } from 'react-router';
import './app.css';
import { ThemeProvider } from '~/themeProvider';
import { player, PlayerContext } from '~/components/midi-player/midi-player';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PlayerContext.Provider value={player}>
        <Outlet />
      </PlayerContext.Provider>
    </ThemeProvider>
  );
}
