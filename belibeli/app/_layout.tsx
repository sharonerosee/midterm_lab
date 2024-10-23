import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, createContext, useContext } from 'react';
import 'react-native-reanimated';

// Membuat Context untuk tema dan bahasa
const ThemeContext = createContext();
const LanguageContext = createContext(); 
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State untuk dark mode
  const [language, setLanguage] = useState('EN'); // Tambahkan state untuk bahasa
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <LanguageContext.Provider value={{ language, setLanguage }}> 
        {/* Tambahkan provider bahasa */}
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

// Custom hooks untuk tema dan bahasa
export const useTheme = () => useContext(ThemeContext);
export const useLanguage = () => useContext(LanguageContext);
