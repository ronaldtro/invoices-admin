import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SuccessAlert } from './utils/SuccessAlert';
import { DangerAlert } from './utils/DangerAlert';
import { WarningAlert } from './utils/WarningAlert';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';
import { WarningAlertComponent } from './components/warning-alert/warning-alert.component';
import { DangerAlertComponent } from './components/danger-alert/danger-alert.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SuccessAlertComponent, WarningAlertComponent,
    DangerAlertComponent, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  activeSuccessAlert: boolean;
  activeDangerAlert: boolean;
  activeWarningAlert: boolean;
  successAlertSubs: any;
  dangerAlertSubs: any;
  warningAlertSubs: any;

  constructor() {
    this.activeSuccessAlert = false;
    this.activeDangerAlert = false;
    this.activeWarningAlert = false;
  }

  ngOnInit(): void {
    this.successAlertSubs = SuccessAlert.getAlertSubject().subscribe(data => this.activeSuccessAlert = data.state);
    this.dangerAlertSubs = DangerAlert.getAlertSubject().subscribe(data => this.activeDangerAlert = data.state);
    this.warningAlertSubs = WarningAlert.getAlertSubject().subscribe(data => this.activeWarningAlert = data.state);
  }

  ngOnDestroy(): void {
    this.successAlertSubs.unsubscribe();
    this.dangerAlertSubs.unsubscribe();
    this.warningAlertSubs.unsubscribe();
  }

}
