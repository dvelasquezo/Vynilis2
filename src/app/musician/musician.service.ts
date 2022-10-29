import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Musician } from './musician';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  private http: HttpClient;
  private apiUrl: string = environment.baseUrl + 'musicians';

  constructor(http: HttpClient) {
    this.http =  http;
  }

  public getMusicians(): Observable<Musician[]> {
    return this.http.get<Musician[]>(this.apiUrl);
  }

  public getMusician(musicianId: number): Observable<Musician> {
    return this.http.get<Musician>(`${this.apiUrl}/${musicianId}`);
  }

  public createMusician(request: CreateMusicianRequest): Observable<Musician> {
    return this.http.post<Musician>(this.apiUrl, request);
  }
}

export class CreateMusicianRequest {
  name: string;
  image: string;
  description: string;
  birthDate: string;
}

export class ServiceResponse {
  name: string;
  image: string;
  description: string;
  birthDate: string;
}
