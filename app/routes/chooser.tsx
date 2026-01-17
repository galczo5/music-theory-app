import { Button } from '~/components/ui/button';
import { ArrowRight, Library, Music2 } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '~/components/ui/item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TypographyH1 } from '~/components/ui/typography';

export default function () {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center p-6 gap-3">
          <Library size={50} />
          <TypographyH1>Music Theory App</TypographyH1>
        </div>
        <Tabs defaultValue="games">
          <TabsList>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="stats">Your progress</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="games"></TabsContent>
          <TabsContent value="settigns"></TabsContent>
        </Tabs>
      </div>
      <div className="max-w-1/2 grid grid-cols-2 gap-6 p-6 m-auto">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Music2 />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Interval names</ItemTitle>
            <ItemDescription>
              Test your knowledge of interval distances by identifying the exact number of semitones for each given
              interval name.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="link">
              Play
              <ArrowRight />
            </Button>
          </ItemActions>
        </Item>
      </div>
    </>
  );
}
