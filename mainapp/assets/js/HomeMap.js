import * as L from "leaflet/src/Leaflet";

export default class IndexView {
    constructor($map_element) {
        this.leaflet = L.map($map_element.attr('id'));

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoidG9iaWFzaG9lc3NsIiwiYSI6ImNpeTMwdnFndTAwNDAzM21uaHpxYjZnNnEifQ.J_LAeL1849oRy4JK59X8cw', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoidG9iaWFzaG9lc3NsIiwiYSI6ImNpeTMwdnFndTAwNDAzM21uaHpxYjZnNnEifQ.J_LAeL1849oRy4JK59X8cw'
        }).addTo(this.leaflet);

        let initData = $map_element.data("map-data");

        let initCenter = L.latLng(35.658611, 139.745556); // If nothing else is said explicitly, we're probably talking about the Tokyo Tower
        let initZoom = 15;
        if (initData['center']) {
            initCenter = L.latLng(initData['center']['lat'], initData['center']['lng']);
        }
        if (initData['zoom']) {
            initZoom = initData['zoom'];
        }
        this.leaflet.setView(initCenter, initZoom);
        this.leaflet.setMinZoom(10);

        if (initData['limit']) {
            this.leaflet.setMaxBounds(L.latLngBounds(
                L.latLng(initData['limit']['min']['lat'], initData['limit']['min']['lng']),
                L.latLng(initData['limit']['max']['lat'], initData['limit']['max']['lng']),
            ));
        }
    }
}
