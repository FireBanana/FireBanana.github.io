document.addEventListener('DOMContentLoaded', () => {

    const accessToken = 'pk.eyJ1IjoiYXZhZ2FudGFtbyIsImEiOiJjazloZXRiY2kweHltM21ub2J5OHEzbzNoIn0.JKTaxHqgGCYKL2gZ8-VI-A'
    const pricePerKm = 0.263
    mapboxgl.accessToken = accessToken

    new Vue({
        el: "#app",
        data: {
            isMap: false,
            fromInput: null,
            toInput: null,
            price: 0
        },
        watch: {
            isMap: function (val) {
                if (val) {
                    this.$nextTick(() => {

                        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.fromInput}.json?access_token=${accessToken}`)
                            .then((response) => {
                                let fromCoordinates = response.data.features[0].geometry.coordinates

                                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.toInput}.json?access_token=${accessToken}`)
                                    .then((response2) => {
                                        let toCoordinates = response2.data.features[0].geometry.coordinates

                                        let map = new mapboxgl.Map({
                                            container: 'map',
                                            style: 'mapbox://styles/mapbox/streets-v11'
                                        })

                                        let fromMarker = new mapboxgl.Marker()
                                            .setLngLat(fromCoordinates)
                                            .addTo(map)

                                        let toMarker = new mapboxgl.Marker()
                                            .setLngLat(toCoordinates)
                                            .addTo(map)

                                        map.on('load', () => {
                                            map.addSource('route', {
                                                type: 'geojson',
                                                data: {
                                                    type: 'Feature',
                                                    properties: {},
                                                    geometry: {
                                                        type: 'LineString',
                                                        coordinates: [
                                                            fromCoordinates,
                                                            toCoordinates
                                                        ]
                                                    }
                                                }
                                            })

                                            map.addLayer({
                                                id: 'route',
                                                type: 'line',
                                                source: 'route',
                                                layout: {
                                                    'line-join': 'round',
                                                    'line-cap': 'round'
                                                },
                                                paint: {
                                                    'line-color': '#888',
                                                    'line-width': 8
                                                }
                                            })

                                        })

                                        this.price = (pricePerKm * turf.length(turf.lineString([fromCoordinates, toCoordinates]))).toPrecision(4)
                                        map.fitBounds([fromCoordinates, toCoordinates], { padding: 50 })
                                    })
                                    .catch((error2) => {
                                        console.log(error2)
                                    })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                }
            },
        },
        methods: {
            openMap: function () {
                this.isMap = !this.isMap
            },
            estimatePrice: function () {
                if (this.toInput == null || this.fromInput == null)
                    return

                this.openMap()
            },
            openWhatsapp: function () {
                window.open('https://wa.me/923481717702?text=Im%20interested%20in%20your%20purchasing%20a%20ticket')
            }
        }
    })

})


