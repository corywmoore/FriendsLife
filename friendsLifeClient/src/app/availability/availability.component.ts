import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {

  public selection: DateTimeSelection[] = [];
  public warning = false;

  constructor(private renderer: Renderer, private router: Router) { }

  ngOnInit() {
  }

  public dateTimeClicked($event: any, time: string, day: string) {
    var index = _.findIndex(this.selection, (item: DateTimeSelection) => {
      return day === item.day && time === item.time;
    });

    var el = ($event.target.childElementCount > 0) ? $event.target : $event.target.parentElement;

    if(index < 0) {
      var dt = new DateTimeSelection();
      dt.day = day;
      dt.time = time;
      this.selection.push(dt);
      this.renderer.setElementClass(el, 'green-bg', true);
      this.warning = false;
    } else {
      this.selection.splice(index, 1);
      this.renderer.setElementClass(el, 'green-bg', false);      
    }
  }

  public validateAndRoute() {
    if(this.selection.length < 1) {
      this.warning = true;
    } else {
      this.router.navigate(['activities']);
    }
  }
}

export class DateTimeSelection {
  day: string;
  time: string;
}
