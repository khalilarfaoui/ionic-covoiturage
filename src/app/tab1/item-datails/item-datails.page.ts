import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { CovoiturageService } from 'src/app/services/covoiturage.service';
@Component({
  selector: 'app-item-datails',
  templateUrl: './item-datails.page.html',
  styleUrls: ['./item-datails.page.scss'],
})
export class ItemDatailsPage implements OnInit {
  item: any;
  item2: any;
  id = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private covoitureService: CovoiturageService,
    private http: HttpClient
  ) {
    this.id = this.route.snapshot.params['id'];
    console.warn(this.id);
  }
  ngOnInit() {
    console.log('res');
  }

  ionViewDidEnter() {
    this.initMap();
  }

  private initMap(): void {
    this.covoitureService.getCovoiturageById(this.id).subscribe((res) => {
      console.log(res);
      this.item = res;
      this.http
        .get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            this.item.allerAdresseDepart
          )}`
        )
        .subscribe((result: any) => {
          console.log('result', result);
          const map = L.map('map').setView([result[0].lat, result[0].lon], 13);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          }).addTo(map);
          const customIcon = L.icon({
            iconUrl: 'assets/marker-icon-2x.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          const marker = L.marker([result[0].lat, result[0].lon], {
            icon: customIcon,
          }).addTo(map);

          marker.bindPopup(`<b>Addresse de Départ</b>`).openPopup();

          this.http
            .get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                this.item.allerAdresseDestination
              )}`
            )
            .subscribe((result2: any) => {
              console.log('result2', result2);
              const marker2 = L.marker([result2[0].lat, result2[0].lon], {
                icon: customIcon,
              }).addTo(map);

              marker2.bindPopup(`<b>Addresse de destination</b>`).openPopup();
            });
        });
    });
  }

  goBack() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  contacter(id:any){
    const url = 'tabs/chat/box/'+id
    this.router.navigateByUrl(url)
  }
}
