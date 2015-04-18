$(function () {

    //var maps_api_key = 'AIzaSyC0nLSgkJSbyx5wjngW3BLvviSTwjUbNRk';
    //
    var geocoder;
    var map;
    var infowindow = new google.maps.InfoWindow();
    var marker;

    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(40.730885, -73.997383);
        var mapOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: 'roadmap'
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    function codeLatLng(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $('#loading_location').hide();
                address = results[0].formatted_address;
                $('#location').show();
                $('#id_location').val(address);
                ////alert(results[0].formatted_address);
                ////console.log(results, status);
                ////if (results[1]) {
                ////    map.setZoom(11);
                ////    marker = new google.maps.Marker({
                ////        position: latlng,
                ////        map: map
                ////    });
                ////    infowindow.setContent(results[1].formatted_address);
                ////    infowindow.open(map, marker);
                //} else {
                //    alert('No results found');
                //}
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getAddress);
            $('#loading_location').show();
        } else {
            $('#location').html("Geolocation is not supported by this browser.");
        }
    }

    function getAddress(position){
        codeLatLng(position);
    }

    $('#number_submit').on('click', function(){
        var val = $('#id_mwh').val();
        console.log(val);

        $('#watt_hours').html(val);
        $(this).parent().parent().hide();
        $('#status').show();

        // update status
        setTimeout(function () {
            $('#status').hide();
            $('#score').show();

            setTimeout(function () {
                $('#whats_next').fadeIn();

            }, 1000)
        }, 1500);

        return false;
    });

    $('#evaluate').on('click', function(){
        getLocation();
        return false;
    });

    $('#check_now').on('click', function(){
        $(this).parent().hide();
        $('#savings').show();
    });

});