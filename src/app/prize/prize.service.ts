import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prize } from './prize';
import { PrizePerformerDetail } from './prize-detail/prize-performer-detail';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrizeService {
  private prizesUrl = environment.baseUrl + 'prizes';

  constructor(private http: HttpClient) {}

  getPrizes(): Observable<Prize[]> {
    return this.http.get<Prize[]>(this.prizesUrl);
  }

  getPrize(id: number): Observable<Prize> {
    let url = this.prizesUrl + '/' + id;
    return this.http.get<Prize>(url);
  }

  getPrizePerformers(id: number): Observable<PrizePerformerDetail[]> {
    let url = this.prizesUrl + '/' + id + '/performers';
    return this.http.get<PrizePerformerDetail[]>(url);
  }

  createPrize(newPrize: Prize): Observable<Prize> {
    let url =  this.prizesUrl;
    return this.http.post<Prize>(url, newPrize);
  }
}
