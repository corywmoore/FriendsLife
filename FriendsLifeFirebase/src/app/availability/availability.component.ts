import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { SelectionService } from '../services/selection/selection.service';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { SelectionModel, AvailabilityModel, AvailabilityDisplayModel, AvailabilityDisplayObject } from '../services/selection/selection.models';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {

  public availability: AvailabilityDisplayModel[] = JSON.parse(JSON.stringify(AvailabilityDisplayObject));
  public warning = false;
  public selection: SelectionModel;
  public selectionId;

  constructor(
    private renderer: Renderer,
    private router: Router,
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

        if(item) {
          item.itemId = av.id;
        }
      }
    });
  }

  public dateTimeClicked(id: string, index: number) {
    let item = this.availability[index];
    if (id) {
      this.ss.deleteAvailability(this.selectionId, id)
        .then(() => {
          item.itemId = '';
        });
    } else {
      const av = new AvailabilityModel();
      av.day = item.DayName;
      av.time = item.TimeValue;
      this.ss.addAvailability(this.selectionId, av)
        .then((id) => {
          this.availability[index].itemId = id;
        });
    }
  }

  public validateAndRoute() {
    if (this.availability.length < 1) {
      this.warning = true;
    } else {
      this.router.navigate(['categories']);
    }
  }
}

