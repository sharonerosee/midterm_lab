import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigationState } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const state = useNavigationState((state) => state);
  const isProfileFocused = state?.routes[state.index]?.name === 'profil';

  const iconColor = '#FCAEBB'; 
  const backgroundColor = '#000000'; 

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: iconColor,
        tabBarInactiveTintColor: '#888', 
        headerShown: false,

        tabBarStyle: isProfileFocused
          ? { display: 'none' }
          : {
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              elevation: 4, 
              backgroundColor: backgroundColor, 
              borderRadius: 20,
              height: 70,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              borderWidth: 1,
              borderColor: '#333', 
            },
        
        tabBarLabelStyle: {
          marginTop: -4, 
          fontSize: 12,  
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'riwayat') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'bayar') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'notifikasi') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size ? size : 28} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
        }}
      />
      <Tabs.Screen
        name="riwayat"
        options={{
          title: 'Riwayat',
        }}
      />
      <Tabs.Screen
        name="bayar"
        options={{
          title: 'Bayar',
        }}
      />
      <Tabs.Screen
        name="notifikasi"
        options={{
          title: 'Notifikasi',
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarStyle: { display: 'none' }, 
        }}
      />
    </Tabs>
  );
}
