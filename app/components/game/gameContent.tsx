import type { JSX, ReactElement } from 'react';

type GameContentProps = {
  children: ReactElement | JSX.Element | boolean | null | Array<ReactElement | JSX.Element | boolean | null>;
};

export const GameContent = ({ children }: GameContentProps) => {
  return <div className="grow flex flex-col gap-3 items-center justify-center text-center">{children}</div>;
};
