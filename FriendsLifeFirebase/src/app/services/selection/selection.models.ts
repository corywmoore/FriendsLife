export class SelectionModel {
    classesId: string;
    uId: string;
    availabilities: AvailabilityModel[];
    firstName: string;
    lastName: string;
    nickName: string;
}

export class AvailabilityModel {
    day: string;
    time: string;
}

export class AvailabilityDisplayModel {
    DayName: string;
    TimeName: string;
    TimeValue: string;
    itemId: string;
}

export const AvailabilityDisplayObject: AvailabilityDisplayModel[] = [{
    DayName: 'Monday',
    TimeName: 'Morning',
    TimeValue: 'AM',
    itemId: ''
}, {
    DayName: 'Tuesday',
    TimeName: 'Morning',
    TimeValue: 'AM',
    itemId: ''
}, {
    DayName: 'Wednesday',
    TimeName: 'Morning',
    TimeValue: 'AM',
    itemId: ''
}, {
    DayName: 'Thursday',
    TimeName: 'Morning',
    TimeValue: 'AM',
    itemId: ''
}, {
    DayName: 'Friday',
    TimeName: 'Morning',
    TimeValue: 'AM',
    itemId: ''
}, {
    DayName: 'Monday',
    TimeName: 'Afternoon',
    TimeValue: 'PM',
    itemId: ''
}, {
    DayName: 'Tuesday',
    TimeName: 'Afternoon',
    TimeValue: 'PM',
    itemId: ''
}, {
    DayName: 'Wednesday',
    TimeName: 'Afternoon',
    TimeValue: 'PM',
    itemId: ''
}, {
    DayName: 'Thursday',
    TimeName: 'Afternoon',
    TimeValue: 'PM',
    itemId: ''
}, {
    DayName: 'Friday',
    TimeName: 'Afternoon',
    TimeValue: 'PM',
    itemId: ''
}];
