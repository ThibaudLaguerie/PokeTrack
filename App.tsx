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
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, DrawerActions, DrawerNavigationState, ParamListBase } from '@react-navigation/routers';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { FirestoreContextProvider } from './src/contexts/FirestoreContext';
import HeaderDrawerComponent from './src/components/HeaderDrawerComponent';
import DrawerItemCustom from './src/components/DrawerItemCustom';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import styles from './src/styles';
import { COLORS } from './src/utils/constants';




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
    return (
      <DrawerContentScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }} {...state} {...descriptors} {...navigation}>
        <View>
          <HeaderDrawerComponent handleDrawer={() => navigation.toggleDrawer()} />
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
        </View>
        <View style={{ backgroundColor: COLORS.black, borderTopColor: COLORS.white, borderTopWidth: 3 }}>
          <DrawerItemCustom title={"Déconnexion"} onPress={async () => {
            await AsyncStorage.multiRemove(['MoneyTrackToken', 'MoneyTrackUserUID', 'MoneyTrackFirstname', 'MoneyTrackLastname'])
            navigation.navigate('Login')
          }} />
        </View>
      </DrawerContentScrollView>
    )
  }
  const DrawerStack = createDrawerNavigator();
  const MyDrawerStack = (props: any) => {
    return (
      <DrawerStack.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{ drawerStyle: styles.drawer }}
      >
        <DrawerStack.Screen name="Home" component={HomeScreen}
          options={{ drawerLabel: "Accueil" }} initialParams={{ token: token }}
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

  return (
    <AuthContextProvider>
      <FirestoreContextProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar />
            <MyAppStack />
          </SafeAreaView>
        </NavigationContainer>
      </FirestoreContextProvider>
    </AuthContextProvider>
  );
};

export default App;
