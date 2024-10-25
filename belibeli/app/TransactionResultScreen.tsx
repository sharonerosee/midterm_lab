import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from './_layout'; // Import useTheme hook for dark mode
import { LinearGradient } from 'expo-linear-gradient'; // For background gradient

const TransactionResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useTheme(); // Get dark mode state
  
  const { success, remainingBalance, amount } = route.params;

  const handleBackPress = () => {
    navigation.navigate('index'); // Navigate to the index screen on button press
  };

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
        </View>
      ) : (
        <View style={styles.failContainer}>
          <Text style={[styles.header, isDarkMode && styles.textDark]}>Transaksi Gagal!</Text>
          <Text style={[styles.message, isDarkMode && styles.textDark]}>
            Anda telah salah memasukkan PIN sebanyak 3 kali.
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
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  successContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 0, 0.1)', // Light green background for success
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  failContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background for failure
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  textDark: {
    color: '#f9f9f9', // White text for dark mode
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionResultScreen;
