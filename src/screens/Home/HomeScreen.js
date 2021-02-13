import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Dimensions, Tab, Tabs, Container, Header } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import MenuHeader from '../../components/Header/MenuHeader';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ListItem, SearchBar } from 'react-native-elements';
import { DeckSwiper, Block } from 'galio-framework';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { getSpeed, getDistance, convertDistance, convertSpeed } from 'geolib';
import * as Permissions from 'expo-permissions'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      headerTitle: (
        <MenuHeader data={params} />
      ),
      headerRight: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}/>)
      }
    
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      onClickIndex: 0,
      convertDistance: 0,
    }
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  componentDidMount = async () => {
   const test = getDistance(
    { latitude: -6.2577257, longitude: 107.0049049},
    { latitude: -6.4477257, longitude: 107.0049049 }
  )
  const distance = convertDistance(test, 'km')
    this.setState({
      convertDistance: distance.toFixed()
    })
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    console.log(status, 'THE STATUS')
  }

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)} key={item.item}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Badge
          status="success"
          value={`+${this.state.convertDistance}km`}
          containerStyle={{ position: 'absolute', top: 5, right: -10 }}
        />
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.textIcon}>{getCategoryName(item.categoryId)}</Text> */}
        <Text style={styles.textIcon}><MaterialCommunityIcons name="cash-multiple" size={12} color="green" /> Rp250.000 </Text>
              {/* <Text style={styles.textIcon}><AntDesign name="car" size={12} color="#6a0dad" /> 10 Menit </Text> */}
      </View>
    </TouchableHighlight>
  );

  renderMain = ({ item, index }) => {
    const { label, value, icon, id } = item
    const { onClickIndex } = this.state
    const backgroundColor = index !== onClickIndex ? "transparent" : "#e5c1e5"
    return (
      <TouchableHighlight
        key={id}   
        style = {{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: 40,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      underlayColor = '#ccc'
      onPress = { () => this.setState({ onClickIndex: index }) }>
        <Text style={styles.textIcon}><MaterialCommunityIcons name={icon} size={20} color="#9932CC" /></Text>
      </TouchableHighlight>
    )
  };

  render() {
    const { search } = this.state;
    const categories = [{
      id: 1,
      label: 'All',
      value: 'all',
      icon: 'menu'
    }, {
      id: 2,
      label: 'Makanan',
      value: 'makanan',
      icon: 'food-variant'
    }, {
      id: 122,
      label: 'Anak',
      value: 'anak',
      icon: 'baby-carriage'
    }, {
      id: 14423,
      label: 'Style',
      value: 'style',
      icon: 'tshirt-crew'
    }, {
      id: 15532,
      label: 'Perlengkapan',
      value: 'perlengkapan',
       icon: 'home-variant'
    }, {
      id: 155431,
      label: 'Kendaraan',
      value: 'kendaraan',
       icon: 'car'
    }, {
      id: 11234,
      label: 'Sekolah',
      value: 'sekolah',
       icon: 'school'
    }, {
      id: 186,
      label: 'Olah Raga',
      value: 'olahraga',
       icon: 'soccer'
    }, {
      id: 1523,
      label: 'Lain-lain',
      value: 'lain-lain',
       icon: 'all-inclusive'
    }]
    return (
      <View>
        <SearchBar
          containerStyle={{
            marginTop: 30,
            marginBottom: 0,
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          placeholder="Cari Produk..."
          round
          onChangeText={this.updateSearch}
          value={search}
        />
        <View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item.recipeId}`}
            renderItem={this.renderMain}
            contentContainerStyle={{ paddingVertical: 10,  paddingHorizontal: 10 * 2 }}
          />
        </View>
        <View style={{
          marginBottom: 320
        }}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
        </View>
      </View>
    );
  }
}

