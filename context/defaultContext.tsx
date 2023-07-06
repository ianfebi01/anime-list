import {
  ActionMapDefaultReducer,
  defaultReducer,
} from "@/reducers/defaultReducer";
import { Actions, DefaultContextType } from "@/types/context/defaultContext";
import { ReactNode, createContext, useContext, useReducer } from "react";

const initialState: DefaultContextType = {
  defaultState: {
    page: "anime-list",
    animeParams: {
      perPage: 10,
      page: 1,
      search: null,
      sort: "POPULARITY_DESC",
    },
    animeList: null,
    animeDetails: null,
  },
};

export const DefaultContext = createContext<{
  state: DefaultContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { defaultState }: DefaultContextType,
  action: Actions<ActionMapDefaultReducer>
) => ({
  defaultState: defaultReducer(defaultState, action),
});

export function useDefault() {
  return useContext(DefaultContext);
}

type Props = {
  children: ReactNode;
};

export function DefaultProvider({ children }: Props) {
  // @ts-ignore
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <>
      <DefaultContext.Provider value={{ state, dispatch }}>
        {children}
      </DefaultContext.Provider>
    </>
  );
}
