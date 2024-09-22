import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { InfoComponent } from './pages/info/info.component';
import { BackendServiceService } from './services/backend-service.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NgFor , InfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Signal';
  constructor(private backendService: BackendServiceService){}
  

}
