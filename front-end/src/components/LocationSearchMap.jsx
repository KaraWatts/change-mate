import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoiY3J5c3RhbGpvYmUiLCJhIjoiY2x2Y3VkMzFxMG13ZzJrcGY5dDB0bGJvYyJ9.PV_ZgI2EhyhNfcRHmp2OPw";

export default function LocationSearchMap({
	setAddress,
	setCoords,
}) {
	const mapContainer = useRef(null);
	const map = useRef(null);
	//set default lat/lng once user renders page geocoder should retrieve user IP location
	const [lng, setLng] = useState(-72.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(11);
	//setting the location's coordinates and address string
	useEffect(() => {
		// initialize map only once
		if (map.current) return;
		//geolocator to retrieve user lat/lng for setting use state
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				map.current = new mapboxgl.Map({
					container: mapContainer.current,
					// mapbox style
					style: "mapbox://styles/mapbox/streets-v12",
					// center map styling
					center: [position.coords.longitude, position.coords.latitude],
					// use zoom usestate
					zoom: zoom,
				});
				//recenter map based on user moving it
				map.current.on("move", () => {
					setLng(map.current.getCenter().lng.toFixed(4));
					setLat(map.current.getCenter().lat.toFixed(4));
					setZoom(map.current.getZoom().toFixed(2));
				});
				//geocoder for searching address or location
				// Initialize the geocoder pass object of options
				const geocoder = new MapboxGeocoder({
					// Set the access token
					accessToken: mapboxgl.accessToken,
					// Set the mapbox-gl instance
					mapboxgl: mapboxgl,
					//set marker on user location search
					marker: true,
					// Placeholder text for the search bar
					placeholder: "Search location",
					//sort search based on user location
					proximity: {
						longitude: lng,
						latitude: lat,
					},
					// search parameters:
					countries: "us",
					language: "en",
					autocomplete: false,
					// limit search to address, street, and secondary address for full addresses
					type: "address, street, secondary_address, region",
					//limit to 6 search results in drop down
					limit: 3,
				});
				// Add the geocoder to the map
				map.current.addControl(geocoder);
				// Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
				//  Add a marker at the result's coordinates
				geocoder.on("result", (event) => {
					const data = event.result;
					// console.log(data)
					setAddress(data.place_name);
					setCoords(data.geometry.coordinates);

				});
			});
		} else {
			console.log("error retrieving location data");
		}
	}, []);

	return (
		<>
			{/* map container */}
			<div ref={mapContainer} className="location-search-map-container"></div>
		</>
	);
}


					// const contextArr = data.context;
					// let city = "";
					// let state = "";
					// contextArr.map((context) => {
					// 	if (context.id.startsWith("place")) {
					// 		city = context.text_en;
					// 	} else if (context.id.startsWith("district")) {
					// 		city = context.text_en;
					// 	} else if (context.id.startsWith("region")) {
					// 		state = context.text_en;
					// 	}
					// });

					// // Formats the data used for location into an object
					// const generalLocation = `${city}, ${state}`;