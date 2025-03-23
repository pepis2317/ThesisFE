import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import AuthProvider, { useAuth } from './app/context/AuthContext';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Home from './app/screens/Home';
import Profile from './app/screens/Profile';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import ThemeProvider, { useTheme } from './app/context/ThemeContext';
import { useEffect } from 'react';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

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
  const { authState } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#222831'
    },
  };
  const navigationTheme = theme === "dark" ? customDarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          </>

        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>

        )}
      </Stack.Navigator>
      <Button onPress={toggleTheme} title="Change theme" />
    </NavigationContainer>
  )
}