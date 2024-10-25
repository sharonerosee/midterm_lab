import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from './_layout'; 
import { LinearGradient } from 'expo-linear-gradient'; 

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); 
  const { isDarkMode } = useTheme(); 
  const { transactionType, number, nominal, harga } = route.params;

  const [balance, setBalance] = useState(1000000);

  const getOperator = (transactionType, number) => {
    if (transactionType === 'Listrik') {
      return 'Listrik';
    } else if (transactionType === 'BPJS') {
      return 'BPJS';
    } else {
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
        case '088':
          return 'SmartFren';
        default:
          return 'Operator Tidak Dikenal';
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Konfirmasi Pembayaran',
    });
  }, [navigation]);

  const operator = getOperator(transactionType, number);

  const getOperatorIcon = () => {
    if (transactionType === 'Listrik') {
      return 'https://dataset.jogjakota.go.id/uploads/group/2023-11-09-043411.205898LogoPLN.png'; 
    } else if (transactionType === 'BPJS') {
      return 'https://fahum.umsu.ac.id/blog/wp-content/uploads/2024/07/cara-mendaftar-dan-membayar-tagihan-bpjs-secara-online-2024.jpg';
    } else {
      switch (operator) {
        case 'Telkomsel':
          return 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBAgYhXNZNpyzbQ0QT8JGNu-pGxrdNsyrOM925Ph9tVxixo7LfhU-IQ4EEQDbM0fiBhXtKvgpb_D2hmKYVbluGzTW-sdlfLOJ8cTtyq9S6vltSDWiJpC2r5c_pjy3WylLTQ6eI7UD88zn4ZQBBq6jitdMjtB6gnb0-25WnY3Em3Tw7BQXgOtyPZN0T/s320/GKL1_Telkomsel%20-%20Koleksilogo.com.jpg'; 
        case 'Axis':
          return 'https://isipulsa.web.id/images/produk/paket_internet/axis.png';
        case 'Tri':
          return 'https://upload.wikimedia.org/wikipedia/id/thumb/6/68/3-brand.svg/1200px-3-brand.svg.png'; 
        case 'SmartFren':
          return 'https://storage.googleapis.com/ekrutassets/blogs/images/000/005/202/original/Smartfren-Logo.wine.png'; 
        default:
          return 'https://img.icons8.com/ios-filled/50/000000/question-mark.png';
      }
    }
  };

  const getWalletIcon = () => {
    return isDarkMode
      ? 'https://img.icons8.com/ios-filled/50/ffffff/wallet.png' 
      : 'https://img.icons8.com/ios-filled/50/000000/wallet.png'; 
  };

  const handlePayment = () => {
    navigation.navigate('PinInput', {
      harga: harga, 
    });
  };
  

  return (
    <LinearGradient
      colors={isDarkMode ? ['#232526', '#414345'] : ['#FFEFBA', '#FFFFFF']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.operatorContainer, isDarkMode && styles.operatorContainerDark]}>
          <Image
            source={{ uri: getOperatorIcon() }} 
            style={styles.operatorIcon}
            resizeMode="contain" 
          />
          <View>
            <Text style={[styles.operatorName, isDarkMode && styles.textDark]}>{operator}</Text>
            <Text style={[styles.phoneNumber, isDarkMode && styles.textDark]}>{number}</Text>
          </View>
          <Text style={[styles.nominal, isDarkMode && styles.textDark]}>Rp {harga.toLocaleString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Metode Pembayaran</Text>
          <View style={[styles.paymentMethod, isDarkMode && styles.paymentMethodDark]}>
            {/* Wallet Icon and "Saldo Saya" Text */}
            <View style={styles.walletContainer}>
              <Image
                source={{ uri: getWalletIcon() }} // Change wallet icon based on dark mode
                style={styles.walletIcon}
                resizeMode="contain"
              />
              <View>
                <Text style={[styles.paymentText, isDarkMode && styles.textDark]}>Saldo saya</Text>
                <Text style={[styles.balanceAmount, isDarkMode && styles.textDark]}>Rp {balance.toLocaleString()}</Text>
              </View>
            </View>
            <Text style={[styles.paymentAmount, isDarkMode && styles.textDark]}>Rp {harga.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Detail Pembayaran</Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>Harga Voucher</Text>
            <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>Rp {harga.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, isDarkMode && styles.textDark]}>Biaya Transaksi</Text>
            <Text style={[styles.detailValue, isDarkMode && styles.textDark]}>Rp 0</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.totalLabel, isDarkMode && styles.textDark]}>Total Pembayaran</Text>
            <Text style={[styles.totalValue, isDarkMode && styles.textDark]}>Rp {harga.toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button at the very bottom of the screen */}
      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmButtonText}>Konfirmasi</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  operatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 15, // Rounded corners
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  operatorContainerDark: {
    backgroundColor: '#2c2c2e',
  },
  operatorIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    aspectRatio: 1, 
  },
  operatorName: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#555',
  },
  nominal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  paymentMethodDark: {
    backgroundColor: '#2c2c2e', 
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: 40, 
    height: 40,
    marginRight: 15, 
    aspectRatio: 1,
  },
  paymentText: {
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 16,
    marginTop: 5, 
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#f9f9f9', 
  },
  confirmButton: {
    backgroundColor: '#FF6B6B', 
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', 
    bottom: 20,           
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
