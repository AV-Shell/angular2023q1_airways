import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IAirRequest } from '../models/core.models';
import { IAirResponse, IFlightInfo, IFlightInfoExt } from 'src/app/store/models';
import * as moment from 'moment';

const converter = (xStartDate: string, y: IFlightInfo, i: number): IFlightInfoExt => {
  {
    const [addHours, addMinutes] = y.startTime.split(':');
    const startDateObj = moment(new Date(xStartDate))
      .add({ hours: +addHours, minutes: +addMinutes, days: i - 3 });
      const startDate = startDateObj.toISOString();

    const endDate = startDateObj.add({ minutes: +y.timeWay }).toISOString();
    const timeWayString = `${(y.timeWay / 60) | 0}h ${y.timeWay % 60}m`;

    return {
      ...y,
      startDate,
      endDate,
      timeWayString,
    };
  }
};

@Injectable()
export class AirHttpService {
  constructor(private http: HttpClient) {}

  getAirs(body: IAirRequest) {
    return this.http.post<IAirResponse>('getairs', body).pipe(
      map(x => {
        const startDate = new Date(x.startDate).toISOString()
        return {
          ...x,
          thereWay: x.thereWay.map((y, i) => converter(startDate, y, i)),
          backWay: x.backWay?.map((y, i) => converter(startDate, y, i)),
        };
      }),
    );
  }
}