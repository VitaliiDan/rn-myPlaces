import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "../components/ui/IconButton";

export const Map = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const initialLocation = route.params && {
		lat: route.params.lat,
		lng: route.params.lng
	};

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const region = {
		latitude: initialLocation ? initialLocation.lat : 52.2297,
		longitude: initialLocation ? initialLocation.lng : 21.0122,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	const selectLocationHandler = (event) => {
		const lat = event.nativeEvent.coordinate.latitude
		const lng = event.nativeEvent.coordinate.longitude

		setSelectedLocation({lat, lng})
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert('No location chosen', 'Please pick a location on the map first.')

			return
		}

		navigation.navigate(
			'AddPlace',
			{
				pickedLat: selectedLocation.lat,
				pickedLng: selectedLocation.lng
			}
		)
	}, [selectedLocation, navigation])

	useLayoutEffect(() => {

		if (!initialLocation) {
			return
		}

		navigation.setOptions({
			headerRight: ({tintColor}) => (
				<IconButton
					icon="save"
					size={ 24 }
					color={ tintColor }
					onPress={ savePickedLocationHandler }
				/>
			)
		})
	}, [navigation, savePickedLocationHandler, initialLocation])

	return (
		<MapView
			initialRegion={ region }
			style={ styles.container }
			onPress={ selectLocationHandler }
		>
			{
				selectedLocation && (
					<Marker
						title='Picked location'
						coordinate={ {latitude: selectedLocation.lat, longitude: selectedLocation.lng} }
					/>
				)
			}
		</MapView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})
