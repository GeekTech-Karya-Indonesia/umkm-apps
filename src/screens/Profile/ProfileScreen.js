import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

// import {Heading} from '../components/auth/Heading';
// import {Input} from '../components/auth/Input';
// import {FilledButton} from '../components/auth/FilledButton';
// import {TextButton} from '../components/auth/TextButton';
// import {Error} from '../components/auth/Error';
// import {AuthContainer} from '../components/auth/AuthContainer';
import {AuthContext} from '../../contexts/AuthContext';
// import {Loading} from '../components/auth/Loading';
import { Container, Header, Content, Item, Input, Icon, Card, CardItem, Text, Right, Toast  } from 'native-base';

 function LoginScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('usertesting@gas.com');
  const [password, setPassword] = React.useState('Sejati123');
  const [isEmail, setIsEmail] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const onChangeEmailAnimated = (e) => {
    setEmail(e)
    if (validateEmail(e)) {
      setIsEmail(true)
    } else {
      setIsEmail(false)
    }
  }

  const onChangePasswordAnimated = (e) => {
    setPassword(e)
    if (e.length > 0) {
      setIsPassword(true)
    } else {
      setIsPassword(false)
    }
  }
  return (
    <View style={styles.container}>
      <Content >
      <Text>LOGIN</Text>
      <Text>ERROR</Text>
        <Item style={styles.input} rounded={true} success={isEmail}>
          <Input placeholder='Username or Email' keyboardType="email-address" value={email} onChangeText={onChangeEmailAnimated} />
          {
            isEmail && <Icon name='checkmark-circle' />
          }
          
        </Item>
        <Item style={styles.input} rounded={true} success={isPassword}>
          <Input placeholder='Password' secureTextEntry={true} onChangeText={onChangePasswordAnimated} value={password}/>
          {
            isPassword && <Icon name='checkmark-circle' />
          }
        </Item>
        {/* <Input
          style={styles.input}
          placeholder={'Email'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          style={styles.input}
          placeholder={'Password'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        /> */}
        <TouchableOpacity onPress={async () => {
            try {
              setLoading(true);
              await login(email, password);
            } catch (e) {
              const message = e.response.status === 400 ? "Wrong Password or Email" : "Something Wrong"
              setError(message);
              Toast.show({
                text: message,
                textStyle: { color: "red" },
                buttonText: "Close",
                buttonTextStyle: { color: "#fff" },
               })
               setLoading(false);
            }
          }}>
          <Text>login</Text>
        </TouchableOpacity>
        {/* <TextButton
          title={'Daftar'}
          onPress={() => {
            navigation.navigate('Registration');
          }}
        /> */}
      </Content>
      {/* <Loading loading={loading} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  title: {
    marginBottom: 48,
    textAlign: 'center',
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});

export default LoginScreen