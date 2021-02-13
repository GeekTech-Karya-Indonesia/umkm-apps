import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  AsyncImageAnimated,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigation.navigate('MainTab')}>
        <Text>Versi 1.0.0</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
