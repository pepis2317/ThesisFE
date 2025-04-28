import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AuthProvider, { useAuth } from './app/context/AuthContext';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Profile from './app/screens/Profile';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import ThemeProvider, { useTheme } from './app/context/ThemeContext';
import { useEffect } from 'react';
import UserHome from './app/screens/UserHome';
import ProducerHome from './app/screens/ProducerHome';
import { ProducerTabs, UserTabs } from './components/BottomTabNavigator';
import SearchPage from './app/screens/SearchPage';
import ProducerDetails from './app/screens/ProducerDetails';
import Settings from './app/screens/Settings';
import { ProducerResponse } from './types/ProducerResponse';
import { RootStackParamList } from './constants/RootStackParams';



const Stack = createNativeStackNavigator<RootStackParamList>()
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  );
}
export function Layout() {
  const { authState, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const scheme = useColorScheme();

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#222831',
      text: '#ffffff',
    },

  };
  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  }
  const navigationTheme = theme === "dark" ? customDarkTheme : customLightTheme;
  return (
    <NavigationContainer theme={navigationTheme}>
      <View style={theme == "dark" ? { height: 32 } : { height: 32, backgroundColor: 'white' }} />
      <StatusBar style={theme == "dark" ? "light" : "dark"} />
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#222831'
        },
        animation: 'none'
      }}>
        {authState?.authenticated && user ? (

          user.role === "User" ? (
            <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="ProducerTabs" component={ProducerTabs} options={{ headerShown: false }} />
          )

        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>

        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}