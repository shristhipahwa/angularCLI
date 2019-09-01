import { Injectable } from '@angular/core';
import {Dress} from '../shared/dress';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';

import { Observable,of } from 'rxjs';
import { delay ,map, catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class DressService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }

  getDresses(): Observable<Dress[]> {
    return this.http.get<Dress[]>(baseURL + 'dresses')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDress(id: number): Observable<Dress> {
    return this.http.get<Dress>(baseURL + 'dresses/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedDress(): Observable<Dress> {
    return this.http.get<Dress[]>(baseURL + 'dresses?featured=true').pipe(map(dresses => dresses[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getDressIds(): Observable<number[] | any> {
    return this.getDresses().pipe(map(dresses => dresses.map(dress => dress.id)))
    .pipe(catchError(error=>error));
  }

putDress(dress:Dress):Observable<Dress>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  };

  return this.http.put<Dress>(baseURL + 'dresses/'+ dress.id, dress,httpOptions)
  .pipe(catchError(this.processHTTPMsgService.handleError));

}}