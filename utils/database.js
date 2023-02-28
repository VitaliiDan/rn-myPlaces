import * as SQLite from 'expo-sqlite';
import { Place } from "../models/place";

const database = SQLite.openDatabase('places.db');

export const init = () => new Promise((resolve, reject) => {
	database.transaction(tx => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS places (
				id INTEGER PRIMARY KEY NOT NULL,
				title TEXT NOT NULL,
				imageUri TEXT NOT NULL,
				address TEXT NOT NULL,
				lat REAL NOT NULL,
				lng REAL NOT NULL
			)`,
			[],
			() => resolve(),
			(_, error) => reject(error)
		);
	})
});

export const insertPlace = (place) => new Promise((resolve, reject) => {
	const {title, imageUri, address, location: {lat, lng}} = place;
	database.transaction(tx => {
		tx.executeSql(
			`
				INSERT INTO places ( title, imageUri, address, lat, lng)
				 VALUES (?, ?, ?, ?, ?)
				 `,
			[title, imageUri, address, lat, lng],
			(_, result) => {
				resolve(result);
			},
			(_, error) => reject(error)
		)
	})
});

export const fetchPlaces = () => new Promise((resolve, reject) => {
	database.transaction(tx => {
		tx.executeSql(
			`
				SELECT * FROM places
			`,
			[],
			(_, result) => {
				const places = result.rows._array.map(el =>
					new Place(
						el.title,
						el.imageUri,
						{
							address: el.address,
							lat: el.lat,
							lng: el.lng
						},
						el.id)
				);
				resolve(places);
			},
			(_, error) => reject(error)
		)
	})
});

export const fetchPlaceDetail = (id) => new Promise((resolve, reject) => {
	database.transaction(tx => {
		tx.executeSql(
			'SELECT * FROM places WHERE id = ?',
			[id],
			(_, result) => {
				const place = result.rows._array[0];
				resolve(new Place(
					place.title,
					place.imageUri,
					{
						address: place.address,
						lat: place.lat,
						lng: place.lng
					},
					place.id
				))
			},
			(_, error) => reject(error)

		)
	})
})