import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailTransaksi = () => {
  const route = useRoute();
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detail Transaksi</Text>
      <Text style={styles.label}>Tanggal: </Text>
      <Text style={styles.value}>{transaction.date}</Text>

      <Text style={styles.label}>Jumlah Transaksi: </Text>
      <Text style={styles.value}>Rp {transaction.amount.toLocaleString()}</Text>

      <Text style={styles.label}>Sisa Saldo: </Text>
      <Text style={styles.value}>Rp {transaction.remainingBalance.toLocaleString()}</Text>

      <Text style={styles.label}>Status: </Text>
      <Text
        style={[
          styles.value,
          transaction.status === 'success' ? styles.successStatus : styles.failedStatus,
        ]}
      >
        {transaction.status === 'success' ? 'Berhasil' : 'Gagal'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    marginBottom: 16,
  },
  successStatus: {
    color: 'green',
  },
  failedStatus: {
    color: 'red',
  },
});

export default DetailTransaksi;
