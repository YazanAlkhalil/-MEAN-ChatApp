import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, } from '@angular/router';
import { DialogComponent } from '../../components/dialog/dialog.component';
import Parse from 'parse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , FormsModule , ReactiveFormsModule , DialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  isOpen: boolean = false

  constructor(private router:Router){
    this.loginForm = new FormGroup({
      username: new FormControl( '' , Validators.required ),
      password: new FormControl('' , Validators.required)
    })
  }

  onSubmit(){
      Parse.User.logIn(this.loginForm.value.username , this.loginForm.value.password).then((user) => {
        alert('Welcome To Home Page')
      }).catch((error) => {
        if(this.loginForm.invalid || error){
          this.isOpen = true
        }
      })
      this.isOpen = false
    // this.router.navigateByUrl('/home')
  }
  
}
