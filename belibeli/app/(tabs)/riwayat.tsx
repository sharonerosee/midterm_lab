import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../_layout';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient untuk gradasi

const Riwayat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useTheme();

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

  useEffect(() => {
    if (route.params?.newTransaction) {
      const newTransaction = route.params.newTransaction;
      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    }
  }, [route.params?.newTransaction]);

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.transactionItem,
        isDarkMode ? styles.transactionItemDark : styles.transactionItemLight,
      ]}
      onPress={() => navigation.navigate('DetailTransaksi', { transaction: item })}
    >
      <LinearGradient
        colors={isDarkMode ? ['#444', '#555'] : ['#f0f0f0', '#fafafa']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <View style={styles.transactionInfo}>
          <Text style={[styles.transactionDate, isDarkMode ? styles.textDark : styles.textLight]}>
            {item.date}
          </Text>
          <Text style={[styles.transactionAmount, isDarkMode ? styles.textDark : styles.textLight]}>
            Rp {item.amount.toLocaleString()}
          </Text>
        </View>
        <Text
          style={[
            styles.transactionStatus,
            item.status === 'success' ? styles.successStatus : styles.failedStatus,
          ]}
        >
          {item.status === 'success' ? 'Berhasil' : 'Gagal'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#121212', '#1e1e1e'] : ['#f5f7fa', '#c3cfe2']}
      style={styles.container}
    >
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.promoList}
        />
      ) : (
        <View style={styles.noTransactionContainer}>
          <Text style={[styles.noTransactionText, isDarkMode ? styles.textDark : styles.textLight]}>
            Belum ada transaksi yang terjadi.
          </Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60, // Menambahkan jarak lebih ke bawah
  },
  promoList: {
    paddingBottom: 30,
  },
  transactionItem: {
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionItemLight: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  transactionItemDark: {
    backgroundColor: '#444',
    borderColor: '#555',
  },
  transactionInfo: {
    flexDirection: 'column',
  },
  transactionDate: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#333',
  },
  textDark: {
    color: '#fff',
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
  },
});

export default Riwayat;
