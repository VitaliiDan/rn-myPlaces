import { Alert, Button, Image, Text, View, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";

export const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {

    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.')
      return false
    }

    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri)
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image source={{uri: pickedImage}} style={styles.image}/>
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title={'Take Image'} onPress={takeImageHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  }
})