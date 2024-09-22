import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule ,RouterLink],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  registerForm!: FormGroup;
  imageData!: string |  ArrayBuffer | null
  // person : string = '../../../images/person.jpg'
  inputType :string = ''
  constructor() {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      city: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log('data', this.registerForm.value);
  }

  
  handleFileInput(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.imageData = reader.result as string;
        console.log('image' , this.imageData);
      }
    };
    reader.readAsDataURL(file);
  }
  handleBlur(){
    this.inputType = 'text'
  }
  handleFocus(){
    this.inputType = 'date'
  }
  }

