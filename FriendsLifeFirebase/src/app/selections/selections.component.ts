import { Component, OnInit } from '@angular/core';
import { SelectionService } from '../services/selection/selection.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SelectionModel, AvailabilityDisplayModel, AvailabilityDisplayObject } from '../services/selection/selection.models';
import { DocumentSnapshot } from '@firebase/firestore-types';
import * as _ from 'underscore';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  public selectionId: string;
  public selection: SelectionModel;
  public selectedCategories;
  public availability: AvailabilityDisplayModel[] = AvailabilityDisplayObject;

  constructor(
    private ss: SelectionService,
    private categoryService: CategoryService
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

    this.categoryService.getSelectedCategories(this.selectionId).subscribe((data) => {
      this.selectedCategories = this.filterCategories(JSON.parse(JSON.stringify(data[0])));
      console.log(this.selectedCategories);
    });
  }

  private filterCategories(data) {
    let fCats = [];

    for(let day of data.categories) {
      for(let cat of day.mornCategories.categories) {
        if(cat.selected) {
          cat = this.sortActivities(cat);
          fCats.push(_.sortBy());
        }
      }
      for(let cat of day.aftCategories.categories) {
        if(cat.selected) {
          cat = this.sortActivities(cat);
          fCats.push(cat);
        }
      }
    }

    return _.sortBy(fCats, (o) => { return o.name; })
  }

  private sortActivities(cat) {
    cat.activities = _.sortBy(cat.activities, (o) => { return o.rank; })
    return cat;
  }
}
