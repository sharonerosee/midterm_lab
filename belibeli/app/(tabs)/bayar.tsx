import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../_layout'; 

export default function Bayar() {
  const [showScanner, setShowScanner] = useState(false);
  const [qrData, setQrData] = useState(null);
  const { isDarkMode } = useTheme(); 

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const handleBarCodeScanned = ({ data }) => {
    setQrData(data);
    setShowScanner(false); 
    alert(`QR Code Detected: ${data}`);
  };

  const styles = getStyles(isDarkMode); 

  return (
    <LinearGradient
      colors={isDarkMode ? ['#2c2c2e', '#5a1f5c'] : ['#f7d1e3', '#fef6e4', '#d4fcf8']}
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/images/QR.png')}
        style={[styles.qrImage, { transform: [{ translateY: floatAnim }] }]}
        resizeMode="contain"
      />

      <Text style={[styles.title, isDarkMode ? styles.textDark : styles.textLight]}>
        Halaman Bayar
      </Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowScanner(true)}
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={32}
            color={isDarkMode ? '#ffb6c1' : '#ff6b81'}
          />
          <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
            Scan QR
          </Text>
        </TouchableOpacity>

        <View style={styles.verticalLine} />

        <TouchableOpacity style={styles.iconButton} onPress={() => alert('QR Data: ' + qrData)}>
          <MaterialIcons
            name="info-outline"
            size={32}
            color={isDarkMode ? '#ffb6c1' : '#ff6b81'}
          />
          <Text style={[styles.iconText, isDarkMode ? styles.textDark : styles.textLight]}>
            Lihat Data
          </Text>
        </TouchableOpacity>
      </View>

      {showScanner && (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeScanned}
          captureAudio={false}
        >
          <Text style={styles.cameraText}>Arahkan ke QR Code</Text>
        </RNCamera>
      )}
    </LinearGradient>
  );
}

// Fungsi untuk menentukan styles berdasarkan tema
const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    qrImage: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      letterSpacing: 1.2,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '80%',
      marginTop: 20,
    },
    iconButton: {
      alignItems: 'center',
      flex: 1,
    },
    verticalLine: {
      width: 1,
      height: '70%',
      backgroundColor: isDarkMode ? '#ffb6c1' : '#ff6b81',
    },
    iconText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: '600',
    },
    camera: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraText: {
      color: '#fff',
      fontSize: 18,
      marginTop: 20,
    },
    textLight: {
      color: '#000',
    },
    textDark: {
      color: '#ffcccc',
    },
  });
