import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
@Component({
  selector: 'app-item-datails',
  templateUrl: './item-datails.page.html',
  styleUrls: ['./item-datails.page.scss'],
})
export class ItemDatailsPage implements OnInit {
  item = {
    image: 'assets/230112104532-02-1990s-cars-collectible.png',
    address: '456 Elm St, City',
    time: '3:45 PM',
    phone: '+123 456 7890',
  };
  constructor(
    private router : Router
  ) {}
  ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  }

  goBack() {
    this.router.navigateByUrl('/tabs/tab1');
  }
}
