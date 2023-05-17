import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from "./store"
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import Login from './screens/startScreens/Login';
import Registration from './screens/startScreens/Registration';
import { useState, useEffect } from "react"
import { firebase } from "./config";
import Profile from './screens/Profile';

const Stack=createNativeStackNavigator();
//
function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  
  if (!user) {
    return (
      <TailwindProvider>
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
            name="Registration"
            component={Registration}
            />
            
        </Stack.Navigator>
        </TailwindProvider>
      );
  }

  return (
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
            <Stack.Screen name="Profile" component={Profile} options={{
                presentation:'modal',headerShown: false
              }}/>
            <Stack.Screen name="Basket" component={BasketScreen}
              options={{
                presentation:'modal',headerShown: false
              }}
            />
            <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen}
            options={{presentation:'fullScreenModal',headerShown:false}}/>
            <Stack.Screen name="Delivery" component={DeliveryScreen}
              options={{
                presentation:'fullScreenModal',headerShown: false
              }}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
  );
}


export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

// lai 
