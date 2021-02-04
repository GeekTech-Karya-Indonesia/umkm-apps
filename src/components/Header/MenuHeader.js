import React from 'react';
import { TouchableOpacity, Image, View, Card } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from 'react-native-elements';
export default class MenuImage extends React.Component {
  render() {
    return (
      <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => params.handleSearch(text)}
          //onClear={() => params.handleSearch('')}
          placeholder="Search"
          value={this.props.data}
        />
    );
  }
}

MenuImage.propTypes = {
  onPress: PropTypes.func
};
