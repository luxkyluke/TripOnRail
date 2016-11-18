function getJSON(url){
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

function initMap(){
  if(document.getElementById('destinations_map') != undefined){

    var mapStyle = getJSON("scripts/json/map_style.json");

    var styledMap = new google.maps.StyledMapType(mapStyle,{name: "Styled Map"});

    var mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(25.574946, -25.914465),
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      //scaleControl: false,
      mapTypeControl : false, 
      streetViewControl: false, 
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };

    var points = getJSON('scripts/json/map_locations.json');

    var map = new google.maps.Map(document.getElementById('destinations_map')
      , mapOptions);

    map.setOptions({styles: styledMap});

    var marker, pos;
    points.forEach(function(point) {
      pos = {lat:parseFloat(point.latitude), lng: parseFloat(point.longitude)};
      marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: 'img/logos/location_marker.png'
        }
      );
    });

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
  }
}
