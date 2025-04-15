import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {
  ColorSchemeName,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  useColorScheme,
  ViewStyle,
} from 'react-native';

function App(): React.JSX.Element {

// Detectar el tema actual del sistema
const colorScheme: ColorSchemeName = useColorScheme();
const isDarkMode: boolean = colorScheme === 'dark';

// Colores adaptados al tema
const defaultBaseColor: string = isDarkMode ? '#000000' : '#FFFFFF';

// Define status bar color
const barColor: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
const x: StyleProp<ViewStyle> = { backgroundColor: defaultBaseColor, flex: 1};
  return (
    <SafeAreaView style={x}>
      <StatusBar barStyle={barColor} backgroundColor={defaultBaseColor} />
      <AppNavigator />
    </SafeAreaView>
  );
}

export default App;
