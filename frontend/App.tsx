import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from './src/screens/Splash';
import { HomeScreen } from './src/screens/Home';
import { SignInScreen } from './src/screens/SignIn';
import { SignUpScreen } from './src/screens/SignUp';
import { NewRecipeScreen } from './src/screens/AddRecipe';

export type RootParamList = {
  Splash: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  AddRecipe: undefined;

};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: "HomeScreen" }} />
    
        <Stack.Screen name='SignIn' component={SignInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='AddRecipe' component={NewRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
