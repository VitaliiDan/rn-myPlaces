// import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
// const googleMapApi = GOOGLE_MAPS_API_KEY;

const googleMapApi = 'AIzaSyDjf0vxZBUtW30wIiG_Xl2ut8QwVMa--6w';
export const getMapPreview = (lat, lng) => `https://maps.googleapis.com/maps/api/staticmap?center=${ lat },${ lng }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${ lat },${ lng }&key=${googleMapApi}`

export const getAddress = async (lat, lng) => {
	const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ lat },${ lng }&key=${googleMapApi}`)

	if (!response.ok) {
		throw new Error('Failed to fetch address.')
	}

	const data = await response.json();

	return data.results[0].formatted_address;
}
