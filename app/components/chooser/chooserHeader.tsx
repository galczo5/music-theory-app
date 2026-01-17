import { Code, Library, Moon, Sun } from 'lucide-react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/themeProvider';

export const ChooserHeader = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex justify-between items-center pb-6">
      <div className="items-center gap-3 hidden md:flex">
        <Library size={40} />
        <TypographyH1>Music Theory App</TypographyH1>
      </div>
      <div className="items-center gap-1 flex md:hidden">
        <Library size={28} />
        <TypographyH3>Music Theory App</TypographyH3>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        <Button variant="outline" className="hidden md:inline-flex">
          <Code />
          Check out in GitHub
        </Button>
      </div>
    </div>
  );
};
