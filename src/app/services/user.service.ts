import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Apiurl } from '../shared/common';
import { Alert, AlertType } from '../models/alert.model';

const headerDict = {
  'app-id': '62d520a950bb907668584d1b',
};

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private subject = new Subject<Alert>();
  defaultId: string = 'default-alert';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(Apiurl.getAllUsers, requestOptions);
  }

  get(id: any): Observable<any> {
    return this.http.get(Apiurl.getUserById + id, requestOptions);
  }

  create(data: any): Observable<any> {
    return this.http.post(Apiurl.createUser, data, requestOptions);
  }

  update(data: any): Observable<any> {
    return this.http.put(Apiurl.updateUser, data, requestOptions);
  }

  delete(id: any): Observable<any> {
    console.log("ID",id)
    return this.http.delete(Apiurl.deleteUser + id, requestOptions);
  }

  success(message: string, options?: Partial<Alert>) {
    this.alert(message, AlertType.Success, options);
  }

  alert(message: string, type: AlertType, options: Partial<Alert> = {}) {
    const id = options.id || this.defaultId;
    const alert = new Alert(
      id,
      type,
      message,
      options.autoClose,
      options.keepAfterRouteChange
    );
    this.subject.next(alert);
  }
}
