import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { PlacesList } from "../components/places/PlacesList";
import { fetchPlaces } from "../utils/database";

export const AllPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);

	const route = useRoute();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			(async ()=>{
				setLoadedPlaces([...await fetchPlaces()])
			})()
		}
	}, [isFocused])

	return (
		<PlacesList places={loadedPlaces}/>
	);
}

const styles = StyleSheet.create({
	container: {}
})
