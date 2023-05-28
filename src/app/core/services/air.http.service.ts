import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { IAirRequest, ICheckResponse, ILoginRequest, ILoginResponse, IRegisterRequest } from '../models/core.models';
import { IAirResponse, IFlightInfo, IFlightInfoExt } from 'src/app/store/models';
import * as moment from 'moment';

const converter = (xStartDate: string, y: IFlightInfo, i: number): IFlightInfoExt => {
  {
    const [addHours, addMinutes] = y.startTime.split(':');
    const startDateObj = moment(new Date(xStartDate)).add({ hours: +addHours, minutes: +addMinutes, days: i - 3 });
    const startDate = startDateObj.toISOString();

    const isFlight = y.isFlight && startDateObj.isAfter();

    const endDate = startDateObj.add({ minutes: +y.timeWay }).toISOString();
    const timeWayString = `${(y.timeWay / 60) | 0}h ${y.timeWay % 60}m`;

    return {
      ...y,
      isFlight,
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
        const startDate = new Date(x.startDate).toISOString();
        return {
          ...x,
          thereWay: x.thereWay.map((y, i) => converter(startDate, y, i)),
          backWay: x.backWay?.map((y, i) => converter(startDate, y, i)),
        };
      }),
    );
  }

  login(body: ILoginRequest) {
    return this.http.post<ILoginResponse>('login', body);
  }

  register(body: IRegisterRequest) {
    return this.http.post<ILoginResponse>('login', body);
  }

  checkUser(id: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<ICheckResponse>(`/600/users/${id}`, { headers });
  }
}
