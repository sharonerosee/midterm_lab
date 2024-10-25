import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from './_layout';
import { LinearGradient } from 'expo-linear-gradient';
import { useTransaction } from './TransactionContext';

const TransactionResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useTheme();
  const { addTransaction } = useTransaction();
  const { success, remainingBalance, amount } = route.params;
  const [currentDateTime, setCurrentDateTime] = useState('');
  const transactionAdded = useRef(false); 

  const handleBackPress = () => {
    navigation.navigate('riwayat');
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentTime = getCurrentDateTime();
    setCurrentDateTime(currentTime); 

    navigation.setOptions({ headerTitle: '' });
  }, [navigation]);

  useEffect(() => {
    if (currentDateTime && !transactionAdded.current) {
      addTransaction({
        id: Date.now().toString(),
        status: success ? 'success' : 'failed',
        amount: success ? amount : 0,
        remainingBalance: success ? remainingBalance : null,
        date: currentDateTime,
      });
      transactionAdded.current = true; 
    }
  }, [currentDateTime, success]);

  return (
    <LinearGradient
      colors={isDarkMode ? ['#232526', '#414345'] : ['#FFEFBA', '#FFFFFF']}
      style={styles.container}
    >
      {success ? (
        <View style={styles.successContainer}>
          <Text style={[styles.header, isDarkMode && styles.textDark]}>Transaksi Berhasil!</Text>
          <Text style={[styles.message, isDarkMode && styles.textDark]}>
            Saldo telah terpotong sebesar Rp {amount.toLocaleString()}.
          </Text>
          <Text style={[styles.message, isDarkMode && styles.textDark]}>
            Sisa saldo: Rp {remainingBalance.toLocaleString()}.
          </Text>
          <Text style={[styles.message, isDarkMode && styles.textDark]}>
            Waktu Transaksi: {currentDateTime}
          </Text>
        </View>
      ) : (
        <View style={styles.failContainer}>
          <Text style={[styles.header, isDarkMode && styles.textDark]}>Transaksi Gagal!</Text>
          <Text style={[styles.message, isDarkMode && styles.textDark]}>
            Anda telah salah memasukkan PIN sebanyak 3 kali.
          </Text>
          <Text style={[styles.message, isDarkMode && styles.textDark]}>
            Waktu Percobaan: {currentDateTime}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleBackPress}>
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  failContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  textDark: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionResultScreen;
