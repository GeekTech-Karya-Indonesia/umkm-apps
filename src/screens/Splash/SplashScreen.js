import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  AsyncImageAnimated,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import LottieView from 'lottie-react-native';
export default class PermissionScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.photo} source={require('../../../assets/icons/cookie100.png')} />
        <Text>Versi 1.0.0</Text>
      </View>
    );
  }
}
