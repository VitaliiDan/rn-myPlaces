import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AllPlaces, AddPlace, Map } from "./screens";
import { IconButton } from "./components/ui/IconButton";
import { Colors } from "./constants/colors";


const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<>
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
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
