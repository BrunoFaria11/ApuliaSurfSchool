import { Component } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../../core/models/email';
import { EmailService } from '../../../core/servies/email-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  showAlertSuccess = false;
  showAlertError = false;
  angContactForm!: FormGroup;
  btnClicked = false;

  constructor(
    public languageStoreService: LanguageStoreService,
    public emailServices: EmailService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  createForm() {
    this.angContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onClickSubmit(data: any) {
    this.btnClicked = true;
    if (this.angContactForm.status == "VALID") {

      const formData = this.angContactForm.value;

      let email = new Email(formData.email, formData.message, formData.name);

      this.emailServices.createEmail(email).subscribe((response: any) => {
        if (!response.succeeded) {
          this.showAlertError = true;
          this.clearForm();
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
      });
    }
  }

  clearForm() {
    this.btnClicked = false;
    this.angContactForm.reset();
  }
}
