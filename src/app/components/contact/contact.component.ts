import { Component } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailServices } from '../../../core/servies/email-services';
import { Email } from '../../../core/models/email';
import { environment } from '../../../environments/environment';
import { EmailType } from '../../../core/enum/email-type';

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
    public emailServices: EmailServices,
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
      this.emailServices.getEmailTemplate(EmailType.Contact).subscribe((response: any) => {
        const model = this.angContactForm.value;

        var temp = response.data.template.replace('[NAME]',model.name);
        temp = temp.replace('[FROM]',model.email);
        temp = temp.replace('[MESSAGE]',model.message);

        let email = new Email(environment.fromEmail, environment.toEmail, temp, EmailType.Contact);
        
        this.emailServices.addEmail(email).subscribe((response: any) => {
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
        })
      });
    }
  }

  clearForm() {
    this.btnClicked = false;
    this.angContactForm.reset();
  }
}
