import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Riwayat = () => {
  const navigation = useNavigation();

  // Contoh data transaksi untuk riwayat
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      status: 'success',
      amount: 6500,
      remainingBalance: 993500,
      date: '2024-10-25',
    },
    {
      id: '2',
      status: 'failed',
      amount: 6500,
      remainingBalance: 1000000,
      date: '2024-10-24',
    },
  ]);

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => navigation.navigate('DetailTransaksi', { transaction: item })}
    >
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionAmount}>Rp {item.amount.toLocaleString()}</Text>
      </View>
      <Text
        style={[
          styles.transactionStatus,
          item.status === 'success' ? styles.successStatus : styles.failedStatus,
        ]}
      >
        {item.status === 'success' ? 'Berhasil' : 'Gagal'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.noTransactionContainer}>
          <Text style={styles.noTransactionText}>Belum ada transaksi yang terjadi.</Text>
          {/* Anda bisa menambahkan ilustrasi atau gambar di sini */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  transactionItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  transactionInfo: {
    flexDirection: 'column',
  },
  transactionDate: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  successStatus: {
    color: 'green',
  },
  failedStatus: {
    color: 'red',
  },
  noTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTransactionText: {
    fontSize: 18,
    color: '#888',
  },
});

export default Riwayat;
