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
  Alert,
} from 'react-native';
import styles from './styles';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import LottieView from 'lottie-react-native'
import { Button } from 'galio-framework';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      status: null
    }
  }

  onNavigatePush = () => {
    const { navigation } = this.props
    return navigation.navigate('MainTab')
  }

  async getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({})
            .then(({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude },this.onNavigatePush))
            .catch(err => err)
    } else {
      throw new Error('Location permission not granted');
    }
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  async componentDidMount() {
    this.getLocationAsync()
    this.animation.play()
  }

  onPermissionStatus = () => {
    const { status } = this.state
    if (status){
      return navigation.navigate('MainTab')
    } else {
      return Alert.alert(
        "Aktifkan Lokasi Anda",
        "Lokasi perangkat bertujuan melakukan sortir terhadap produk terdekat!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.getLocationAsync() }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: 'transparent',
            }}
            source={require('../../../assets/animated_2.json')}
          />
        <Text>UMKM Kota Bekasi</Text>
        <Text>Versi 1.0.0</Text>
        <View style={styles.btnSubmit}>
            <Button onPress={this.onPermissionStatus}>MASUK</Button>
        </View>
      </View>
    );
  }
}
