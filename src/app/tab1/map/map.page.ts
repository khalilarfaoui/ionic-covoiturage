import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, tileLayer, marker } from "leaflet";
import {NativeGeocoder,NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  pickupLocation: any ;

  constructor(private router:Router,private route:ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.extras.state) {
        this.pickupLocation = currentNavigation.extras.state['pickupLocation'];
      }
    });
  }
  ngOnInit(): void {
    console.log('hello')
  }


  onpickupClick(){
    this.router.navigateByUrl('tabs/tab1/pickup-location');
  }

}
