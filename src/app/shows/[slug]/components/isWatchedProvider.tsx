'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface IsWatchedContextInterface {
  isWatched: boolean;
  setIsWatched: Dispatch<SetStateAction<boolean>>;
}

export const IsWatchedContext = createContext<IsWatchedContextInterface>({
  isWatched: false,
  // eslint-disable-next-line prettier/prettier
  setIsWatched: () => { },
});

export default function IsWatchedProvider({
  children,
  isWatched: _isWatched,
}: {
  children: ReactNode;
  isWatched: boolean;
}) {
  const [isWatched, setIsWatched] = useState(_isWatched);

  return (
    <IsWatchedContext.Provider value={{ isWatched, setIsWatched }}>
      {children}
    </IsWatchedContext.Provider>
  );
}
