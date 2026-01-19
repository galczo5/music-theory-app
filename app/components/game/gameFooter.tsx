import type { JSX, ReactElement } from 'react';

type GameFooterProps = {
  children: ReactElement | JSX.Element | boolean | null | Array<ReactElement | JSX.Element | boolean | null>;
};

export const GameFooter = ({ children }: GameFooterProps) => {
  return <div className="flex flex-col items-center justify-center p-6">{children}</div>;
};
