import React, { useEffect } from 'react';

function Map() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCzGbdlLF0jA7Gzurlh6eN2YtbGJjHEncI&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        window.initMap = function() {
            const location = { lat: 50.4501, lng: 30.5234 }; // Замініть на координати вашої компанії
            const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: location,
            });
            new window.google.maps.Marker({
                position: location,
                map: map,
            });
        };
    }, []);

    return (
        <div>
            <h2>Наше Місцезнаходження</h2>
            <div id="map" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
}

export default Map;
