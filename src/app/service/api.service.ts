import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/api';   // BACKEND BASE URL

  constructor(private http: HttpClient) {}

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // get(endpoint: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${endpoint}`);
  // }

  // getById(endpoint: string, id: any): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${endpoint}/${id}`);
  // }

  // put(endpoint: string, id: any, data: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, data);
  // }

  // delete(endpoint: string, id: any): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`);
  // }
}
