import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // Pastikan FontAwesome5 digunakan

import { useTheme } from '../_layout'; // Import useTheme untuk dark mode

const HomeScreen = () => {
  const { isDarkMode } = useTheme(); // Akses status dark mode dari context
  const navigation = useNavigation();

  const navigateToTransaction = (transactionType: string) => {
    navigation.navigate('TransactionScreen', { transactionType });
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.title, isDarkMode ? styles.textDark : styles.textLight]}>
        All-U-Need
      </Text>

      {/* Card Container */}
      <View style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight]}>
        <View style={styles.header}>
          <Text style={[styles.subtitle, isDarkMode ? styles.textDark : styles.textLight]}>
            Sharone Angelica
          </Text>
          <Text style={[styles.year, isDarkMode ? styles.textDark : styles.textLight]}>2022</Text>
        </View>

        {/* Garis Horizontal */}
        <View style={styles.horizontalLine} />

        {/* Transaction Options */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigateToTransaction('Transfer')}
          >
            <MaterialIcons name="arrow-upward" size={24} color={isDarkMode ? '#fff' : '#666'} />
            <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
              Transfer
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalLine} />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigateToTransaction('Tarik Tunai')}
          >
            <MaterialIcons name="arrow-downward" size={24} color={isDarkMode ? '#fff' : '#666'} />
            <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
              Tarik Tunai
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalLine} />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigateToTransaction('More')}
          >
            <MaterialIcons name="more-horiz" size={24} color={isDarkMode ? '#fff' : '#666'} />
            <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
              More
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Buttons */}
      <View style={styles.transactionContainer}>
        <TouchableOpacity
          style={[
            styles.roundButton,
            isDarkMode ? styles.roundButtonDark : styles.roundButtonLight,
          ]}
          onPress={() => navigateToTransaction('Pulsa')}
        >
          <MaterialIcons name="smartphone" size={32} color={isDarkMode ? '#fff' : '#666'} />
          <Text style={[styles.roundButtonText, isDarkMode ? styles.textDark : styles.textLight]}>
            Pulsa/Data
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roundButton,
            isDarkMode ? styles.roundButtonDark : styles.roundButtonLight,
          ]}
          onPress={() => navigateToTransaction('Listrik')}
        >
          <FontAwesome5 name="bolt" size={32} color={isDarkMode ? '#fff' : '#666'} />
          <Text style={[styles.roundButtonText, isDarkMode ? styles.textDark : styles.textLight]}>
            Listrik
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roundButton,
            isDarkMode ? styles.roundButtonDark : styles.roundButtonLight,
          ]}
          onPress={() => navigateToTransaction('BPJS')}
        >
          <FontAwesome5 name="shield-alt" size={32} color={isDarkMode ? '#fff' : '#666'} />
          <Text style={[styles.roundButtonText, isDarkMode ? styles.textDark : styles.textLight]}>
            BPJS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerLight: {
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  title: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  card: {
    width: '95%',
    borderRadius: 15,
    padding: 20,
    marginTop: 100,
    marginBottom: 10,
  },
  cardLight: {
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#444',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    color: '#666',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#e0e0e0',
    height: '120%',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  roundButtonLight: {
    backgroundColor: '#fff',
  },
  roundButtonDark: {
    backgroundColor: '#555',
  },
  roundButtonText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
});

export default HomeScreen;
