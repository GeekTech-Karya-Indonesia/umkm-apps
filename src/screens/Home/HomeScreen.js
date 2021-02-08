import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import MenuHeader from '../../components/Header/MenuHeader';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { AntDesign } from '@expo/vector-icons';
import { ListItem, SearchBar, Header } from 'react-native-elements';
const { width, height } = Dimensions.get("window");
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
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
        <Text style={styles.textIcon}><AntDesign name="car" size={12} color="#6a0dad" /> 10 Menit </Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
          containerStyle={{
            marginTop: 30,
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
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    );
  }
}

