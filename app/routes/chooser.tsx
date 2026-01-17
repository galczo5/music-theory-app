import { Code, Library, Moon, Sun } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TypographyH1 } from '~/components/ui/typography';
import { GamesList } from '~/components/chooser/gamesList';
import { GAMES } from '~/config/games';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/themeProvider';

export default function () {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center gap-3">
          <Library size={50} />
          <TypographyH1>Music Theory App</TypographyH1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}>
            <Sun />
            <Moon />
          </Button>
          <Button variant="outline">
            <Code />
            Check out in GitHub
          </Button>
        </div>
      </div>
      <Tabs defaultValue="games">
        <TabsList>
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="stats">Your progress</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="games">
          <GamesList games={GAMES} />
        </TabsContent>
        <TabsContent value="settigns"></TabsContent>
      </Tabs>
    </div>
  );
}
