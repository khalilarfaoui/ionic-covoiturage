import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovoiturageService } from '../services/covoiturage.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  covoiturageForm: FormGroup;
  jours = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];
  hours: String[] = [];
  minutes: number[] = [];
  currentUser: any;
  pickupLocation: any;
  des = '';
  retour = '';
  constructor(
    private fb: FormBuilder,
    private covoiturageService: CovoiturageService,
    private alertController: AlertController,
    private userService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userService.getUser().subscribe((res) => {
      this.currentUser = res;
    });

    this.covoiturageForm = this.fb.group({
      allerAdresseDepart: [this.des, Validators.required],
      allerAdresseDestination: ['', Validators.required],
      allerHeure: ['', Validators.required],
      retourAdresseDepart: ['', Validators.required],
      retourAdresseDestination: ['', Validators.required],
      retourHeure: ['', Validators.required],
      jours: [[], Validators.required],
      places: ['', [Validators.required, Validators.min(1)]],
      prix: ['', [Validators.required, Validators.min(0)]],
      typeVehicule: ['', Validators.required],
      phone: ['', Validators.required],
      userId: [''],
    });

    this.route.queryParams.subscribe((params) => {
      this.retour = params['retour'];
      console.log('aaa', this.retour);
      if (this.retour) {
        this.covoiturageForm.patchValue({
          allerAdresseDestination: this.retour,
          retourAdresseDestination: this.retour,
        });
      }


    });
    this.route.queryParams.subscribe((params) => {
      this.des = params['des'];
      console.log('aaa', this.des);
      if (this.des) {
        this.covoiturageForm.patchValue({
          allerAdresseDepart: this.des,
          retourAdresseDepart: this.des,
        });
      }


    });
  }

  goToMapsDestination() {
    this.router.navigate(['tabs/tab2/pickup-location'], {
      queryParams: { position: 'destination' },
    });
  }

  goToMapsRetour() {
    this.router.navigate(['tabs/tab2/pickup-location'], {
      queryParams: { position: 'retour' },
    });
  }

  async onSubmit() {
    if (this.covoiturageForm.valid) {
      try {
        this.covoiturageForm.value.userId = this.currentUser.uid;
        await this.covoiturageService.createCovoiturage(
          this.covoiturageForm.value
        );
        await this.showAlert('Succès', 'Covoiturage créé avec succès');

        this.router.navigateByUrl('tabs/tab1')
      } catch (error) {
        console.error('Error creating covoiturage:', error);
      }
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit(): void {
    this.initializeTimeArrays();
  }

  initializeTimeArrays() {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`;
        this.hours.push(time);
      }
    }
  }

  goToMessage(){
    this.router.navigateByUrl('tabs/chat')
  }
}
