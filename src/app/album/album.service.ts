import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

import { Album } from "./album";
import { Track } from './track';
import { CollectorAlbum } from "./album-collector/collector-album";
import { Collector } from './collector';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl: string = environment.baseUrl + 'albums';
  private collectorUrl: string = environment.baseUrl + 'collectors';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbumDetalle(id: number): Observable<Album> {
      return this.http.get<Album>(this.apiUrl + '/' + id.toString());
  }

  getCollectors(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.collectorUrl);
  }

  getCollectorAlbum(idCollector: number): Observable<CollectorAlbum[]> {
    return this.http.get<CollectorAlbum[]>(this.collectorUrl + '/' +
     idCollector.toString() + '/albums');
  }

  asociarColeccionista(idCollector: string, idAlbum: String,
     collectorAlbum: CollectorAlbum): Observable<CollectorAlbum> {
    return this.http.post<CollectorAlbum>(
      this.collectorUrl + '/' + idCollector + '/albums/' + idAlbum, collectorAlbum);
  }

  createAlbum (album:Album):Observable<Album>{
    return this.http.post<Album>(this.apiUrl,album);
  }

  asociarTrack (idAlbum:number, track:Track):Observable<Track>{
    return this.http.post<Track>(this.apiUrl + '/' + idAlbum.toString()+ '/'+'tracks',track);
  }
}
