import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { PlacesList } from "../components/places/PlacesList";

export const AllPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	const route = useRoute();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused && route.params) {
			setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place])
		}

	}, [isFocused, route])

	return (
		<PlacesList places={loadedPlaces}/>
	);
}

const styles = StyleSheet.create({
	container: {}
})
