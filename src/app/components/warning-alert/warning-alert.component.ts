import { Component } from '@angular/core';
import { WarningAlert } from '../../utils/WarningAlert';

@Component({
  selector: 'WarningAlertComponent',
  standalone: true,
  imports: [],
  templateUrl: './warning-alert.component.html',
  styleUrl: './warning-alert.component.scss'
})
export class WarningAlertComponent {

  data: any;
  warningAlertSubs: any;

  constructor() {

  }

  ngOnInit(): void {

    this.warningAlertSubs = WarningAlert.getAlertSubject().subscribe(resp => {
      this.data = resp;
    });

    setTimeout(() => {
      WarningAlert.setStateAlertSubject(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.warningAlertSubs.unsubscribe();
  }

}
