import React, { type JSX, type ReactElement } from 'react';
import { GameNav } from '~/components/game/gameNav';

type GameProps = {
  children: ReactElement | JSX.Element | boolean | null | Array<ReactElement | JSX.Element | boolean | null>;
};

export const Game = ({ children }: GameProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <GameNav />
      {children}
    </div>
  );
};
