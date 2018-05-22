import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-report-link',
  templateUrl: './report-link.component.html',
  styleUrls: ['./report-link.component.scss']
})
export class ReportLinkComponent implements OnInit {
  @Input() report;
  downloadUrl: Observable<string>;

  constructor() { }

  ngOnInit() {
    const reportRef = firebase.storage().ref(`reports/${this.report.id}.csv`);
    const promise = reportRef.getDownloadURL();

    this.downloadUrl = Observable.fromPromise(promise);
  }

}
