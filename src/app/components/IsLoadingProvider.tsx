'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface IsLoadingContextInterface {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const IsLoadingContext = createContext<IsLoadingContextInterface>({
  isLoading: false,
  // eslint-disable-next-line prettier/prettier
  setIsLoading: () => { },
});

export default function IsLoadingProvider({
  children,
  isLoading: _isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) {
  const [isLoading, setIsLoading] = useState(_isLoading);

  return (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  );
}
