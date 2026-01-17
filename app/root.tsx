import { Outlet } from 'react-router';
import './app.css';
import { ThemeProvider } from '~/themeProvider';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}
