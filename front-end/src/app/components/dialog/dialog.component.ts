import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {


  @Input() isLogin!: boolean;
  @Input() isOpen!: boolean;
  @Input() onClose :boolean = this.handleClose()
  @Input() children !:string
  

  constructor( private router:Router ){}


  navigateToInfo() {
    this.router.navigate(['/info']);
  }
  
    handleClose(){
    return  this.isOpen = !this.isOpen
    }
}
