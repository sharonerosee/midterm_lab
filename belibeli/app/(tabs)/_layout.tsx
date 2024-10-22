import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigationState } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Use the navigation state to check if we're on the "Profil" tab
  const state = useNavigationState((state) => state);
  const isProfileFocused = state?.routes[state.index]?.name === 'profil';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: isProfileFocused ? { display: 'none' } : {}, // Hide tab bar on "Profil" screen
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="riwayat"
        options={{
          title: 'Riwayat',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bayar"
        options={{
          title: 'Bayar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifikasi"
        options={{
          title: 'Notifikasi',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="envelope" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
          // Hide the tab bar when on this screen
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
