import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, Switch, TouchableOpacity,
  Modal, Platform, ActionSheetIOS,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient'; // Untuk gradasi background
import { useTheme } from '../_layout'; // Import useTheme dari ThemeContext

// Fungsi debounce untuk menghindari klik berulang dengan cepat
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// String teks untuk bahasa Inggris dan Indonesia, khusus untuk ProfileScreen
const textStrings = {
  EN: {
    profileTitle: 'Profile',
    changeLanguage: 'Change Language',
    darkMode: 'Dark Mode',
    appVersion: 'App Version 1.2024.10.22',
    selectLanguage: 'Select Language',
    english: 'English',
    indonesian: 'Indonesia',
    cancel: 'Cancel',
    profileName: 'Sharone Angelica Jovans',
    profileId: '00000069637',
    profileDate: '(22 November 2004)',
  },
  ID: {
    profileTitle: 'Profil',
    changeLanguage: 'Ganti Bahasa',
    darkMode: 'Mode Gelap',
    appVersion: 'Versi Aplikasi 1.2024.10.22',
    selectLanguage: 'Pilih Bahasa',
    english: 'Inggris',
    indonesian: 'Indonesia',
    cancel: 'Batal',
    profileName: 'Sharone Angelica Jovans',
    profileId: '00000069637',
    profileDate: '(22 November 2004)',
  },
};

const ProfileScreen = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [language, setLanguage] = useState<'EN' | 'ID'>('EN');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleBackPress = useCallback(
    debounce(() => {
      navigation.goBack();
    }, 300),
    [navigation]
  );

  const strings = textStrings[language];

  const showLanguageOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [strings.cancel, strings.english, strings.indonesian],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) setLanguage('EN');
          if (buttonIndex === 2) setLanguage('ID');
        }
      );
    } else {
      setModalVisible(true);
    }
  };


  const selectLanguage = (lang: 'EN' | 'ID') => {
    setLanguage(lang);
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#2d2d2d', '#5a1f5c'] : ['#f7d1e3', '#fef6e4', '#d4fcf8']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <FontAwesome name="chevron-left" size={24} color={isDarkMode ? 'white' : 'black'} />
      </TouchableOpacity>

      <Text style={[styles.title, isDarkMode ? styles.textDark : styles.textLight]}>
        {strings.profileTitle}
      </Text>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/foto.png')}
          style={styles.profileImage}
        />

        

        <Text style={[styles.profileName, isDarkMode ? styles.textDark : styles.textLight]}>
          {strings.profileName}
        </Text>
        <Text style={[styles.profileId, isDarkMode ? styles.textDark : styles.textLight]}>
          {strings.profileId}
        </Text>
        <Text style={[styles.profileDate, isDarkMode ? styles.textDark : styles.textLight]}>
          {strings.profileDate}
        </Text>
      </View>

      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingRow} onPress={showLanguageOptions}>
          <Text style={[styles.settingLabel, isDarkMode ? styles.textDark : styles.textLight]}>
            {strings.changeLanguage}
          </Text>
          <View style={styles.languageRow}>
            <Text style={styles.languageOption}>{language === 'EN' ? 'EN' : 'ID'}</Text>
            <FontAwesome name="chevron-right" size={16} color={isDarkMode ? 'white' : '#888888'} />
          </View>
        </TouchableOpacity>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDarkMode ? styles.textDark : styles.textLight]}>
            {strings.darkMode}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
      </View>

      {Platform.OS === 'android' && (
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{strings.selectLanguage}</Text>
              <TouchableOpacity onPress={() => selectLanguage('EN')}>
                <Text style={styles.modalOption}>{strings.english}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectLanguage('ID')}>
                <Text style={styles.modalOption}>{strings.indonesian}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancel}>{strings.cancel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.spacer} />

      {/* Versi Aplikasi */}
      <Text style={[styles.version, isDarkMode ? styles.textDark : styles.textLight]}>
        {strings.appVersion}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileId: {
    fontSize: 16,
    marginVertical: 5,
  },
  profileDate: {
    fontSize: 14,
    color: '#888',
  },
  settingContainer: {
    marginTop: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
  },
  languageOption: {
    fontSize: 16,
    color: '#888',
    marginRight: 5,
  },
  spacer: {
    flex: 1,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#ffcccc',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
  },
  modalCancel: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default ProfileScreen;
