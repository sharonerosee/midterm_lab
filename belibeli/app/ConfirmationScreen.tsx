import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { transactionType, number, nominal, harga } = route.params;

  const getOperator = (number) => {
    const prefix = number.substring(0, 3);
    switch (prefix) {
      case '081':
      case '082':
      case '085':
        return 'Telkomsel';
      case '083':
        return 'Axis';
      case '089':
        return 'Tri';
      default:
        return 'Operator Tidak Dikenal';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Konfirmasi Pembayaran</Text>
      <Text style={styles.label}>Jenis Transaksi: {transactionType}</Text>
      <Text style={styles.label}>Nomor: {number}</Text>
      {transactionType === 'Pulsa' && (
        <Text style={styles.label}>Operator: {getOperator(number)}</Text>
      )}
      <Text style={styles.label}>Nominal: Rp{nominal.toLocaleString()}</Text>
      <Text style={styles.label}>Total Bayar: Rp{harga.toLocaleString()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Pembayaran diproses')}
      >
        <Text style={styles.buttonText}>Bayar Sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
