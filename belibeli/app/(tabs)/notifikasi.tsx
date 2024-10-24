import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button, Clipboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../_layout'; // Menggunakan custom hook untuk tema
import { LinearGradient } from 'expo-linear-gradient'; // Untuk gradasi latar belakang

// Daftar promo menarik
const promoList = [
  { id: '1', title: 'Promo Grab 50% Diskon', description: 'Nikmati diskon 50% untuk semua perjalanan dengan Grab.', type: 'grab' },
  { id: '2', title: 'Promo Gojek Cashback 30%', description: 'Cashback 30% untuk semua layanan Gojek.', type: 'gojek' },
  { id: '3', title: 'Promo Nonton Bioskop Buy 1 Get 1', description: 'Tonton film favoritmu dengan promo beli 1 tiket gratis 1.', type: 'film' },
  { id: '4', title: 'Diskon 20% di Kopi Kafe', description: 'Dapatkan diskon 20% untuk semua minuman di Kopi Kafe.', type: 'kafe' },
  { id: '5', title: 'Promo Ojek Online Murah', description: 'Hanya Rp5.000 untuk semua perjalanan ojek online.', type: 'ojek' },
];

export default function NotifikasiScreen() {
  const { isDarkMode } = useTheme(); // Akses tema dari context
  const [selectedPromo, setSelectedPromo] = useState(null); // State untuk promo yang dipilih
  const [isModalVisible, setModalVisible] = useState(false); // State untuk visibilitas modal

  // Fungsi untuk memilih promo dan menampilkan modal
  const handlePromoClick = (promo) => {
    setSelectedPromo(promo); // Set promo yang dipilih
    setModalVisible(true); // Tampilkan modal
  };

  // Fungsi untuk menyalin kode voucher ke clipboard
  const handleCopyCode = () => {
    if (selectedPromo) {
      Clipboard.setString('KODEVOUCHER2024'); // Kode voucher yang disalin (contoh saja)
      setModalVisible(false); // Tutup modal setelah disalin
    }
  };

  // Fungsi untuk memilih ikon berdasarkan tipe promo
  const getIcon = (type) => {
    switch (type) {
      case 'grab':
        return <Ionicons name="car" size={28} color="#4CAF50" />;
      case 'gojek':
      case 'ojek':
        return <Ionicons name="bicycle" size={28} color="#FF9800" />;
      case 'film':
        return <Ionicons name="film" size={28} color="#F44336" />;
      case 'kafe':
        return <Ionicons name="cafe" size={28} color="#795548" />;
      default:
        return <Ionicons name="pricetag" size={28} color="#000" />;
    }
  };

  // Fungsi untuk render setiap item promo
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.promoCard, isDarkMode ? styles.promoCardDark : styles[`promoCard${item.type}`]]}
      onPress={() => handlePromoClick(item)}
    >
      <View style={styles.iconContainer}>{getIcon(item.type)}</View>
      <View style={styles.textContainer}>
        <Text style={[styles.promoTitle, isDarkMode ? styles.textDark : styles.textLight]}>{item.title}</Text>
        <Text style={[styles.promoDescription, isDarkMode ? styles.textDark : styles.textLight]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#121212', '#1e1e1e'] : ['#f5f7fa', '#c3cfe2']} // Gradasi latar belakang
      style={styles.container}
    >
      <Text style={[styles.headerText, isDarkMode ? styles.textDark : styles.textLight]}>
        Promo Menarik untuk Kamu
      </Text>
      <FlatList
        data={promoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.promoList}
      />

      {/* Modal untuk menampilkan kode voucher */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, isDarkMode ? styles.modalContainerDark : styles.modalContainerLight]}>
            {selectedPromo && (
              <>
                <Text style={[styles.modalTitle, isDarkMode ? styles.textDark : styles.textLight]}>
                  {selectedPromo.title}
                </Text>
                <Text style={[styles.modalVoucher, isDarkMode ? styles.textDark : styles.textLight]}>
                  Kode Voucher: KODEVOUCHER2024
                </Text>
                <Button title="Copy" onPress={handleCopyCode} color={isDarkMode ? '#000' : '#000'} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  promoList: {
    paddingBottom: 30,
  },
  promoCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoCardgrab: {
    backgroundColor: '#c8e6c9', // Warna hijau untuk promo Grab
  },
  promoCardgojek: {
    backgroundColor: '#fff3e0', // Warna oranye untuk promo Gojek
  },
  promoCardfilm: {
    backgroundColor: '#ffcdd2', // Warna merah muda untuk promo Film
  },
  promoCardkafe: {
    backgroundColor: '#ffe0b2', // Warna coklat muda untuk promo Kafe
  },
  promoCardojek: {
    backgroundColor: '#87CEEB', // Warna lilac untuk promo Ojek Murah
  },
  promoCardDark: {
    backgroundColor: '#1e1e1e', // Warna dark mode
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoDescription: {
    fontSize: 14,
  },
  textLight: {
    color: '#1e1e1e',
  },
  textDark: {
    color: '#f5f5f5',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Latar belakang transparan hitam
  },
  modalContainer: {
    width: 300,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  modalContainerLight: {
    backgroundColor: '#fff', // Latar belakang terang untuk light mode
  },
  modalContainerDark: {
    backgroundColor: '#333', // Latar belakang gelap untuk dark mode
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalVoucher: {
    fontSize: 16,
    marginBottom: 20,
  },
});
