import { Injectable } from '@angular/core';
import Parse from 'parse';
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  appId = 'appId'
  jsKey = 'javascriptKey'
  constructor() { 
    Parse.initialize(this.appId, this.jsKey);
    Parse.serverURL = 'http://localhost:1337/api';
  }
}
