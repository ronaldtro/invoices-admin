import { Component } from '@angular/core';
import { SuccessAlert } from '../../utils/SuccessAlert';

@Component({
  selector: 'SuccessAlertComponent',
  standalone: true,
  imports: [],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.scss'
})
export class SuccessAlertComponent {

  data: any;
  successAlertSubs: any;

  constructor() {

  }

  ngOnInit(): void {

    this.successAlertSubs = SuccessAlert.getAlertSubject().subscribe(resp => {
      this.data = resp;
    });

    setTimeout(() => {
      SuccessAlert.setStateAlertSubject(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.successAlertSubs.unsubscribe();
  }

}
