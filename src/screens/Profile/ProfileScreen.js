import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Separator, Container, Header, Thumbnail, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import { Avatar } from 'react-native-elements';

 function ProfileScreen({ navigation }) {

  return (
    <Container style={styles.container}>
    <Content>
    <ListItem avatar>
    <Left>
      <Thumbnail source={{ uri: 'http://i.pravatar.cc/100?id=skater' }} />
    </Left>
    <Body>
      <Text>Kumar Pratik</Text>
      <Text note>Doing what you like will always keep you happy . .</Text>
    </Body>
    <Right>
      <Text note>3:43 pm</Text>
    </Right>
  </ListItem>
      <Separator bordered>
            <Text>MIDFIELD</Text>
      </Separator>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="airplane" />
          </Button>
        </Left>
        <Body>
          <Text>Airplane Mode</Text>
        </Body>
        <Right>
          <Switch value={false} />
        </Right>
      </ListItem>
      <Separator bordered>
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
      </ListItem>
      <Separator bordered>
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
      </ListItem>
      <Separator bordered>
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
      </ListItem>
      <Separator bordered>
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
      </ListItem>
      <Separator bordered>
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
      </ListItem>
      <Separator bordered>
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
      </ListItem>
    </Content>
  </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  }
});

export default ProfileScreen