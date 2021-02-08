import * as React from 'react';
// import { createAppContainer } from 'react-navigation';
// import {createDrawerNavigator} from 'react-navigation-drawer'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack'
/* import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' */
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import TabComponent from '../components/Tab/Tab';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Entypo  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/*
function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  )
} */

// const MainNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Categories: CategoriesScreen,
//     Recipe: RecipeScreen,
//     RecipesList: RecipesListScreen,
//     Ingredient: IngredientScreen,
//     Search: SearchScreen,
//     IngredientsDetails: IngredientsDetailsScreen
//   },
//   {
//     initialRouteName: 'Home',
//     // headerMode: 'float',
//     defaulfNavigationOptions: ({ navigation }) => ({
//       headerTitleStyle: {
//         fontWeight: 'bold',
//         textAlign: 'center',
//         alignSelf: 'center',
//         flex: 1,
//       }
//     })
//   }
// ); 

/* const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      drawerContent={props=> DrawerContainer}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} */



function HomeStack() {
  return (
    <Stack.Navigator  
      screenOptions={{
      headerShown: false
    }} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
            tabBarButton: (props) => <TabComponent label="home" text="Beranda" {...props} />
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
            tabBarButton: (props) => <TabComponent label="cube" text="Kategori" {...props} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            tabBarButton: (props) => <TabComponent label="account" text="Akun" {...props} />
        }}
      />
    </Tab.Navigator>
  );
}
// const DrawerStack = createDrawerNavigator(
//   {
//     Main: MainNavigator
//   },
//   {
//     drawerPosition: 'left',
//     initialRouteName: 'Main',
//     drawerWidth: 250,
//     contentComponent: DrawerContainer
//   }
// );

 export default function AppContainer() {
  return(
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  )
} 
 
// export default AppContainer = createAppContainer(DrawerStack);
// export default AppContainer = createAppContainer(BottomTabs);

console.disableYellowBox = true;