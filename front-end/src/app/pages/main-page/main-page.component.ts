import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ContactComponent } from "../../components/contact/contact.component";
import { ChatComponent } from "../../components/chat/chat.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SidebarComponent, ContactComponent, ChatComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
