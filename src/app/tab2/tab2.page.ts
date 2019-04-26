import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  searchQuery = "";
  weatherLocation: any[] = [{"distance":15243,"title":"London","location_type":"City","woeid":44418,"latt_long":"51.506321,-0.12714"},{"distance":45304,"title":"Reading","location_type":"City","woeid":32997,"latt_long":"51.452381,-0.996030"},{"distance":46607,"title":"Luton","location_type":"City","woeid":27997,"latt_long":"51.894932,-0.428090"},{"distance":70347,"title":"Oxford","location_type":"City","woeid":31278,"latt_long":"51.756199,-1.259490"},{"distance":72981,"title":"Southend-on-Sea","location_type":"City","woeid":35375,"latt_long":"51.548328,0.706400"},{"distance":73681,"title":"Brighton","location_type":"City","woeid":13911,"latt_long":"50.828869,-0.134140"},{"distance":87001,"title":"Cambridge","location_type":"City","woeid":14979,"latt_long":"52.209702,0.111420"},{"distance":91193,"title":"Portsmouth","location_type":"City","woeid":32452,"latt_long":"50.804008,-1.087280"},{"distance":92927,"title":"Northampton","location_type":"City","woeid":30599,"latt_long":"52.244869,-0.886160"},{"distance":100154,"title":"Swindon","location_type":"City","woeid":36796,"latt_long":"51.570969,-1.784020"}];
  weatherData = {"consolidated_weather":[{"id":4815371263541248,"weather_state_name":"Heavy Cloud","weather_state_abbr":"hc","wind_direction_compass":"S","created":"2019-04-25T18:08:02.673925Z","applicable_date":"2019-04-25","min_temp":9.045000000000002,"max_temp":15.504999999999999,"the_temp":14.91,"wind_speed":7.131785787401576,"wind_direction":188.57802968710163,"air_pressure":999.8399999999999,"humidity":55,"visibility":11.634554203451842,"predictability":71},{"id":5711726207041536,"weather_state_name":"Light Rain","weather_state_abbr":"lr","wind_direction_compass":"SSW","created":"2019-04-25T18:08:02.667028Z","applicable_date":"2019-04-26","min_temp":8.795,"max_temp":15.65,"the_temp":15.675,"wind_speed":8.839037671258517,"wind_direction":209.16967397982302,"air_pressure":1009.495,"humidity":58,"visibility":10.796945836315913,"predictability":75},{"id":6573833953738752,"weather_state_name":"Heavy Rain","weather_state_abbr":"hr","wind_direction_compass":"W","created":"2019-04-25T18:08:03.673338Z","applicable_date":"2019-04-27","min_temp":7.539999999999999,"max_temp":10.895,"the_temp":10.615,"wind_speed":13.632234097168535,"wind_direction":268.6683322396841,"air_pressure":1006.085,"humidity":64,"visibility":8.83310218324982,"predictability":77},{"id":6487225502007296,"weather_state_name":"Showers","weather_state_abbr":"s","wind_direction_compass":"NNW","created":"2019-04-25T18:08:03.951917Z","applicable_date":"2019-04-28","min_temp":7.32,"max_temp":15.45,"the_temp":14.04,"wind_speed":8.087541154222011,"wind_direction":331.5799394831217,"air_pressure":1021.6600000000001,"humidity":57,"visibility":12.594262009862403,"predictability":73},{"id":6538362758365184,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"NE","created":"2019-04-25T18:08:03.757141Z","applicable_date":"2019-04-29","min_temp":7.57,"max_temp":16.655,"the_temp":15.615,"wind_speed":4.079517893377343,"wind_direction":54.67215408649343,"air_pressure":1025.375,"humidity":56,"visibility":12.197827189214983,"predictability":70},{"id":4744246605119488,"weather_state_name":"Heavy Cloud","weather_state_abbr":"hc","wind_direction_compass":"ENE","created":"2019-04-25T18:08:05.686232Z","applicable_date":"2019-04-30","min_temp":8.035,"max_temp":16.66,"the_temp":14.35,"wind_speed":5.242887536785175,"wind_direction":66.5,"air_pressure":1023.6,"humidity":62,"visibility":9.997862483098704,"predictability":71}],"time":"2019-04-25T21:06:41.322170+01:00","sun_rise":"2019-04-25T05:44:48.260264+01:00","sun_set":"2019-04-25T20:13:20.987377+01:00","timezone_name":"LMT","parent":{"title":"England","location_type":"Region / State / Province","woeid":24554868,"latt_long":"52.883560,-1.974060"},"sources":[{"title":"BBC","slug":"bbc","url":"http://www.bbc.co.uk/weather/","crawl_rate":180},{"title":"Forecast.io","slug":"forecast-io","url":"http://forecast.io/","crawl_rate":480},{"title":"HAMweather","slug":"hamweather","url":"http://www.hamweather.com/","crawl_rate":360},{"title":"Met Office","slug":"met-office","url":"http://www.metoffice.gov.uk/","crawl_rate":180},{"title":"OpenWeatherMap","slug":"openweathermap","url":"http://openweathermap.org/","crawl_rate":360},{"title":"Weather Underground","slug":"wunderground","url":"https://www.wunderground.com/?apiref=fc30dc3cd224e19b","crawl_rate":720},{"title":"World Weather Online","slug":"world-weather-online","url":"http://www.worldweatheronline.com/","crawl_rate":360},{"title":"Yahoo","slug":"yahoo","url":"http://weather.yahoo.com/","crawl_rate":180}],"title":"London","location_type":"City","woeid":44418,"latt_long":"51.506321,-0.12714","timezone":"Europe/London"};
  cityData = {};
  searchCitiesSelect: any[] = [];
  localCityWoeId;
  localCityData;
  constructor(
    private geolocation: Geolocation,
    private httpClient: HttpClient,
    private http: HTTP
  ) {
    this.initializeApp();
    
  }

  searchCity(searchString){
    console.log(searchString)
    this.http.get('https://www.metaweather.com/api/location/search/?query='+searchString, {}, {})
      .then(data => {
        console.log(data['data'])
        console.log(JSON.parse(data['data']))
        this.searchCitiesSelect = JSON.parse(data['data']);

        //console.log(this.localCityData);
        // console.log(data.data); // data received by server
        // console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  getLocalCities(){
    this.http.get('https://www.metaweather.com/api/location/search/?lattlong=51.4788478,-0.3429909', {}, {})
      .then(data => {
        console.log(data)
        this.localCityData = [{"distance":15243,"title":"London","location_type":"City","woeid":44418,"latt_long":"51.506321,-0.12714"},{"distance":45304,"title":"Reading","location_type":"City","woeid":32997,"latt_long":"51.452381,-0.996030"},{"distance":46607,"title":"Luton","location_type":"City","woeid":27997,"latt_long":"51.894932,-0.428090"},{"distance":70347,"title":"Oxford","location_type":"City","woeid":31278,"latt_long":"51.756199,-1.259490"},{"distance":72981,"title":"Southend-on-Sea","location_type":"City","woeid":35375,"latt_long":"51.548328,0.706400"},{"distance":73681,"title":"Brighton","location_type":"City","woeid":13911,"latt_long":"50.828869,-0.134140"},{"distance":87001,"title":"Cambridge","location_type":"City","woeid":14979,"latt_long":"52.209702,0.111420"},{"distance":91193,"title":"Portsmouth","location_type":"City","woeid":32452,"latt_long":"50.804008,-1.087280"},{"distance":92927,"title":"Northampton","location_type":"City","woeid":30599,"latt_long":"52.244869,-0.886160"},{"distance":100154,"title":"Swindon","location_type":"City","woeid":36796,"latt_long":"51.570969,-1.784020"}]

        console.log(this.localCityData);
        // console.log(data.data); // data received by server
        // console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }
  getWeather(woeId) {
    this.http.get('https://www.metaweather.com/api/location/'+woeId+'/', {}, {})
      .then(data => {
        console.log(JSON.parse(data['data']))
        this.cityData = JSON.parse(data['data']);

        console.log(this.cityData)

        // console.log(data.status);
        // console.log(data.data); // data received by server
        // console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
    // this.httpClient.get('https://www.metaweather.com/api/location/44418/').subscribe((res)=>{
    //     console.log(res);
    // });
  }


  onCitySelect(city){
    console.log(city)
    this.getWeather(city.woeid)
    // this.getCityWoeId(city);
  }
  
  submitSearch(city) {
    this.searchCity(this.searchQuery);
  }
  initializeApp() {
  //this.getWeather();
  this.getLocalCities();
  // This will get the current position to be used for localised weather
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
    console.log('tan')
    console.log(resp)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log("tan")
      console.log(data)
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    });
  }
}
