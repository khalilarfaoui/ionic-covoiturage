import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovoiturageService } from '../services/covoiturage.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

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
  currentUser:any
  constructor(
    private fb: FormBuilder,
    private covoiturageService: CovoiturageService,
    private alertController: AlertController,
    private userService : AuthService
  ) {
    this.userService.getUser().subscribe(res=>{
      this.currentUser = res
    })

    this.covoiturageForm = this.fb.group({
      allerAdresseDepart: ['', Validators.required],
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
      userId : ['']

    });
  }

  async onSubmit() {
    if (this.covoiturageForm.valid) {
      try {
        this.covoiturageForm.value.userId = this.currentUser.uid
        await this.covoiturageService.createCovoiturage(
          this.covoiturageForm.value
        );
        await this.showAlert('Succès', 'Covoiturage créé avec succès');
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
}
