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
    }
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Badge
          status="success"
          value="15 Menit"
          containerStyle={{ position: 'absolute', top: 0, right: -10 }}
        />
        <Badge
          status="warning"
          value="25 Km"
          containerStyle={{ position: 'absolute', top: 20, right: -10 }}
        /> 
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.textIcon}>{getCategoryName(item.categoryId)}</Text> */}
        <Text style={styles.textIcon}><MaterialCommunityIcons name="cash-multiple" size={12} color="green" /> Rp250.000 </Text>
              {/* <Text style={styles.textIcon}><AntDesign name="car" size={12} color="#6a0dad" /> 10 Menit </Text> */}
      </View>
    </TouchableHighlight>
  );

  renderMain = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
        <Text style={styles.textIcon}><MaterialCommunityIcons name="cash-multiple" size={12} color="green" /> Rp250.000 </Text>
    </TouchableHighlight>
  );

  render() {
    const { search } = this.state;
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
            data={recipes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item.recipeId}`}
            renderItem={this.renderMain}
            contentContainerStyle={{ paddingVertical: 10 * 2 }}
          />
        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}

