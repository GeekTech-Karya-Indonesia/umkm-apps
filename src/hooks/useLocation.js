import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { createAction } from '../utils/createAction';
import { sleep } from '../utils/sleep';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_LOCATION':
          return {
            ...state,
            coord: {...action.payload},
          };
        case 'REMOVE_LOCATION':
          return {
            ...state,
            coord: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      coord: undefined,
      loading: true,
    },
  );
  const coord = React.useMemo(
    () => ({
      login: async (latitude, longitude) => {   
        const coord = {
          latitude, longitude
        };
        await SecureStore.setItemAsync('location', JSON.stringify(coord));
        dispatch(createAction('SET_LOCATION', coord));
      },
    }),
    [],
  );

  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStore.getItemAsync('location').then(coord => {
        if (coord) {
          dispatch(createAction('SET_LOCATION', JSON.parse(coord)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);
  return {coord, state};
}
