import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api key';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  getTableData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  addRow(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, { username, password });
  }

  updateRow(id: number, username: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/data/${id}`, { username, password });
  }

  deleteRow(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/data/${id}`);
  }
}
