import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';

export default class MenuButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor="rgba(128, 128, 128, 0.1)"
      > 
        <Text style={styles.btnText}><AntDesign name={this.props.source} size={16} color="purple" onPress={ ()=> console.log('test') } /> {this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
