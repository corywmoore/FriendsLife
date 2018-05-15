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
  public selectedFriend;

  constructor(private renderer: Renderer, private router: Router) { }

  ngOnInit() {
    let friend =JSON.parse(localStorage.getItem('selectedFriend'));
    this.selectedFriend = friend;
  }

  public dateTimeClicked($event: any, time: string, day: string) {
    var index = _.findIndex(this.selection, (item: DateTimeSelection) => {
      return day === item.day && time === item.time;
    });

    var el = ($event.target.childElementCount > 0) ? $event.target : $event.target.parentElement;

    if(index < 0) {
      if (this.selection.length > 0) {
        //Checking for duplicates, then combining.
        let dayExists = this.dayCheck(day);
        if (dayExists) {
          this.selection.map((s)=> {
            if (s.day === day) {
              if (time === 'PM' && !s.afternoon) {
                s.afternoon = time === 'PM';
              } else if (time === 'AM' && !s.morning) {
                s.morning = time === 'AM';
              } else if (s.afternoon && s.morning) {
                return;
              }
            }
          });
        } else {
          let dt = new DateTimeSelection();
          dt.day = day;
          dt.morning = time === 'AM';
          dt.afternoon = time === 'PM';
          dt.time = time;
          this.selection.push(dt);
        }
      } else {
        let dt = new DateTimeSelection();
        dt.day = day;
        dt.morning = time === 'AM';
        dt.afternoon = time === 'PM';
        dt.time = time;
        this.selection.push(dt);
      }
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
      localStorage.setItem('selectedAvailability', JSON.stringify(this.selection));
      this.router.navigate(['categories']);
    }
  }

  private dayCheck(day) {
    let isThere =false;
    this.selection.map((s)=> {
      if (s.day === day) {
        isThere = true;
      }
    });

    return isThere;
  }
}

export class DateTimeSelection {
  day: string;
  time: string;
  morning: boolean = false;
  afternoon: boolean = false;
}
