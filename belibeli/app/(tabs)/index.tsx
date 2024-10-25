import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../_layout';

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 25,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const navigateToTransaction = (transactionType: string) => {
    navigation.navigate('TransactionScreen', { transactionType });
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#2c2c2e', '#5a1f5c'] : ['#f7d1e3', '#fef6e4', '#d4fcf8']}
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/images/union.png')} 
        style={[styles.logo, { transform: [{ translateY: floatAnim }] }]} 
        resizeMode="contain"
      />

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
            <MaterialIcons name="arrow-upward" size={28} color={isDarkMode ? '#ffb6c1' : '#ff6b81'} />
            <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
              Transfer
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalLine} />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigateToTransaction('Tarik Tunai')}
          >
            <MaterialIcons name="arrow-downward" size={28} color={isDarkMode ? '#ffb6c1' : '#ff6b81'} />
            <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
              Tarik Tunai
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalLine} />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigateToTransaction('More')}
          >
            <MaterialIcons name="more-horiz" size={28} color={isDarkMode ? '#ffb6c1' : '#ff6b81'} />
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
          <MaterialIcons name="smartphone" size={32} color={isDarkMode ? '#c1c8e4' : '#89b7eb'} />
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
          <FontAwesome5 name="bolt" size={32} color={isDarkMode ? '#c1c8e4' : '#89b7eb'} />
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
          <FontAwesome5 name="shield-alt" size={32} color={isDarkMode ? '#c1c8e4' : '#89b7eb'} />
          <Text style={[styles.roundButtonText, isDarkMode ? styles.textDark : styles.textLight]}>
            BPJS
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140, // Ukuran logo lebih kecil agar proporsional
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 28, // Font yang lebih besar dan bold
    fontWeight: 'bold',
    marginBottom: 30,
    letterSpacing: 1.2,
  },
  card: {
    width: '90%',
    borderRadius: 18,
    padding: 25,
    marginVertical: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardLight: {
    backgroundColor: '#ffffff',
  },
  cardDark: {
    backgroundColor: '#444', 
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20, 
    fontWeight: '600',
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: '#888',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#89b7eb', 
    width: '100%',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#89b7eb', 
    height: '80%',
  },
  iconText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50,
  },
  roundButton: {
    width: 95,
    height: 95,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: 20,
  },
  roundButtonLight: {
    backgroundColor: '#fff5f7', 
  },
  roundButtonDark: {
    backgroundColor: '#5c2a2d', 
  },
  roundButtonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textLight: {
    color: '#000', 
  },
  textDark: {
    color: '#ffcccc', 
  },
});

export default HomeScreen;
