import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})
export class PrivateLayoutComponent {

}
