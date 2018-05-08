export class Class {
  id = null;
  name: string = '';
  categories;
}

export class Category {
  id = null;
  name: string = '';
  description: string = '';
  activities = null;
  days = null;
  daysDisplay: string = '';
  morning: boolean = false;
  afternoon: boolean = false;
  timesDisplay: string = '';
}
