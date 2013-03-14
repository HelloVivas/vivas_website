/****************
 * Include google api in your html file.
 * <script type="text/javascript" src="https://www.google.com/jsapi?key=AIzaSyCGMWvWY2-M7gNlUog1_obd1CdcZOJwQhQ"></script>
 * <script type="text/javascript" src="/js/visitor_location.js"></script>
 * <script type="text/javascript">
 *   get_visitor_location(function(value){
 *     //alert(value);
 *     document.getElementById('mce-LOCATION').value = value;
 *   });
 * </script>
 ****************/

var visitor_location = null;
var success_proc;

function success(position) {
  visitor_location = position.coords.latitude + ',' + position.coords.longitude;
  //alert('html5: ' + visitor_location);
  success_proc(visitor_location);
}

function error(msg) {
  //alert('html5: ' + msg);
}
function visitor_location_html5() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    //alert('html5: not supported');
  }
}
function visitor_location_google() {
  if(google.loader.ClientLocation)
  {
    visitor_lat = google.loader.ClientLocation.latitude;
    visitor_lon = google.loader.ClientLocation.longitude;
    visitor_city = google.loader.ClientLocation.address.city;
    visitor_region = google.loader.ClientLocation.address.region;
    visitor_country = google.loader.ClientLocation.address.country;
    visitor_countrycode = google.loader.ClientLocation.address.country_code;
    visitor_location = visitor_country + ' ' + visitor_city + ' ' + visitor_lat + ',' + visitor_lon;
    //alert('google api: ' + visitor_location);
    success_proc(visitor_location);
  }
  else
  {
    //alert(false);
  }
}

function get_visitor_location(proc) {
  success_proc = proc;
  visitor_location_google();
  if (visitor_location == null) {
    visitor_location_html5();
  }
}
