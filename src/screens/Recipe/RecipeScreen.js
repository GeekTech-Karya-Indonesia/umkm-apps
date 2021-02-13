import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import { Container, Content, Card, CardItem, Right, Left, Body, Thumbnail} from 'native-base';
import { Rating } from 'react-native-ratings';
import { Accordion, Block } from 'galio-framework';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion  } from 'react-native-maps';
const { width: viewportWidth } = Dimensions.get('window');
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions'
import polyline from '@mapbox/polyline'
import * as Location from 'expo-location';
const locations = require('./location.json')

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {

    console.log(navigation, 'YESSSSS')
    return {
      headerTitle: null,
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
      time: 'Sedang Menghitung...',
      distance: 'Sedang Menghitung...',
      latitude: null,
      longitude: null,
      locations: locations,
      region: new AnimatedRegion({
        latitude: -6.4477257,
        longitude: 107.0049049,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }),
      description: []
    };
  }

  async componentDidMount() {
    console.log(this.props, 'HERE PROPS')
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    await Location.getCurrentPositionAsync({}).then(({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords))
    const { locations: [ sampleLocation ] } = this.state
    this.setState({
      desLatitude: sampleLocation.coords.latitude,
      desLongitude: sampleLocation.coords.longitude
    }, this.mergeCoords)

    this.descriptionAcordian()
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
      const GAPIS = 'AIzaSyDslRfa7R_OkMMM8tpCjxAPHM4P5mmBlqA'
      // const GAPIS = 'AIzaSyDslRfa7Rasda_OkMMM8tpCjasdasdsadadxAPHM4P5mmBlqA'
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
      coords,
      latitude,
      longitude,
      region
    } = this.state;
    return (<MapView
      provide={PROVIDER_GOOGLE}
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
        strokeWidth={10}
      />
    </MapView>)
  }

  descriptionAcordian = (data) => {
    const { navigation } = this.props;
    const item = navigation.route.params('item');
    this.setState({
      description: [
        { title: "Deskripsi", content: item.description, 
       },
        { 
          title: "Spesifikasi", content: "Berat: 1kg \n Kondisi: Baru \n Pemesanan Min : 1 \n Kategori: Smoothies \n Penjual: Andara",
      }]
    })
  }

  render() {
    const { 
      activeSlide, 
      time,
      coords,
      distance,
      latitude
    } = this.state;
    const { navigation, route } = this.props;
    const { item } = route.params
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category);
    console.log('ITEM', item)
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
                </CardItem>
                <CardItem>
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
                    <Thumbnail source={{uri: "http://i.pravatar.cc/100?id=skater" }} />
                    <Text style={styles.textIconSmall}>
                      UMKM Kota Bekasi
                    </Text>
                  </Left>
                  <Body>
                  </Body>
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
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={styles.textIconSmall}><MaterialCommunityIcons name="crown" size={16} color="orange" /> UMKM Binaan</Text>
                  </Left>
                  <Left>
                    <Text style={styles.textIconSmall}><Octicons name="verified" size={16} color="green" /> Telah diverifikasi</Text>
                 </Left>
                  <Left>
                    <Text style={styles.textIconSmall}><Octicons name="unverified" size={16} color="black" /> Belum diverifikasi</Text>
                 </Left>
                </CardItem>
            </Card>
          </Content>
        </Container>
        <View style={styles.infoRecipeContainer}>  
          <View style={styles.infoContainer}>
              <Text>Lihat Kategori Serupa: </Text>
              <TouchableHighlight onPress={() => navigation.navigate('RecipesList', { category, title })}>
                <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
              </TouchableHighlight>
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>  
          <View style={styles.infoContainer}>
            <Accordion dataArray={this.state.description}
            icon={
              <AntDesign name="plus" size={16} color="purple" />
            } 
            expandedIcon={
              <AntDesign name="minus" size={16} color="purple" />
            }/>
          </View>
        </View>
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
