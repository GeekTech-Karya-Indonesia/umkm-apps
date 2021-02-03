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
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const { width: viewportWidth } = Dimensions.get('window');
import { AntDesign, Entypo } from '@expo/vector-icons';
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
      active: true
    };
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

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = 37.771707;
    const LONGITUDE = -122.4053769;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const origin = {latitude: 37.3318456, longitude: -122.0296002};
    const destination = {latitude: 37.771707, longitude: -122.4053769};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyD5TRGCHCxtP4IiRCE1lkM3-N22cIzIYl4';
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
                  <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
                  <Text style={styles.infoRecipe}>{item.time} minutes </Text>
                </Left>
                <Left>
                  <TouchableHighlight onPress={() => navigation.navigate('RecipesList', { category, title })}>
                    <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
                  </TouchableHighlight>
                </Left>
                <Right>
                  <Rating
                    type='heart'
                    ratingCount={5}
                    startingValue={10}
                    imageSize={20}
                    showRating
                    readonly={true}
                  />    
                </Right>
                </CardItem>
                <CardItem>
                  <Text><Entypo name="location-pin" size={24} color="black" />Kec. Margahayu, Bekasi, 1400, Jawa Barat, Komplek A, Nomor 312</Text>
                </CardItem>
                <CardItem>
                  <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
                </CardItem>
            </Card>
          </Content>
        </Container>
        
        <View style={styles.infoRecipeContainer}>  
          <View style={styles.infoContainer}>
             {/* <MapView style={styles.map} /> */}
             <MapView style={styles.map} initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
              />
            </MapView>
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
