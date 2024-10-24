import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from './_layout'; // Adjust path to where useTheme is exported

const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Add navigation hook
  const { isDarkMode } = useTheme(); // Access dark mode state
  const { transactionType, number, nominal, harga } = route.params;

  // Initial balance set to 1,000,000 Rp
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
        default:
          return 'Operator Tidak Dikenal';
      }
    }
  };

  const operator = getOperator(transactionType, number);

  // Dynamically select icon based on transaction type
  const getOperatorIcon = () => {
    if (transactionType === 'Listrik') {
      return 'https://img.icons8.com/ios-filled/50/000000/electrical.png'; // Replace with your own icon URL for Listrik
    } else if (transactionType === 'BPJS') {
      return 'https://img.icons8.com/ios-filled/50/000000/shield.png'; // Replace with your own icon URL for BPJS
    } else {
      return 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBAgYhXNZNpyzbQ0QT8JGNu-pGxrdNsyrOM925Ph9tVxixo7LfhU-IQ4EEQDbM0fiBhXtKvgpb_D2hmKYVbluGzTW-sdlfLOJ8cTtyq9S6vltSDWiJpC2r5c_pjy3WylLTQ6eI7UD88zn4ZQBBq6jitdMjtB6gnb0-25WnY3Em3Tw7BQXgOtyPZN0T/s320/GKL1_Telkomsel%20-%20Koleksilogo.com.jpg'; // Telkomsel logo as default
    }
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
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Scrollable content stays at the top */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.operatorContainer, isDarkMode && styles.operatorContainerDark]}>
          <Image
            source={{ uri: getOperatorIcon() }} // Dynamically load the appropriate icon based on transaction type
            style={styles.operatorIcon}
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
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/wallet.png' }} // Replace with wallet icon
                style={styles.walletIcon}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  containerDark: {
    backgroundColor: '#1c1c1e', // Dark mode background
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
    borderRadius: 10,
    marginBottom: 20,
  },
  operatorContainerDark: {
    backgroundColor: '#2c2c2e', // Dark mode operator container background
  },
  operatorIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  operatorName: {
    fontSize: 18,
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
    borderRadius: 10,
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
    width: 30,
    height: 30,
    marginRight: 10, // Adds spacing between icon and text
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
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position it at the bottom of the screen
    bottom: 20,           // A small offset from the bottom
    left: 20,
    right: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
