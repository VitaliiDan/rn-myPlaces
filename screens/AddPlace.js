import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlaceForm } from "../components/places/PlaceForm";
import { insertPlace } from "../utils/database";

export const AddPlace = () => {
	const navigation = useNavigation();

	const createPlaceHandler = async (place) => {
		await insertPlace(place);
		navigation.navigate('AllPlaces');
	}

	return (
		<PlaceForm onCreatePlace={ createPlaceHandler }/>
	)
}

const styles = StyleSheet.create({
	container: {}
})
