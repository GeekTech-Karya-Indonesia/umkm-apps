import React from 'react';
import {StyleSheet, View, TouchableHighlight } from 'react-native';
import { Separator, Container, Header, Thumbnail, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Avatar } from 'react-native-elements';
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

 function AccountScreen({ navigation }) {
  const onPressAccount = () => console.log('tesss')
  const onPressSettings = () => console.log('testtt')
  return (
    <Container style={styles.container}>
    <Content>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: 'http://i.pravatar.cc/100?id=skater' }} />
        </Left>
        <Body>
          <Text>Account</Text>
          <Text note>Doing what you like will always keep you happy . .</Text>
          <Text style={styles.textIcon}><MaterialCommunityIcons name="crown" size={16} color="orange" /> UMKM Binaan</Text>
          <Text style={styles.textIcon}><Octicons name="verified" size={16} color="purple" /> Terverifikasi</Text>
        </Body>
        <Right>
          <Text><MaterialCommunityIcons name="logout" size={24} color="#9932CC" /></Text>
        </Right>
    </ListItem>
    </Content>
  </Container>
  );
}

export default AccountScreen