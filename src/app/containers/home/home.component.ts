import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Reservation } from '../../../core/models/reservation';
import { Client } from '../../../core/models/client';
import { ReservationServices } from '../../../core/servies/reservation-services';
import { Pack } from '../../../core/models/pack';
import { DOCUMENT } from '@angular/common';
import { EmailType } from '../../../core/enum/email-type';
import { EmailServices } from '../../../core/servies/email-services';
import { Email } from '../../../core/models/email';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  minDate: string = this.formatDate(new Date());
  angForm!: FormGroup;
  btnClicked = false;
  time = 'morning';
  showAlertSuccess = false;
  showAlertError = false;
  isCollapsed: boolean = false;

  constructor(
    public languageStoreService: LanguageStoreService,
    public reservationServices: ReservationServices,
    public emailServices: EmailServices,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit(): void { }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
          Validators.minLength(5),
        ],
      ],
      hour: ['morning'],
      classDate: ['', Validators.required],
      type: ['', Validators.required],
      // password: ['', [this.customValidatorFn(),this.customValidatorPasswordFn(), Validators.pattern('/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/')]],
      // confirmpassword: ['', [this.customValidatorFn(),this.customValidatorPasswordFn(), Validators.pattern('/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/')]],
      comments: [''],
    });
  }

  // private customValidatorFn(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     debugger
  //     return this.isCollapsed && (control.value == null  || control.value  || undefined || control.value == '' )? { require: true } : null;
  //   };
  // }

  // private customValidatorPasswordFn(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if(this.angForm != null)
  //     {
  //       const model = this.angForm.value;
  //       return model.password == model.confirmpassword ? null : { Error: 'Must be equal' };
  //     }
  //     else{
  //       return null;
  //     } 
  //   };
  // }

  onClickSubmit(data: any) {
    this.btnClicked = true;
    if (this.angForm.status == "VALID") {
      const model = this.angForm.value;
      const _type = JSON.parse(model.type);
      let reservation = new Reservation(model.classDate, _type.type, this.time, model.comments);
      let client = new Client(model.name, model.email, model.phone);
      if (!_type.isPack) {
        this.reservationServices.addReservation(reservation, client).subscribe((response: any) => {
          if (!response.succeeded) {
            this.showAlertError = true;
            this.clearForm();

            this.emailServices.getEmailTemplate(EmailType.Reservations).subscribe((response: any) => {
              var temp = response.data.template.replace('[NAME]', model.name);
              temp = temp.replace('[EMAIL]', model.email);
              temp = temp.replace('[PHONE]', model.phone);
              temp = temp.replace('[DATE]', model.classDate);
              temp = temp.replace('[TYPE]', _type.type);
              temp = temp.replace('[TIME]', model.hour);
              temp = temp.replace('[COMMENTS]', model.comments);

              let email = new Email(environment.fromEmail, environment.toEmail, temp, EmailType.Contact);

              this.emailServices.addEmail(email);

            })

            setTimeout(() => {
              this.showAlertError = false;
            }, 5000);
          }
          if (response.succeeded) {
            this.showAlertSuccess = true;
            this.clearForm();
            setTimeout(() => {
              this.showAlertSuccess = false;
            }, 3000);
          }
        })
      }
      else {
        let pack = new Pack(1, _type.type);
        this.reservationServices.addPack(pack, reservation, client).subscribe((response: any) => {
          if (!response.succeeded) {
            this.showAlertError = true;
            this.clearForm();

            this.emailServices.getEmailTemplate(EmailType.Reservations).subscribe((response: any) => {
                var temp = response.data.template.replace('[NAME]', model.name);
              temp = temp.replace('[EMAIL]', model.email);
              temp = temp.replace('[PHONE]', model.phone);
              temp = temp.replace('[DATE]', model.classDate);
              temp = temp.replace('[TYPE]', _type.type);
              temp = temp.replace('[TIME]', model.hour);
              temp = temp.replace('[COMMENTS]', model.comments);

              let email = new Email(environment.fromEmail, environment.toEmail, temp, EmailType.Contact);

              this.emailServices.addEmail(email);
            })

            setTimeout(() => {
              this.showAlertError = false;
            }, 5000);

          }
          if (response.succeeded) {
            this.showAlertSuccess = true;
            this.clearForm();
            setTimeout(() => {
              this.showAlertSuccess = false;
            }, 3000);
          }
        })
      }
    };
  }

  clearForm() {
    this.btnClicked = false;
    (<HTMLInputElement>document.getElementById("closeModal")).click();
    this.angForm.reset();
  }

  changeTime(e: any) {
    this.time = e.target.value;
  }

  convertJSON(data: any) {
    return JSON.stringify(data);
  }

  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate() + 1),
    ].join('-');
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
