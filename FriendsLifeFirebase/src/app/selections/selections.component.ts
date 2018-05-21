import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../services/selection/selection.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SelectionModel, AvailabilityDisplayModel, AvailabilityDisplayObject } from '../services/selection/selection.models';
import { DocumentSnapshot } from '@firebase/firestore-types';
import * as _ from 'underscore';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  public selectionId: string;
  public selection: SelectionModel;
  public availability: AvailabilityDisplayModel[] = AvailabilityDisplayObject;

  constructor(
    private ss: SelectionService
  ) {
    this.selectionId = localStorage.getItem('selectionId');
  }

  ngOnInit() {
    this.ss.getSelection(this.selectionId).subscribe((payload: DocumentSnapshot) => {
      this.selection = new SelectionModel();
      this.selection = payload.data() as SelectionModel;
    });

    this.ss.getAvailabilities(this.selectionId).subscribe((data) => {
      for (let av of data) {
        let item = _.find(this.availability, (i: AvailabilityDisplayModel) => {
          return i.DayName === av.day && i.TimeValue === av.time;
        });

        if (item) {
          item.itemId = av.id;
        }
      }
    });
  }
}
