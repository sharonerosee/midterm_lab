import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PinInputScreen = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showRedDots, setShowRedDots] = useState(false);

  const maxAttempts = 3;
  const birthDatePin = '221104'; // PIN yang dianggap salah
  const transactionAmount = 6500;
  const initialBalance = 1000000;
  const navigation = useNavigation();

  const handlePinChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
      setError(false);
      setShowRedDots(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Menghilangkan teks header
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
      // Jika PIN adalah birthDatePin, maka dianggap salah
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
      // Jika PIN bukan birthDatePin, maka dianggap benar
      const remainingBalance = initialBalance - transactionAmount;
      navigation.navigate('TransactionResultScreen', {
        success: true,
        amount: transactionAmount,
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
    <View style={styles.container}>
      <Text style={styles.header}>Masukkan PIN Anda</Text>
      <Text style={styles.subHeader}>
        {error ? 'PIN salah. Silahkan coba lagi.' : 'Masukkan PIN aplikasi Anda.'}
      </Text>

      <View style={styles.pinContainer}>{renderPinDots()}</View>

      <TextInput
        style={styles.input}
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
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
    borderBottomColor: '#007AFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PinInputScreen;
