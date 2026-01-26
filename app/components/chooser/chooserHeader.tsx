import { Code, Library, Moon, Sun } from 'lucide-react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/themeProvider';
import { useNavigate } from 'react-router';

export const ChooserHeader = () => {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  const navigateToGitHub = () => {
    window.open('https://github.com/galczo5/music-theory-app', '_blank');
  };

  return (
    <div className="flex justify-between items-center pb-6">
      <div onClick={() => navigate('/')}>
        <div className="items-center gap-3 hidden md:flex cursor-pointer">
          <Library size={40} />
          <TypographyH1>Music Theory App</TypographyH1>
        </div>
        <div onClick={() => navigate('/')} className="items-center gap-1 flex md:hidden">
          <Library size={28} />
          <TypographyH3>Music Theory App</TypographyH3>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        <Button variant="outline" className="hidden md:inline-flex" onClick={navigateToGitHub}>
          <Code />
          Check out in GitHub
        </Button>
      </div>
    </div>
  );
};
