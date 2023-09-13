import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.registerForm = this._formBuilder.group({
      UserId: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      SentMessages: ['', [Validators.required]],
      ReceivedMessages: ['', [Validators.required]],
      AccessKey: ['', [Validators.required]],
    });
  }
}
