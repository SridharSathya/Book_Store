import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RemoteCallService } from './config.service';

@Injectable({
    providedIn: 'root'
})

export class BooksListResolve implements Resolve<any> {
    constructor(private remoteService: RemoteCallService){}
    resolve(){
      return this.remoteService.sendRequest('get', 'getBooksList');
    }
}

@Injectable({
    providedIn: 'root'
})

export class CartListResolve implements Resolve<any> {
    constructor(private remoteService: RemoteCallService){}
    resolve(){
      return this.remoteService.sendRequest('get', 'getCartList');
    }
}
