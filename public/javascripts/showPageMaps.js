mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});


map.addControl(new mapboxgl.NavigationControl())


new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup (
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h5>${campground.title}</h5><p>${campground.location}</p>`
        )
    )
    .addTo(map)