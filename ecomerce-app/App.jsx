import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, Pressable, View, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permisos insuficientes",
        "No tienes permisos para acceder a la biblioteca de imágenes. Por favor, otorga los permisos en la configuración de la aplicación.",
        [{ text: "OK" }]
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setSelectedImage(pickerResult.assets[0]?.uri);
  };

  const OpenShareDialog = async()=>{
    if(!(await Sharing.isAvailableAsync())){
      Alert.alert("No disponible", "La función de compartir no está disponible en este dispositivo.", [{ text: "OK" }]);
      return;
    } 
    await Sharing.shareAsync(selectedImage)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Mundo!!</Text>
      <Pressable onPress={openImagePickerAsync}>
        <Image
          style={styles.image}
          source={{ uri: selectedImage || 'https://picsum.photos/200/200' }}
          resizeMode="contain"
        />
      </Pressable>
      {selectedImage ?
        <Pressable style={styles.button} onPress={OpenShareDialog}>
          <Text style={styles.buttonText}>Pres Me</Text>
        </Pressable> : <View/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
  },
  title: { fontSize: 30, color: '#fff' },
  image: { height: 200, width: 200, borderRadius: 100 },
  button: { backgroundColor: 'deepskyblue', padding: 7, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 20 },
});

export default App;