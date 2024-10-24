import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TransactionResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { success, remainingBalance, amount } = route.params;

  return (
    <View style={styles.container}>
      {success ? (
        <View style={styles.successContainer}>
          <Text style={styles.header}>Transaksi Berhasil!</Text>
          <Text style={styles.message}>Saldo telah terpotong sebesar Rp {amount.toLocaleString()}.</Text>
          <Text style={styles.message}>Sisa saldo: Rp {remainingBalance.toLocaleString()}.</Text>
        </View>
      ) : (
        <View style={styles.failContainer}>
          <Text style={styles.header}>Transaksi Gagal!</Text>
          <Text style={styles.message}>Anda telah salah memasukkan PIN sebanyak 3 kali.</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  failContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TransactionResultScreen;
