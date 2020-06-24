import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Equipo } from './equipo';

@Injectable( 
  {
    providedIn: "root"
  }
)
export class EquiposService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) { 
  this.resourceUrl = "https://pavii.ddns.net/api/equipos/";  
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj:Equipo) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }

  put(Id: number, obj:Equipo) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  } 

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }
}