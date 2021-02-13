import React, { useState } from 'react';
import {StyleSheet, View, TouchableHighlight } from 'react-native';
import { Separator, Container, Header, Thumbnail, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Avatar, SearchBar } from 'react-native-elements';
import { AntDesign, Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
 function WhishScreen({ navigation }) {
  const [search, setSearch] = useState('')
  const onPressAccount = () => navigation.navigate('Account');
  const onPressSettings = () => navigation.navigate('Setting');
  const updateSearch = () => console.log('ssss')
  return (
  <Container style={styles.container}>
    <View style={styles.containerSearchBar}>
      <SearchBar
        containerStyle={{
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
        onChangeText={updateSearch}
        value={search}
    />
    </View>
    <Container style={styles.containerItem}>
    <Content>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: 'http://i.pravatar.cc/100' }} />
        </Left>
        <Body>
          <Text>Nama Produk</Text>
          <Text note>Here Deskripsi of Product . .</Text>
          <Text style={styles.textIcon}><Entypo name="location" size={16} color="#9932CC" /> Bekasi Kota, Jalan Alap-alap</Text>
          <Text style={styles.textIcon}><MaterialCommunityIcons name="cash-multiple" size={16} color="green" /> Rp250.000</Text>
        </Body>
        <Right>
          <Text><AntDesign name="heart" size={24} color="red" /></Text>
        </Right>
      </ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: 'http://i.pravatar.cc/100' }} />
        </Left>
        <Body>
          <Text>Nama Produk</Text>
          <Text note>Here Deskripsi of Product . .</Text>
          <Text style={styles.textIcon}><Entypo name="location" size={16} color="#9932CC" /> Bekasi Kota, Jalan Alap-alap</Text>
          <Text style={styles.textIcon}><MaterialCommunityIcons name="cash-multiple" size={16} color="green" /> Rp250.000</Text>
        </Body>
        <Right>
          <Text><AntDesign name="heart" size={24} color="red" /></Text>
        </Right>
      </ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: 'http://i.pravatar.cc/100' }} />
        </Left>
        <Body>
          <Text>Nama Produk</Text>
          <Text note>Here Deskripsi of Product . .</Text>
          <Text style={styles.textIcon}><Entypo name="location" size={16} color="#9932CC" /> Bekasi Kota, Jalan Alap-alap</Text>
          <Text style={styles.textIcon}><MaterialCommunityIcons name="cash-multiple" size={16} color="green" /> Rp250.000</Text>
        </Body>
        <Right>
          <Text><AntDesign name="heart" size={24} color="red" /></Text>
        </Right>
      </ListItem>
      </Content>
    </Container>
  </Container>
  );
}

export default WhishScreen