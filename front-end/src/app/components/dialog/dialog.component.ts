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

  @Input() isOpen!: boolean;
  @Input() onClose :boolean = this.handleClose()
  

  constructor( private router:Router ){}
  
    handleClose(){
    return  this.isOpen = false
    }
}
