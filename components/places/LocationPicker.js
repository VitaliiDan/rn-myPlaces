import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { OutlineButton } from "../ui/OutlineButton";
import { getAddress, getMapPreview } from "../../utils/location";
import { Colors } from "../../constants/colors";

export const LocationPicker = ({onPickLocation}) => {
	const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
	const [pickedLocation, setPickedLocation] = useState(null);
	const isFocused = useIsFocused();

	const navigation = useNavigation();
	const route = useRoute();

	useEffect(() => {
		if (isFocused && route.params) {
			setPickedLocation({
				lat: route.params.pickedLat, lng: route.params.pickedLng
			})
		}
	}, [route, isFocused])

	useEffect(() => {
		(async () => {
			if (pickedLocation) {
				const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
				onPickLocation({...pickedLocation, address})
			}
		})()
	}, [pickedLocation, onPickLocation])

	const verifyPermissions = async () => {
		if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission()

			return permissionResponse.granted
		}

		if (locationPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.')
			return false
		}

		return true
	}

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const location = await getCurrentPositionAsync()
		setPickedLocation({lat: location.coords.latitude, lng: location.coords.longitude});
	}
	const pickOnMapHandler = () => navigation.navigate('Map')

	let locationPreview = <Text>No location chosen yet.</Text>

	if (pickedLocation) {
		locationPreview = (<Image
			source={ {uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)} }
			style={ styles.image }
		/>)
	}

	return (
		<View>
			<View style={ styles.mapPreview }>
				{ locationPreview }
			</View>
			<View style={ styles.actions }>
				<OutlineButton
					icon='location'
					onPress={ getLocationHandler }
				>
					Locate User
				</OutlineButton>
				<OutlineButton
					icon='map'
					onPress={ pickOnMapHandler }
				>
					Pick on Map
				</OutlineButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		overflow: 'hidden',
	}, actions: {
		flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
	}, image: {
		width: '100%', height: '100%',
	}
})