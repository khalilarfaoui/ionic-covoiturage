import {Component, OnInit} from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";

import { Map, tileLayer, marker, icon } from "leaflet";
import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.page.html',
  styleUrls: ['./pickup-location.page.scss'],
})
export class PickupLocationPage implements OnInit {

  map!: Map;
  newMarker: any;
  address!: string;

  constructor(private geocoder: NativeGeocoder, private router: Router , private http : HttpClient) {}
  ngOnInit(): void {
    console.log('')
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([17.385, 78.4867], 13);

    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.map);
  }

  locatePosition() {
    this.map.locate({ setView: false }).on("locationfound", (e: any) => {
      console.log(e);
      this.map.setView([e.latitude, e.longitude], 18);
      const customIcon = icon({
        iconUrl: 'assets/marker-icon-2x.png', // Chemin vers votre icône
        iconSize: [25, 41], // Taille de l'icône
        iconAnchor: [12, 41], // Point d'ancrage de l'icône
        popupAnchor: [1, -34], // Point d'ancrage de la fenêtre pop-up
      });
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable: true,
        icon: customIcon
      }).addTo(this.map);
      this.newMarker.bindPopup("You are located here!").openPopup();
      this.getAddressFromCoordinates(e.latitude, e.longitude);
      // this.pickupLat = e.latitude;
      // this.pickupLong = e.longitude;
      this.newMarker.on("dragend", () => {
        const position = this.newMarker.getLatLng();
        console.log(position);

        this.getAddressFromCoordinates(position.lat, position.lng);
        // this.pickupLat = position.lat;
        // this.pickupLong = position.lng;
      });
    });
  }

  getAddress(lat: number, long: number) {
    // let options: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 5
    // };
    // this.geocoder.reverseGeocode(lat, long, options).then(results => {
    //   console.log(results);

    //   this.address = Object.values(results[0]).reverse();
    //   console.log(this.address);
    // });
  }

  getAddressFromCoordinates(lat: number, lng: number) {
    this.address = "........." ;
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    this.http.get(geocodeUrl).subscribe((data: any) => {
      if (data && data.display_name) {
        const address = data.display_name;
        this.address = address
        console.log('Address: ', address);
      } else {
        console.log('Geocoding failed');
      }
    });
  }

  confirmPickupLocation() {
    let navigationextras: NavigationExtras = {
      state: {
        pickupLocation: this.address
      }
    };
    this.router.navigate(["home"], navigationextras);
  }

  goBack() {
    this.router.navigate(["home"]);
  }

}
