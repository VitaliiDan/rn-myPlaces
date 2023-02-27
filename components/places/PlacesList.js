import { StyleSheet, FlatList, View, Text } from "react-native";
import { PlacesListItem } from "./PlacesListItem";
import { Colors } from "../../constants/colors";

export const PlacesList = ({ places }) => {
  if (!places || places.length === 0) return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No places found, maybe start adding some?
      </Text>
    </View>
  )


  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PlacesListItem placeInfo={item}/>}
    />
  )
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  }
})