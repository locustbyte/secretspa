import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
//import { MetaweatherService } from '../metaweather.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading = true;
  searchQuery = "";
  currLat;
  currLon;
  currCity = "Select Local City";
  cityData = {};
  searchCitiesSelect: any[] = [];
  localCityWoeId;
  localCityData;
  constructor(
    private geolocation: Geolocation,
    private http: HTTP
    //private metaweather: MetaweatherService
  ) {
    this.initializeApp();
  }

  // Usually would create a service for the next 3 funtions.
  searchCity(searchString){
    console.log(searchString)
    this.http.get('https://www.metaweather.com/api/location/search/?query='+searchString, {}, {})
      .then(data => {
        // JSON parse string data in response from server
        this.searchCitiesSelect = JSON.parse(data['data']);
      })
      .catch(error => {

        // Error handling
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  getLocalCities(lat, lon){
    this.http.get('https://www.metaweather.com/api/location/search/?lattlong='+lat+','+lon, {}, {})
      .then(data => {
        
        // JSON parse string data in response from server
        this.localCityData = JSON.parse(data['data']);

        // Load weather for initial city
        this.getWeather(this.localCityData[0].woeid)

      })
      .catch(error => {
        
        // Error handling
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }
  getWeather(woeId) {
    
    this.http.get('https://www.metaweather.com/api/location/'+woeId+'/', {}, {})
      .then(data => {

        // JSON parse string data in response from server
        this.cityData = JSON.parse(data['data']);
        this.currCity = this.cityData['title'];
        this.loading = false;


      })
      .catch(error => {
        // Error handling
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }


  onCitySelect( city ){
    this.loading = true;
    // Set title of select label
    this.currCity = city.title;

    // Empty search results & clear input
    this.searchCitiesSelect = [];
    this.searchQuery = "";

    // Pass city id to api call to update weather
    this.getWeather( city.woeid )
  }

  
  
  submitSearch(city) {

    // Call function to search for cities matching string
    this.searchCity(this.searchQuery);
  }
  initializeApp() {
    this.loading = true;
  // This will get the current position to be used for localised weather
  this.geolocation.getCurrentPosition().then((resp) => {
    this.currLat = resp.coords.latitude;
    this.currLon = resp.coords.longitude;
    // Set initial city based on nearest by Lat + Lon, populate select list and draw weather report
    this.getLocalCities(this.currLat, this.currLon);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    // Set a watch on the GeoLocation so that the weather reports true to users current location.
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.currLat = data.coords.latitude;
      this.currLon = data.coords.longitude;
      // We could add the below to update the Select City list when the Lat + Lon changes
      // this.getLocalCities(this.currLat, this.currLon);
    });
  }
}
