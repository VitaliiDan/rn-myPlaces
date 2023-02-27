import { View, Image, Text, StyleSheet, Pressable, } from "react-native";

export const PlacesListItem = ({placeInfo, onSelect}) => {

  return (
    <Pressable onPress={onSelect}>
      <Image source={{uri: placeInfo.imageUri}}/>
      <View>
        <Text>{placeInfo.title}</Text>
        <Text>{placeInfo.address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {}
})