import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';

import { init } from "./utils/database";
import { AllPlaces, AddPlace, Map, PlaceDetails } from "./screens";
import { IconButton } from "./components/ui/IconButton";
import { Colors } from "./constants/colors";


const Stack = createNativeStackNavigator();
void SplashScreen.preventAutoHideAsync();

export default function App() {
	const [dbInitialized, setDbInitialized] = useState(false);

	useEffect(() => {
		(async () => {
			await init()
			setDbInitialized(true)
		})()
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (dbInitialized) {
			await SplashScreen.hideAsync();
		}
	}, [dbInitialized]);

	if (!dbInitialized) {
		return null
	}

	return (
		<View style={ {flex: 1} } onLayout={ onLayoutRootView }>
			<StatusBar style="dark"/>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={ {
						headerStyle: {
							backgroundColor: Colors.primary500,
						},
						headerTintColor: Colors.gray700,
						contentStyle: {
							backgroundColor: Colors.gray700,
						}
					} }
				>
					<Stack.Screen
						name="AllPlaces"
						component={ AllPlaces }
						options={ ({navigation}) => ({
							title: 'Your favorite places',
							headerRight: ({tintColor}) => (
								<IconButton
									icon="add"
									size={ 24 }
									color={ tintColor }
									onPress={ () => navigation.navigate("AddPlace") }
								/>
							),
						}) }
					/>
					<Stack.Screen
						name="AddPlace"
						component={ AddPlace }
						options={ {
							title: 'Add new place',
						} }
					/>
					<Stack.Screen
						name="Map"
						component={ Map }
					/>
					<Stack.Screen
						name='PlaceDetails'
						component={ PlaceDetails }
						options={{title: 'Loading Place...'}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}
