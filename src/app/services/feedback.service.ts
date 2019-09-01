import { Injectable } from '@angular/core';
import {Observable,of } from 'rxjs';


import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    submitFeedback(Feedback:Feedback):Observable<Feedback>{
      const httpOptions ={
        headers:new HttpHeaders({
     'Content-Type':'application/json'
        })
      };
      return this.http.post<Feedback>(baseURL + 'feedback/' ,Feedback,httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

    }
}

