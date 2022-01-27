/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps, DrawerContent } from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, DrawerActions, DrawerNavigationState, ParamListBase } from '@react-navigation/routers';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { AuthContextProvider, useAuth } from './src/contexts/AuthContext';
import HeaderDrawerComponent from './src/components/HeaderDrawerComponent';
import DrawerItemCustom from './src/components/DrawerItemCustom';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import styles from './src/styles';
import { COLORS } from './src/utils/constants';
import PokedexScreen from './src/screens/PokedexScreen';
import PokemonDetailsScreen from './src/screens/PokemonDetailsScreen';
import ShopScreen from './src/screens/ShopScreen';
import AccountScreen from './src/screens/AccountScreen';
import { AppContextProvider } from './src/contexts/AppContext';
import CardsScreen from './src/screens/CardsScreen';




const App = () => {

  const [token, setToken] = React.useState<string | null>(null)

  React.useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    const token = await AsyncStorage.getItem('PokeTrackToken')
    setToken(token)
  }

  type PropsDrawer = Omit<DrawerContentComponentProps, 'contentContainerStyle' | 'style'> & {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  };

  const CustomDrawerContent: React.FC<PropsDrawer> = ({ state, descriptors, navigation }) => {

    const auth = useAuth()
    return (
      <>
        <HeaderDrawerComponent handleDrawer={() => navigation.toggleDrawer()} />
        <DrawerContentScrollView contentContainerStyle={{ flexGrow: 1 }} {...state} {...descriptors} {...navigation}>
          {
            state.routes.map((route, i) => {
              const focused = i === state.index
              const { drawerLabel } = descriptors[route.key].options;
              return <DrawerItemCustom key={route.key} focused={focused} title={drawerLabel} onPress={() => {
                navigation.dispatch({
                  ...(focused ? DrawerActions.closeDrawer() : CommonActions.navigate(route.name)),
                  target: state.key
                })
              }} />
            })
          }

        </DrawerContentScrollView>
        <View style={{ backgroundColor: COLORS.black, borderTopColor: COLORS.white, borderTopWidth: 3 }}>
          <DrawerItemCustom title={"Déconnexion"} onPress={async () => {
            await AsyncStorage.multiRemove(['PokeTrackToken', 'PokeTrackUserUID', 'PokeTrackFirstname', 'PokeTrackSolde'])
            auth.signOut()
            navigation.navigate('Login')
          }} />
        </View>
      </>
    )
  }
  const DrawerStack = createDrawerNavigator();
  const MyDrawerStack = (props: any) => {
    return (
      <DrawerStack.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{ drawerStyle: styles.drawer, headerShown: false }}
      >
        <DrawerStack.Screen name="Home" component={MyPokedexStack}
          options={{ drawerLabel: "Pokedex" }}
        />
        <DrawerStack.Screen name="Account" component={AccountScreen}
          options={{ drawerLabel: "Mon compte" }}
        />
        <DrawerStack.Screen name="Cards" component={CardsScreen}
          options={{ drawerLabel: "Mes cartes" }}
        />
        <DrawerStack.Screen name="Market" component={ShopScreen}
          options={{ drawerLabel: "Marketplace" }}
        />
      </DrawerStack.Navigator>
    )
  }

  const AppStack = createNativeStackNavigator();
  const MyAppStack = () => {
    return (
      <AppStack.Navigator initialRouteName={token == "autolog" ? 'App' : 'Login'} screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="Signup" component={SignupScreen} />
        <AppStack.Screen name="App" component={MyDrawerStack} />
      </AppStack.Navigator>
    )
  }

  const PokedexStack = createNativeStackNavigator()
  const MyPokedexStack = () => {
    return (
      <PokedexStack.Navigator initialRouteName="Pokedex" screenOptions={{ headerShown: false }}>
        <PokedexStack.Screen name="Pokedex" component={PokedexScreen} />
        <PokedexStack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
      </PokedexStack.Navigator>
    )
  }

  return (
    <AuthContextProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar />
            <AppContextProvider>
              <MyAppStack />
            </AppContextProvider>
          </SafeAreaView>
        </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
