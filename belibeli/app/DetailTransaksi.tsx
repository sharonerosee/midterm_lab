import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './_layout'; 

const DetailTransaksi = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { transaction } = route.params;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <LinearGradient
      colors={isDarkMode ? ['#2c2c2e', '#5a1f5c'] : ['#f7d1e3', '#fef6e4', '#d4fcf8']}
      style={styles.container}
    >
      <View style={[styles.card, isDarkMode ? styles.cardDark : styles.cardLight]}>
        <Text style={[styles.header, isDarkMode ? styles.textDark : styles.textLight]}>
          Detail Transaksi
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
            Tanggal:
          </Text>
          <Text style={[styles.value, isDarkMode ? styles.textDark : styles.textLight]}>
            {transaction.date}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
            Status:
          </Text>
          <Text
            style={[
              styles.value,
              transaction.status === 'success' ? styles.successStatus : styles.failedStatus,
            ]}
          >
            {transaction.status === 'success' ? 'Berhasil' : 'Gagal'}
          </Text>
        </View>

        {transaction.status === 'success' ? (
          <>
            <View style={styles.row}>
              <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
                Jumlah Transaksi:
              </Text>
              <Text style={[styles.value, isDarkMode ? styles.textDark : styles.textLight]}>
                Rp {transaction.amount.toLocaleString()}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
                Sisa Saldo:
              </Text>
              <Text style={[styles.value, isDarkMode ? styles.textDark : styles.textLight]}>
                Rp {transaction.remainingBalance.toLocaleString()}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.row}>
            <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
              Alasan Gagal:
            </Text>
            <Text style={[styles.value, isDarkMode ? styles.textDark : styles.textLight]}>
              Pin Salah
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  cardLight: {
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#333',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
  },
  successStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  failedStatus: {
    color: 'red',
    fontWeight: 'bold',
  },
  textLight: {
    color: '#1e1e1e',
  },
  textDark: {
    color: '#f5f5f5',
  },
});

export default DetailTransaksi;
