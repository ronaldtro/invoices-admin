import { Component, OnDestroy, OnInit } from '@angular/core';
import { DangerAlert } from '../../utils/DangerAlert';

@Component({
  selector: 'DangerAlertComponent',
  standalone: true,
  imports: [],
  templateUrl: './danger-alert.component.html',
  styleUrl: './danger-alert.component.scss'
})
export class DangerAlertComponent implements OnInit, OnDestroy {
  
  data: any;
  dangerAlertSubs: any;

  constructor() {

  }

  ngOnInit(): void {

    this.dangerAlertSubs = DangerAlert.getAlertSubject().subscribe(resp => {
      this.data = resp;
    });

    setTimeout(() => {
      DangerAlert.setStateAlertSubject(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.dangerAlertSubs.unsubscribe();
  }

}
