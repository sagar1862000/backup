import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as forge from 'node-forge';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class SaltService {

  constructor(private http: HttpClient, public DB: DbService) {
  }


  getSalt(): Promise<string> {
    debugger
    const url = this.DB.rooturi + 'api/generate-key-pair/';
    debugger
    const result =  this.http.get<string>(url).toPromise();
    return result;
  }


  // getSalt(): void{
  //   this.DB.list('candidatenote/',null, (response): void => {
  //     return response
  //     })
  // }
  encryptPassword(keys: any, password: string) {
    debugger;
    var rsa = forge.pki.publicKeyFromPem(keys.publicKey);
    // var encryptedPassword = btoa(rsa.encrypt(password));   // without salt
    const salt = keys.salt;
    const encryptedPassword = btoa(rsa.encrypt(password + salt, 'RSA-OAEP'));
    return encryptedPassword;

  }

}