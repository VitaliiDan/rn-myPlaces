import { StyleSheet, FlatList, View, Text } from "react-native";
import { PlacesListItem } from "./PlacesListItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export const PlacesList = ({ places }) => {
  const navigation = useNavigation()
  const onSelectPlaceHandler = (id) => navigation.navigate('PlaceDetails', { placeId: id })


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
      renderItem={({ item }) => <PlacesListItem placeInfo={item} onSelect={onSelectPlaceHandler}/>}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 24
  },
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
