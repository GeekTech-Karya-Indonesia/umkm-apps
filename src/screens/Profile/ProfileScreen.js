import React from 'react';
import {StyleSheet, View, TouchableHighlight } from 'react-native';
import { Separator, Container, Header, Thumbnail, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Avatar } from 'react-native-elements';
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

 function ProfileScreen({ navigation }) {
  const onPressAccount = () => navigation.navigate('Account');
  const onPressSettings = () => navigation.navigate('Setting');
  return (
    <Container style={styles.container}>
    <Content>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: 'http://i.pravatar.cc/100?id=skater' }} />
        </Left>
        <Body>
          <Text>Jhon Doe</Text>
          <Text note>Doing what you like will always keep you happy . .</Text>
          <Text style={styles.textIcon}><MaterialCommunityIcons name="crown" size={16} color="orange" /> UMKM Binaan</Text>
          <Text style={styles.textIcon}><Octicons name="verified" size={16} color="purple" /> Terverifikasi</Text>
        </Body>
        <Right>
          <Text><MaterialCommunityIcons name="logout" size={24} color="#9932CC" /></Text>
        </Right>
    </ListItem>
    <ListItem icon>
      <Left>
        <MaterialCommunityIcons name="account" size={24} color="#9932CC"  onPress={() => onPressAccount()}/>
      </Left>
      <Body>
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => onPressAccount()}>
          <Text>Akun</Text>
        </TouchableHighlight>
      </Body>
      <Right>
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => onPressAccount()}>
          <Icon active name="arrow-forward" />
        </TouchableHighlight>
      </Right>
    </ListItem>
    <ListItem icon>
      <Left>
          <Entypo name="cog" size={24} color="#9932CC"  onPress={() => onPressSettings()}/>
      </Left>
      <Body>
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => onPressSettings()}>
          <Text>Pengaturan</Text>
        </TouchableHighlight>
      </Body>
      <Right>
        <Icon active name="arrow-forward" onPress={() => onPressSettings()}/>
      </Right>
    </ListItem>
    <Separator bordered>
        <Text>Informasi</Text>
    </Separator>
    <ListItem icon>
      <Left>
          <Entypo name="shield" size={24} color="#9932CC" />
      </Left>
      <Body>
        <Text>Kebijakan Privasi</Text>
      </Body>
    </ListItem>
    <ListItem icon>
      <Left>
          <AntDesign name="questioncircleo" size={24} color="#9932CC" />
      </Left>
      <Body>
        <Text>Tentang</Text>
        <Text note>Version 1.0.0</Text>
      </Body>
    </ListItem>
    {/* <Separator bordered>
          <Text>MIDFIELD</Text>
    </Separator>
    <ListItem icon>
      <Left>
        <Button style={{ backgroundColor: "#007AFF" }}>
          <Icon active name="wifi" />
        </Button>
      </Left>
      <Body>
        <Text>Wi-Fi</Text>
      </Body>
      <Right>
        <Text>GeekyAnts</Text>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon active name="bluetooth" />
          </Button>
        </Left>
        <Body>
          <Text>Bluetooth</Text>
        </Body>
        <Right>
          <Text>On</Text>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem> */}
    </Content>
  </Container>
  );
}

export default ProfileScreen