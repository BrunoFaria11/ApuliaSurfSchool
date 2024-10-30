import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import data from '../../../environments/phoneindicators.json';
import { Reservation } from '../../../core/models/reservation';
import { Pack } from '../../../core/models/pack';
import { ReservationService } from '../../../core/servies/reservation-service';
import { ClientService } from '../../../core/servies/client-service';
import { PackService } from '../../../core/servies/pack-service';
import { LanguageStoreService } from '../../../core/stores/language-store.service';
import { Client } from '../../../core/models/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  minDate: string = this.formatDate(new Date());
  angForm!: FormGroup;
  isButtonClicked = false;
  timeOfDay = 'morning';
  showAlertSuccess = false;
  showAlertError = false;
  isCollapsed = false;
  listPhoneIndicators: any = data;

  constructor(
    public languageStoreService: LanguageStoreService,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private packService: PackService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void { }

  initializeForm() {
    this.angForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[- +()0-9]+$'), Validators.minLength(5)]],
      phoneIndicator: ['+351', Validators.required],
      hour: ['morning'],
      classDate: ['', Validators.required],
      type: ['', Validators.required],
      comments: [''],
    });
  }

  onSubmitForm() {
    this.isButtonClicked = true;
    if (this.angForm.valid) {
      const formData = this.angForm.value;
      const selectedType = formData.type;
      formData.phone = formData.phoneIndicator + formData.phone;

      const client = new Client(formData.name, formData.email, formData.phone);
      this.clientService.createClient(client).subscribe({
        next: (response: any) => {
          if (response.succeeded) {
            this.handleReservationOrPack(response.data.uuid, formData, selectedType);
          } else {
            this.handleError();
          }
        },
        error: () => this.handleError(),
      });
    }
  }

  convertJSON(data: any) {
    return JSON.stringify(data);
  }

  handleReservationOrPack(clientId: string, formData: any, selectedType: any) {
    if (!JSON.parse(selectedType).isPack) {
      const reservation = new Reservation(clientId, formData.classDate, JSON.parse(selectedType).type, this.timeOfDay, formData.comments);
      this.createReservation(reservation);
    } else {
      const pack = new Pack(clientId, JSON.parse(selectedType).max, formData.classDate, JSON.parse(selectedType).type, this.timeOfDay, formData.comments);
      this.createPack(pack);
    }
  }

  createReservation(reservation: Reservation) {
    this.reservationService.createReservation(reservation).subscribe({
      next: (response: any) => response.succeeded ? this.handleSuccess() : this.handleError(),
      error: () => this.handleError(),
    });
  }

  createPack(pack: Pack) {
    this.packService.createPack(pack).subscribe({
      next: (response: any) => response.succeeded ? this.handleSuccess() : this.handleError(),
      error: () => this.handleError(),
    });
  }

  handleSuccess() {
    this.showAlertSuccess = true;
    this.resetForm();
    this.hideAlertAfterDelay('success');
  }

  handleError() {
    this.showAlertError = true;
    this.resetForm();
    this.hideAlertAfterDelay('error');
  }

  resetForm() {
    this.isButtonClicked = false;
    document.getElementById("closeModal")?.click();
    this.angForm.reset();
  }

  hideAlertAfterDelay(alertType: 'success' | 'error') {
    const delay = 6000;
    setTimeout(() => {
      this[alertType === 'success' ? 'showAlertSuccess' : 'showAlertError'] = false;
    }, delay);
  }

  changeTime(event: any) {
    this.timeOfDay = event.target.value;
  }

  formatDate(date: Date): string {
    return [date.getFullYear(), this.padTo2Digits(date.getMonth() + 1), this.padTo2Digits(date.getDate() + 1)].join('-');
  }

  padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
