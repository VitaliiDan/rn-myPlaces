import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlaceForm } from "../components/places/PlaceForm";

export const AddPlace = () => {
	const navigation = useNavigation();

	const createPlaceHandler = (place) => {
		navigation.navigate('AllPlaces', {place});
	}

	return (
		<PlaceForm onCreatePlace={ createPlaceHandler }/>
	)
}

const styles = StyleSheet.create({
	container: {}
})
