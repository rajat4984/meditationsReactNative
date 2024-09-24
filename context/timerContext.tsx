import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface TimeContextType {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

export const TimeContext = createContext<TimeContextType>({
  duration: 10,
  setDuration: () => {},
});

interface TimerProviderProps {
  children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [duration, setDuration] = useState(10);

  return (
    <TimeContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimerProvider;
