import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import { Container, Header, Content, Card, CardItem, Right, Left, Footer, FooterTab, Button, Icon, Body} from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const { width: viewportWidth } = Dimensions.get('window');
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions'
import polyline from '@mapbox/polyline'
import * as Location from 'expo-location';
const locations = require('./location.json')
const { width, height } = Dimensions.get('screen')

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      active: true,
      latitude: null,
      longitude: null,
      locations: locations
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    console.log('STATUS', status)
    await Location.getCurrentPositionAsync({}).then(({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords))
    const { locations: [ sampleLocation ] } = this.state
    this.setState({
      desLatitude: sampleLocation.coords.latitude,
      desLongitude: sampleLocation.coords.longitude
    }, this.mergeCoords)
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      console.log('IS COORDS', hasStartAndEnd)
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, test) {
    try {
      const lt = -6.4477257;
      const long = 107.0049049;
      const desLoc = `${lt},${long}`
      // const GAPIS = 'AIzaSyDslRfa7R_OkMMM8tpCjxAPHM4P5mmBlqA'
      const GAPIS = 'AIzaSyDslRfa7Rasda_OkMMM8tpCjasdasdsadadxAPHM4P5mmBlqA'
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${GAPIS}`)
      const respJson = await resp.json();
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      const distance = distanceTime.distance.text
      const time = distanceTime.duration.text
      const points = polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, time })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  onMarkerPress = location => () => {
    const { coords: { latitude, longitude } } = location
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  renderMap = () => {
    const { 
      activeSlide, 
      time,
      coords,
      distance,
      latitude,
      longitude,
      destination } = this.state;
    return (<MapView
      showsUserLocation
      style={styles.map} 
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}>
      
      <Marker
        coordinate={{ latitude: -6.4477257, longitude: 107.0049049 }}
        // onPress={this.onMarkerPress(location)}
      />
      <Polyline
        coordinates={coords}
        strokeColor="#6a0dad" // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={6}
      />
    </MapView>)
  }

  render() {
    const { 
      activeSlide, 
      time,
      coords,
      distance,
      latitude,
      longitude,
      destination } = this.state;

    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = -6.2477257;
    const LONGITUDE = 107.0049049;
    const LATITUDE_DELTA = 0.0922;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
        <Container>
          <Content>
            <Card>
              <CardItem cardBody>
                <View style={styles.carousel}>
                  <Carousel
                    ref={c => {
                      this.slider1Ref = c;
                    }}
                    data={item.photosArray}
                    renderItem={this.renderImage}
                    sliderWidth={viewportWidth}
                    itemWidth={viewportWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    firstItem={0}
                    loop={false}
                    autoplay={false}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={index => this.setState({ activeSlide: index })}
                  />
                  
                  <Pagination
                    dotsLength={item.photosArray.length}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor="rgba(255, 255, 255, 0.92)"
                    dotStyle={styles.paginationDot}
                    inactiveDotColor="white"
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this.slider1Ref}
                    tappableDots={!!this.slider1Ref}
                  />
              </View>
              </CardItem>
              <CardItem>
                <Text style={styles.textPrice}>Rp250.000</Text>
                <Right>
                  <Text><AntDesign name="hearto" size={24} color="red" onPress={ ()=> console.log('test') } /></Text>
                </Right>
              </CardItem>
              <CardItem>
                <Text style={styles.textTitle}>{item.title}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Left>
                  <Text style={styles.textIcon}><AntDesign name="clockcircleo" size={24} color="#6a0dad" /> {time}</Text>
                </Left>
                <Left>
                  <Text style={styles.textIcon}><AntDesign name="car" size={24} color="#6a0dad" /> {distance}</Text>
                </Left>
                
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.textIcon}><Entypo name="location-pin" size={24} color="#6a0dad" />Kec. Margahayu, Bekasi, 1400, Jawa Barat, Komplek A, Nomor 312</Text>
                  </Left>
                </CardItem>
                <CardItem>
                  <Left>
                    <TouchableHighlight onPress={() => navigation.navigate('RecipesList', { category, title })}>
                      <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
                    </TouchableHighlight>
                  </Left>
                  <Body>
                    <Rating
                      type='heart'
                      ratingCount={5}
                      startingValue={10}
                      imageSize={20}
                      showRating
                      readonly={true}
                    />    
                  </Body>
                  <Right>
                    <Text style={styles.textIconSmall}><MaterialCommunityIcons name="crown" size={16} color="orange" /> UMKM Binaan</Text>
                    <Text style={styles.textIconSmall}><Octicons name="verified" size={16} color="purple" /> Telah diverifikasi</Text>
                    <Text style={styles.textIconSmall}><Octicons name="unverified" size={16} color="black" /> Belum diverifikasi</Text>
                  </Right>
                </CardItem>
                <CardItem>
                  <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
                </CardItem>
            </Card>
          </Content>
        </Container>
       
        <View style={styles.infoRecipeContainer}>  
          <View style={styles.infoContainer}>
          {
            (latitude && coords) && this.renderMap()
          }
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>  
          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = 'Ingredients for ' + item.title;
                navigation.navigate('IngredientsDetails', { ingredients, title });
              }}
            />
          </View>
        </View>
      </View>
     </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
