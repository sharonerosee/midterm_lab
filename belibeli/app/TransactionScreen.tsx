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
const VALID_PREFIXES_LISTRIK = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const VALID_PREFIXES_BPJS = ['0'];

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

const PAKET_DATA_OPTIONS = [
  { name: '1 GB', harga: 6500 },
  { name: '2 GB', harga: 11500 },
  { name: '3 GB', harga: 16500 },
  { name: '4 GB', harga: 21500 },
  { name: '5 GB', harga: 26500 },
  { name: '6 GB', harga: 31500 },
  { name: '7 GB', harga: 41500 },
  { name: '8 GB', harga: 51500 },
  { name: '9 GB', harga: 76500 },
  { name: '10 GB', harga: 101500 },
  { name: '11 GB', harga: 151500 },
  { name: '12 GB', harga: 201500 },
  { name: '13 GB', harga: 301500 },
  { name: '14 GB', harga: 501500 },
];

const BPJS_OPTIONS = [
  { nominal: 50000, name: '1 Bulan', harga: 51500 },
  { nominal: 100000, name: '2 Bulan', harga: 101500 },
  { nominal: 150000, name: '3 Bulan', harga: 151500 },
  { nominal: 200000, name: '4 Bulan', harga: 201500 },
  { nominal: 250000, name: '5 Bulan', harga: 251500 },
  { nominal: 300000, name: '6 Bulan', harga: 301500 },
  { nominal: 350000, name: '7 Bulan', harga: 351500 },
  { nominal: 400000, name: '8 Bulan', harga: 401500 },
  { nominal: 450000, name: '9 Bulan', harga: 451500 },
  { nominal: 500000, name: '10 Bulan', harga: 501500 },
  { nominal: 550000, name: '11 Bulan', harga: 551500 },
  { nominal: 600000, name: '12 Bulan', harga: 601500 },
];

const TransactionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Mengatur header navigasi
  const { transactionType } = route.params;
  const { isDarkMode } = useTheme(); // Akses status dark mode

  const [inputValue, setInputValue] = useState(''); // Menyimpan input dari pengguna
  const [errorMessage, setErrorMessage] = useState(''); // Untuk menampilkan pesan error
  const [isPrefixValid, setIsPrefixValid] = useState(false); // State untuk cek validitas prefix
  const [selectedTab, setSelectedTab] = useState(transactionType); // State untuk tab toggle

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
    if (transactionType === 'Pulsa' || transactionType === 'Paket Data') {
      if (inputValue.length > 0 && (inputValue.length < 10 || inputValue.length > 13)) {
        setErrorMessage('Nomor tidak valid, harus antara 10-13 digit');
      } else {
        setErrorMessage('');
      }
    } else if (transactionType === 'Listrik') {
      if (inputValue.length > 0 && (inputValue.length < 10 || inputValue.length > 12)) {
        setErrorMessage('Nomor token listrik tidak valid, harus antara 10-12 digit');
      } else {
        setErrorMessage('');
      }
    } else if (transactionType === 'BPJS') {
      if (inputValue.length > 0 && (inputValue.length < 10 || inputValue.length > 13)) {
        setErrorMessage('Nomor BPJS tidak valid, harus antara 10-13 digit');
      } else {
        setErrorMessage('');
      }
    }
  };

  const handleOptionSelect = (option) => {
    if (transactionType === 'Pulsa' || transactionType === 'Paket Data') {
      if (inputValue.length < 10 || inputValue.length > 13) {
        setErrorMessage('Nomor tidak valid, harus antara 10-13 digit');
        return;
      }
    } else if (transactionType === 'Listrik') {
      if (inputValue.length < 10 || inputValue.length > 12) {
        setErrorMessage('Nomor token listrik tidak valid, harus antara 10-12 digit');
        return;
      }
    } else if (transactionType === 'BPJS') {
      if (inputValue.length < 10 || inputValue.length > 13) {
        setErrorMessage('Nomor BPJS tidak valid, harus antara 10-13 digit');
        return;
      }
    }

    navigation.navigate('ConfirmationScreen', {
      transactionType: selectedTab,
      number: inputValue,
      name: option.name,
      nominal: option.nominal,
      bulan: option.bulan,
      harga: option.harga,
    });
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]}
      onPress={() => handleOptionSelect(item)}
    >
      <Text style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>
        {item.nominal ? `${item.nominal.toLocaleString()}` : item.name}
      </Text>
      <Text style={[styles.optionPrice, isDarkMode ? styles.optionPriceDark : styles.optionPriceLight]}>
        Harga Rp {item.harga.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  const renderBpjsOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.optionContainer, isDarkMode ? styles.optionContainerDark : styles.optionContainerLight]}
      onPress={() => handleOptionSelect(item)}
    >
      <Text style={[styles.optionText, isDarkMode ? styles.optionTextDark : styles.optionTextLight]}>
        {item.name}
      </Text>
      <Text style={[styles.optionPrice, isDarkMode ? styles.optionPriceDark : styles.optionPriceLight]}>
        Harga Rp {item.harga.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  const renderToggle = () => (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedTab === 'Pulsa'
            ? isDarkMode
              ? styles.activeButtonDark
              : styles.activeButton
            : isDarkMode
            ? styles.inactiveButtonDark
            : styles.inactiveButton,
        ]}
        onPress={() => setSelectedTab('Pulsa')}
      >
        <Text
          style={selectedTab === 'Pulsa' ? (isDarkMode ? styles.activeTextDark : styles.activeText) : styles.inactiveText}
        >
          Isi Pulsa
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedTab === 'Paket Data'
            ? isDarkMode
              ? styles.activeButtonDark
              : styles.activeButton
            : isDarkMode
            ? styles.inactiveButtonDark
            : styles.inactiveButton,
        ]}
        onPress={() => setSelectedTab('Paket Data')}
      >
        <Text
          style={
            selectedTab === 'Paket Data'
              ? isDarkMode
                ? styles.activeTextDark
                : styles.activeText
              : styles.inactiveText
          }
        >
          Paket Data
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (transactionType === 'Pulsa' || transactionType === 'Paket Data') {
    return (
      <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>Nomor Ponsel</Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            validatePrefixPulsa(text);
          }}
          placeholder="Contoh: 082370323318"
          placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          keyboardType="numeric"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {renderToggle()}
        {isPrefixValid && (
          <FlatList
            data={selectedTab === 'Pulsa' ? PULSA_LISTRIK_OPTIONS : PAKET_DATA_OPTIONS}
            renderItem={renderOption}
            keyExtractor={(item) => item.nominal ? item.nominal.toString() : item.name}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    );
  } else if (transactionType === 'Listrik') {
    return (
      <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>Nomor Token Listrik</Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            validatePrefixListrik(text);
          }}
          placeholder="Contoh: 823703233188"
          placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          keyboardType="numeric"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {isPrefixValid && (
          <FlatList
            data={PULSA_LISTRIK_OPTIONS}
            renderItem={renderOption}
            keyExtractor={(item) => item.nominal.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        )}
      </View>
    );
  } else if (transactionType === 'BPJS') {
    return (
      <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
        <Text style={[styles.label, isDarkMode ? styles.textDark : styles.textLight]}>Nomor BPJS Kesehatan</Text>
        <TextInput
          style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          value={inputValue}
          onChangeText={(text) => {
            setInputValue(text);
            validatePrefixBPJS(text);
          }}
          placeholder="Contoh: 0551245123255"
          placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          keyboardType="numeric"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerLight: {
    backgroundColor: '#f0f8ff', // Latar belakang yang lebih segar
  },
  containerDark: {
    backgroundColor: '#1c1c1e', // Lebih gelap di dark mode
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#333', // Teks yang lebih halus di mode terang
  },
  textDark: {
    color: '#f5f5f5', // Teks yang lebih lembut di mode gelap
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  inputLight: {
    borderColor: '#a0c4ff', // Warna lebih cerah dan modern untuk input di light mode
    backgroundColor: '#ffffff',
  },
  inputDark: {
    borderColor: '#374151', // Warna lebih kalem di dark mode
    backgroundColor: '#2c2c2e',
  },
  errorText: {
    color: '#ff4d4f', // Warna merah yang lebih menarik untuk error
    marginBottom: 10,
  },
  optionContainer: {
    padding: 20,
    margin: 5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  optionContainerLight: {
    backgroundColor: '#e0f7fa', // Warna biru muda yang lebih segar untuk light mode
    borderColor: '#80deea',
  },
  optionContainerDark: {
    backgroundColor: '#263238', // Warna lebih dramatis untuk dark mode
    borderColor: '#546e7a',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionTextLight: {
    color: '#00796b', // Warna hijau yang segar
  },
  optionTextDark: {
    color: '#aed581', // Warna hijau lembut untuk dark mode
  },
  optionPrice: {
    fontSize: 14,
    marginTop: 5,
  },
  optionPriceLight: {
    color: '#004d40', // Teks harga yang lebih menonjol di light mode
  },
  optionPriceDark: {
    color: '#cfd8dc', // Teks harga yang lebih jelas di dark mode
  },
  row: {
    justifyContent: 'space-between',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: '#29b6f6', // Warna biru terang untuk tombol aktif di light mode
  },
  activeButtonDark: {
    backgroundColor: '#039be5', // Warna biru tua untuk tombol aktif di dark mode
  },
  inactiveButton: {
    backgroundColor: '#e1f5fe', // Warna tombol inaktif yang lebih cerah di light mode
  },
  inactiveButtonDark: {
    backgroundColor: '#455a64', // Warna tombol inaktif di dark mode
  },
  activeText: {
    color: '#ffffff', // Teks putih untuk tombol aktif
    fontWeight: 'bold',
  },
  activeTextDark: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#9e9e9e', // Teks abu-abu untuk tombol inaktif
  },
});

export default TransactionScreen;
