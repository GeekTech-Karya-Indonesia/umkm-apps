import React from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
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
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {   
        console.log('HIT')
        var qs = require('qs');
        var data = qs.stringify({
        'username': 'mobile',
        'password': 'mobileuser' 
        });
        var config = {
          method: 'post',
          url: 'https://sip3.bekasikota.go.id/v2/public/auth',
          headers: { 
            'X-API-KEY': '1F9789B7F184EA00153036C7DDD1E96B', 
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response), 'TESTSS');
        })
        .catch(function (error) {
          console.log(error, 'TEST');
        });

          
        // const { data } = await axios.post(`${BASE_URL}/auth/local`, {
        //   identifier: email,
        //   password,
        // });
        // const user = {
        //   email: data.user.email,
        //   token: data.jwt,
        // };
        
        // await SecureStore.setItemAsync('user', JSON.stringify(user));
        // dispatch(createAction('SET_USER', user));
      },
      test: async () => {
        console.log('TEST')
        fetch('https://sip3.bekasikota.go.id/v2/public/dashboard', {
            method: 'GET',
            headers: {
              'X-API-KEY': '1F9789B7F184EA00153036C7DDD1E96B', 
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-ACCESS-TOKEN': 'uqe305mqmckmohtifqtrc2gr5v4jart4'
            }
          }) 
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson)
            return responseJson;
          })
          .catch(error => {
            console.error(error);
          });
          console.log('TES DONE')
        // await SecureStore.deleteItemAsync('user');
        // dispatch(createAction('REMOVE_USER'));
      },
      logout: async () => {
        console.log('LOGOUT')
        fetch('https://sip3.bekasikota.go.id/v2/public/auth/sign_out', {
            method: 'GET',
            headers: {
              'X-API-KEY': '1F9789B7F184EA00153036C7DDD1E96B', 
              'Content-Type': 'application/x-www-form-urlencoded', 
              'Cookie': 'aksara_ccPo0YO4LaliS5FA=ounmebkobdcq5o620vea8ca2apjgjt0p'
            }
          }) 
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson)
            return responseJson;
          })
          .catch(error => {
            console.error(error);
          });
          console.log('LOGOUT DONE')
        // await SecureStore.deleteItemAsync('user');
        // dispatch(createAction('REMOVE_USER'));
      },
      register: async (email, password) => {
        await sleep(2000);
        await axios.post(`${BASE_URL}/auth/local/register`, {
          username: email,
          email,
          password,
        });
      },
    }),
    [],
  );

  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStore.getItemAsync('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
      // const user = SecureStore.getItemAsync('user')
      // console.log(user)
      // dispatch(createAction('SET_USER', JSON.parse(user)));
      // dispatch(createAction('SET_LOADING', false));
    });
  }, []);
  return {auth, state};
}
