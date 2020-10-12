import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RemoteCallService{
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient){}

    sendRequest(type, url, data?){
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http[type](this.baseUrl + url, data, {headers}).pipe(map((res) => {
        return res;
      }));
    }
}
