import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import Parse from 'parse';
import { DialogComponent } from '../../components/dialog/dialog.component';
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    DialogComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  registerForm!: FormGroup;
  // imageData!: string |  ArrayBuffer | null
  inputType: string = '';
  image: any;
  error!: string;
  isOpen: boolean = false
  constructor(
    private cd:ChangeDetectorRef
  ) {
    this.registerForm = new FormGroup({
      imageData: new FormControl(''),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      birthDate: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
    });
  }
  ngOnInit() {
    console.log('any thing!');
  }
  onSubmit() {
    console.log('data', this.registerForm.value);
    Parse.User.logOut()
    const user = new Parse.User();
    user.set('username', this.registerForm.value.fullName);
    user.set('password', this.registerForm.value.password);
    user.set('email', this.registerForm.value.email);
    user.set('birthDate', this.registerForm.value.birthDate);
    user.set('city', this.registerForm.value.city);
    user.set('area', this.registerForm.value.area);
    user.set('img', this.image);
    user
      .signUp()
      .then((user) => console.log(user, 'user'))
      .catch((error:Error) => {
        this.error = error.message
        console.log(error , 'parse_error');
        if(this.registerForm.invalid || error){
          
          this.isOpen = true;
          console.log(this.isOpen, 'isOpen');
          this.cd.markForCheck()
        }
      });
  }
  closeDialog() {
    this.isOpen = false;
    this.cd.markForCheck();
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
        this.registerForm.value.imageData = reader.result as string;
        this.image = this.registerForm.value.imageData;
        console.log(this.image, 'image');
      }
    };
    reader.readAsDataURL(file);
  }
  handleBlur() {
    this.inputType = 'text';
  }
  handleFocus() {
    this.inputType = 'date';
  }
}
