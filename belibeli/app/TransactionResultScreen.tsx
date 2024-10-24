import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addTransaction } from './actions'; // Aksi untuk menambah transaksi

const TransactionResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch(); // Mengakses dispatch dari Redux

  const { success, remainingBalance, amount } = route.params;

  // Data transaksi yang akan dikirim ke riwayat
  const transaction = {
    id: new Date().getTime().toString(), // Menghasilkan ID unik
    status: success ? 'success' : 'failed',
    amount: amount,
    remainingBalance: remainingBalance,
    date: new Date().toLocaleDateString(), // Tanggal saat ini
  };

  const handleGoBack = () => {
    // Dispatch aksi untuk menambahkan transaksi ke Redux
    dispatch(addTransaction(transaction));
    
    // Navigasi ke halaman riwayat
    navigation.navigate('Riwayat');
  };

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
        onPress={handleGoBack}
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
