import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../_layout';
import { LinearGradient } from 'expo-linear-gradient';
import { useTransaction } from '../TransactionContext';

const Riwayat = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { transactions } = useTransaction();

  useEffect(() => {
    console.log('Transactions:', transactions); 
  }, [transactions]);

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
    padding: 20,
  },
  transactionItem: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  transactionItemLight: {
    backgroundColor: '#fff',
  },
  transactionItemDark: {
    backgroundColor: '#333',
  },
  gradient: {
    padding: 15,
    borderRadius: 15,
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDate: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionStatus: {
    marginTop: 10,
    textAlign: 'right',
  },
  successStatus: {
    color: 'green',
  },
  failedStatus: {
    color: 'red',
  },
  textDark: {
    color: '#fff',
  },
  textLight: {
    color: '#000',
  },
  noTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTransactionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Riwayat;
