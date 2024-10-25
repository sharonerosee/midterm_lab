import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from './_layout'; // Adjust path to where useTheme is exported
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for background gradients

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Add navigation hook
  const { isDarkMode } = useTheme(); // Access dark mode state
  const { transactionType, number, nominal, harga } = route.params;

  // Initial balance set to 1,000,000 Rp
  const [balance, setBalance] = useState(1000000);

  // Fungsi untuk mendapatkan operator berdasarkan nomor dan tipe transaksi
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

  // Mengatur title halaman di header
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Konfirmasi Pembayaran',
    });
  }, [navigation]);

  const operator = getOperator(transactionType, number);

  // Fungsi untuk mendapatkan URL logo operator berdasarkan tipe transaksi
  const getOperatorIcon = () => {
    if (transactionType === 'Listrik') {
      return 'https://dataset.jogjakota.go.id/uploads/group/2023-11-09-043411.205898LogoPLN.png'; // Logo PLN
    } else if (transactionType === 'BPJS') {
      return 'https://fahum.umsu.ac.id/blog/wp-content/uploads/2024/07/cara-mendaftar-dan-membayar-tagihan-bpjs-secara-online-2024.jpg'; // Logo BPJS
    } else {
      switch (operator) {
        case 'Telkomsel':
          return 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBAgYhXNZNpyzbQ0QT8JGNu-pGxrdNsyrOM925Ph9tVxixo7LfhU-IQ4EEQDbM0fiBhXtKvgpb_D2hmKYVbluGzTW-sdlfLOJ8cTtyq9S6vltSDWiJpC2r5c_pjy3WylLTQ6eI7UD88zn4ZQBBq6jitdMjtB6gnb0-25WnY3Em3Tw7BQXgOtyPZN0T/s320/GKL1_Telkomsel%20-%20Koleksilogo.com.jpg'; // Logo Telkomsel
        case 'Axis':
          return 'https://isipulsa.web.id/images/produk/paket_internet/axis.png'; // Logo Axis
        case 'Tri':
          return 'https://upload.wikimedia.org/wikipedia/id/thumb/6/68/3-brand.svg/1200px-3-brand.svg.png'; // Logo Tri
        case 'SmartFren':
          return 'https://storage.googleapis.com/ekrutassets/blogs/images/000/005/202/original/Smartfren-Logo.wine.png'; // Logo Smartfren
        default:
          return 'https://img.icons8.com/ios-filled/50/000000/question-mark.png'; // Default icon for unknown operator
      }
    }
  };

  // Fungsi untuk mendapatkan ikon wallet berbeda untuk dark mode dan light mode
  const getWalletIcon = () => {
    return isDarkMode
      ? 'https://img.icons8.com/ios-filled/50/ffffff/wallet.png' // White wallet icon for dark mode
      : 'https://img.icons8.com/ios-filled/50/000000/wallet.png'; // Black wallet icon for light mode
  };

  // Handle payment and navigate to PinInputScreen
  const handlePayment = () => {
    navigation.navigate('PinInput', {
      transactionType: transactionType,
      number: number,
      nominal: nominal,
      harga: harga,
    });
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#232526', '#414345'] : ['#FFEFBA', '#FFFFFF']}
      style={styles.container}
    >
      {/* Scrollable content stays at the top */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.operatorContainer, isDarkMode && styles.operatorContainerDark]}>
          <Image
            source={{ uri: getOperatorIcon() }} // Dynamically load the appropriate icon based on transaction type
            style={styles.operatorIcon}
            resizeMode="contain" // Ensure the image fits without being cropped
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
    backgroundColor: '#2c2c2e', // Dark mode operator container background
  },
  operatorIcon: {
    width: 50, // Larger icon for better visual
    height: 50,
    marginRight: 15,
    aspectRatio: 1, // To maintain aspect ratio
  },
  operatorName: {
    fontSize: 20, // Larger font size
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
    borderRadius: 15, // Rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  paymentMethodDark: {
    backgroundColor: '#2c2c2e', // Dark mode payment method background
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: 40, // Bigger icon
    height: 40,
    marginRight: 15, // Adds spacing between icon and text
    aspectRatio: 1,
  },
  paymentText: {
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 16,
    marginTop: 5, // Adding a margin to separate it from "Saldo saya"
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
    color: '#f9f9f9', // Dark mode text color
  },
  confirmButton: {
    backgroundColor: '#FF6B6B', // Bright confirm button color
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position it at the bottom of the screen
    bottom: 20,           // A small offset from the bottom
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
