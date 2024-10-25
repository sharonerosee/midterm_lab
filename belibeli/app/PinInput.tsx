import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from './_layout';

const PinInputScreen = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showRedDots, setShowRedDots] = useState(false);

  const { isDarkMode } = useTheme();
  const maxAttempts = 3;
  const birthDatePin = '221104'; 
  const initialBalance = 1000000;
  const navigation = useNavigation();
  const route = useRoute();

  const { harga } = route.params; 

  const handlePinChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
      setError(false);
      setShowRedDots(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });

    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      if (pin.length === 6) {
        checkPin();
      }
    });

    return () => {
      keyboardListener.remove();
    };
  }, [pin, navigation]);

  const checkPin = () => {
    if (pin === birthDatePin) {
      setError(true);
      setShowRedDots(true);

      setTimeout(() => {
        setPin('');
        setShowRedDots(false);
      }, 1000);

      setAttempts(attempts + 1);

      if (attempts + 1 >= maxAttempts) {
        navigation.navigate('TransactionResultScreen', {
          success: false,
        });
      }
    } else {
      const remainingBalance = initialBalance - harga; 
      navigation.navigate('TransactionResultScreen', {
        success: true,
        amount: harga, 
        remainingBalance: remainingBalance, 
      });
    }
  };

  const renderPinDots = () => {
    const pinLength = pin.length;
    const dots = [];

    for (let i = 0; i < 6; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.pinDot,
            i < pinLength
              ? showRedDots
                ? styles.pinDotError
                : styles.pinDotFilled
              : styles.pinDotEmpty,
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>
        Masukkan PIN Anda
      </Text>
      <Text style={[styles.subHeader, isDarkMode ? styles.darkSubText : styles.lightSubText]}>
        {error ? 'PIN salah. Silahkan coba lagi.' : 'Masukkan PIN aplikasi Anda.'}
      </Text>

      <View style={styles.pinContainer}>{renderPinDots()}</View>

      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        value={pin}
        onChangeText={handlePinChange}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
  },
  darkSubText: {
    color: '#aaa',
  },
  lightSubText: {
    color: '#888',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  pinDotEmpty: {
    backgroundColor: '#e0e0e0',
  },
  pinDotFilled: {
    backgroundColor: '#007AFF',
  },
  pinDotError: {
    backgroundColor: '#FF3B30',
  },
  input: {
    width: '60%',
    borderBottomWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  darkInput: {
    borderBottomColor: '#fff',
    color: '#fff',
  },
  lightInput: {
    borderBottomColor: '#007AFF',
    color: '#000',
  },
});

export default PinInputScreen;
