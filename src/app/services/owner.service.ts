import { Injectable } from '@angular/core';
import {Owner} from '../shared/owner';

import {Observable,of} from 'rxjs';
import {delay,map,catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http:HttpClient,
    private  processHTTPMsgService:ProcessHTTPMsgService) { }
  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(baseURL +'owners')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getOwner(id: string):Observable< Owner >{
    return this.http.get<Owner>(baseURL +'owners/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
   
  
}

  getFeaturedOwner():Observable< Owner> {
    return this.http.get<Owner>(baseURL +'owners?featured=true').pipe(map(dresses => dresses[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
}
