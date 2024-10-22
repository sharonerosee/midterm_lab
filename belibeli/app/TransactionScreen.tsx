import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from './_layout'; // Import useTheme untuk dark mode

const VALID_PREFIXES_PULSA = ['081', '082', '083', '085', '087', '088']; // Prefix operator resmi di Indonesia
const VALID_PREFIXES_LISTRIK = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const VALID_PREFIXES_BPJS = ['0']

const PULSA_LISTRIK_OPTIONS = [
  { nominal: 5000, harga: 6500 },
  { nominal: 10000, harga: 11500 },
  { nominal: 15000, harga: 16500 },
  { nominal: 20000, harga: 21500 },
  { nominal: 25000, harga: 26500 },
  { nominal: 30000, harga: 31500 },
  { nominal: 40000, harga: 41500 },
  { nominal: 50000, harga: 51500 },
  { nominal: 75000, harga: 76500 },
  { nominal: 100000, harga: 101500 },
  { nominal: 150000, harga: 151500 },
  { nominal: 200000, harga: 201500 },
  { nominal: 300000, harga: 301500 },
  { nominal: 500000, harga: 501500 },
];

const BPJS_OPTIONS = [
  {nominal: 50000, bulan: '1 Bulan' ,harga: 51500},
  {nominal: 100000, bulan:'2 Bulan', harga: 101500},
  {nominal: 150000, bulan: '3 Bulan' ,harga: 151500},
  {nominal: 200000, bulan:'4 Bulan', harga: 201500},
  {nominal: 250000, bulan: '5 Bulan' ,harga: 251500},
  {nominal: 300000, bulan:'6 Bulan', harga: 301500},
  {nominal: 350000, bulan: '7 Bulan' ,harga: 351500},
  {nominal: 400000, bulan:'8 Bulan', harga: 401500},
  {nominal: 450000, bulan: '9 Bulan' ,harga: 451500},
  {nominal: 500000, bulan:'10 Bulan', harga: 501500},
  {nominal: 550000, bulan: '11 Bulan' ,harga: 551500},
  {nominal: 600000, bulan:'12 Bulan', harga: 601500},
];

const TransactionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Mengatur header navigasi
  const { transactionType } = route.params;
  const { isDarkMode } = useTheme(); // Akses status dark mode

  const [inputValue, setInputValue] = useState(''); // Menyimpan input dari pengguna
  const [errorMessage, setErrorMessage] = useState(''); // Untuk menampilkan pesan error
  const [isPrefixValid, setIsPrefixValid] = useState(false); // State untuk cek validitas prefix
  const [selectedTab, setSelectedTab] = useState(transactionType);

  useEffect(() => {
    // Mengatur header sesuai dengan jenis transaksi
    if (transactionType === 'Pulsa' || transactionType === 'Paket Data') {
      navigation.setOptions({
        title: 'Pulsa & Paket Data', // Judul untuk Pulsa dan Paket Data
      });
    } else {
      navigation.setOptions({
        title: `${transactionType}`, // Judul untuk transaksi lainnya
      });
    }

    // Menambahkan event listener untuk keyboard hide
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      validateLength(); // Jalankan validasi ketika keyboard disembunyikan
    });

    // Cleanup event listener saat component unmount
    return () => {
      keyboardListener.remove();
    };
  }, [navigation, transactionType, inputValue]);

  const validatePrefixPulsa = (text) => {
    // Validasi hanya prefix (cek apakah mulai dengan 081, 082, dll.)
    if (VALID_PREFIXES_PULSA.some((prefix) => text.startsWith(prefix))) {
      setIsPrefixValid(true);
      setErrorMessage(''); // Jika prefix valid, hapus pesan error
    } else {
      setIsPrefixValid(false);
      setErrorMessage('Hemm, provider-nya ngga ketemu nih. Cek lagi, yaa.');
    }
  };

  const validatePrefixListrik = (text) => {
    if (VALID_PREFIXES_LISTRIK.some((prefix) => text.startsWith(prefix))) {
      setIsPrefixValid(true);
      setErrorMessage(''); // Jika prefix valid, hapus pesan error
    } else {
      setIsPrefixValid(false);
      setErrorMessage('Nomor yang kamu masukkan salah nih. Cek lagi, yaa.');
    }
  };

  const validatePrefixBPJS = (text) => {
    if (VALID_PREFIXES_BPJS.some((prefix) => text.startsWith(prefix))) {
      setIsPrefixValid(true);
      setErrorMessage(''); // Jika prefix valid, hapus pesan error
    } else {
      setIsPrefixValid(false);
      setErrorMessage('Nomor yang kamu masukkan salah nih. Cek lagi, yaa.');
    }
  };

  const validateLength = () => {
    // Validasi panjang nomor ketika keyboard ditutup
    if (inputValue.length > 0 && inputValue.length < 10) {
      setErrorMessage('Waduh, nomor kamu terlalu pendek nih. Masukkan nomor yang benar yaa.');
    }
  };

  const handleOptionSelect = (option) => {
    // Validasi panjang nomor (harus 10-13 digit)
    if (inputValue.length < 10 || inputValue.length > 13) {
      setErrorMessage('Nomor tidak valid, harus antara 10-13 digit');
      return;
    }

    // Jika nomor valid, lanjut ke halaman konfirmasi
    navigation.navigate('ConfirmationScreen', {
      transactionType: selectedTab,
      number: inputValue,
      nominal: option.nominal,
      harga: option.harga,
    });
  };

  const renderPulsaOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleOptionSelect(item)}
    >
      <Text style={styles.optionText}>{item.nominal.toLocaleString()}.000</Text>
      <Text style={styles.optionPrice}>Harga Rp {item.harga.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const renderBpjsOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleOptionSelect(item)}
    >
      <Text style={styles.optionText}>{item.bulan}</Text>
      <Text style={styles.optionPrice}>Harga Rp {item.harga.toLocaleString()}</Text>
    </TouchableOpacity>
  );
  

  if (transactionType === 'Pulsa' || transactionType === 'Paket Data') {
    // TAMPILAN UNTUK PULSA & PAKET DATA
    return (
      <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
          Nomor Ponsel
        </Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text); // Update input value
            validatePrefixPulsa(text); // Validasi otomatis saat mengetik prefix
          }}
          placeholder="Contoh: 082370323318"
          placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          keyboardType="numeric"
        />
        {/* Tampilkan pesan error di bawah input */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Tampilkan pilihan nominal jika prefix valid */}
        {isPrefixValid && (
          <FlatList
            data={PULSA_LISTRIK_OPTIONS}
            renderItem={renderPulsaOption}
            keyExtractor={(item) => item.nominal.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    );
  } else if (transactionType === 'Listrik') {
    return (
      <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
          Nomor Token Listrik
        </Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text); // Update input value
            validatePrefixListrik(text); // Validasi otomatis saat mengetik prefix
          }}
          placeholder="Contoh: 823703233188"
          placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          keyboardType="numeric"
        />
        {/* Tampilkan pesan error di bawah input */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Tampilkan pilihan nominal jika prefix valid */}
        {isPrefixValid && (
          <FlatList
            data={PULSA_LISTRIK_OPTIONS}
            renderItem={renderPulsaOption}
            keyExtractor={(item) => item.nominal.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    );
  } else if (transactionType == 'BPJS'){
    return (
      <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
          Nomor BPJS Kesehatan
        </Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text); // Update input value
            validatePrefixBPJS(text); // Validasi otomatis saat mengetik prefix
          }}
          placeholder="Contoh: 0551245123255"
          placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          keyboardType="numeric"
        />
        {/* Tampilkan pesan error di bawah input */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Tampilkan pilihan nominal jika prefix valid */}
        {isPrefixValid && (
          <FlatList
            data={BPJS_OPTIONS}
            renderItem={renderBpjsOption}
            keyExtractor={(item) => item.nominal.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    );
  }

  // TAMPILAN UNTUK BPJS DAN TOKEN LISTRIK TIDAK BERUBAH
  // return (
  //   <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
  //     <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>
  //       {transactionType === 'Token Listrik' ? 'Masukkan ID Pelanggan' : 'Masukkan Nomor BPJS'}
  //     </Text>
  //     <TextInput
  //       style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
  //       value={inputValue}
  //       onChangeText={setInputValue}
  //       placeholder={transactionType === 'Token Listrik' ? 'ID Pelanggan' : 'Nomor BPJS'}
  //       placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
  //       keyboardType="numeric"
  //     />
  //     <TouchableOpacity
  //       style={[styles.button, isDarkMode ? styles.buttonDark : styles.buttonLight]}
  //       onPress={handleOptionSelect}
  //     >
  //       <Text style={styles.buttonText}>Lanjutkan</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerLight: {
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10, // Ubah margin untuk memberi ruang pada pesan error
  },
  inputLight: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  inputDark: {
    borderColor: '#555',
    backgroundColor: '#444',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  inactiveTab: {
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 5,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc', // Border color untuk kotak
    borderWidth: 1, // Ukuran border
    shadowColor: '#000', // Tambahkan shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3, // Untuk shadow di Android
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionPrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default TransactionScreen;
