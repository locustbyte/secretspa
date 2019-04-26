import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class MetaweatherService {

  constructor(
    private http: HTTP
  ) {

  }

  public searchCity(searchString){
    console.log(searchString)
    this.http.get('https://www.metaweather.com/api/location/search/?query='+searchString, {}, {})
      .then(data => {
        // JSON parse string data in response from server
        this.searchCitiesSelect = JSON.parse(data['data']);
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

  public getLocalCities(lat, lon){
    this.http.get('https://www.metaweather.com/api/location/search/?lattlong='+lat+','+lon, {}, {})
      .then(data => {
        
        // JSON parse string data in response from server
        this.localCityData = JSON.parse(data['data']);

        // Load weather for initial city
        this.getWeather(this.localCityData[0].woeid)

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }
  public getWeather(woeId) {
    
    this.http.get('https://www.metaweather.com/api/location/'+woeId+'/', {}, {})
      .then(data => {

        // JSON parse string data in response from server
        this.cityData = JSON.parse(data['data']);
        this.currCity = this.cityData['title'];


      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
  }

}
