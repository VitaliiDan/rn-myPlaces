import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OutlineButton } from "../components/ui/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetail } from "../utils/database";

export const PlaceDetails = () => {
	const [place, setPlace] = useState(null);
	const navigation = useNavigation();
	const route = useRoute();
	const placeId = route.params.placeId;

	useEffect(() => {
		(async () => {
      setPlace(await fetchPlaceDetail(placeId));
		})()
	}, [placeId, navigation]);

	useEffect(() => {
		if (place) {
			navigation.setOptions({ title: place.title });
		}
	}, [place]);


	if (!place) {
		return (
			<View style={styles.fallback}>
				<Text>Loading Place data...</Text>
			</View>
		);
	}
	const showOnMapHandler = () => navigation.navigate('Map', {lat: place.location.lat, lng: place.location.lng})

	return (
		<ScrollView>
			<Image style={ styles.image } source={{uri: place.imageUri}}/>
			<View style={ styles.locationContainer }>
				<View style={ styles.addressContainer }>
					<Text style={ styles.address }>{ place.address }</Text>
				</View>
				<OutlineButton icon='map' onPress={ showOnMapHandler }>
					View on Map
				</OutlineButton>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		height: '35%',
		minHeight: 300,
		width: '100%',
	},
	locationContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary500,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	}
})
