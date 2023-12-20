import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private apiurl = environment.apiURL
  constructor(private http:HttpClient) { }

  getAllUser(){
    return this.http.get(`${this.apiurl+'/User/getAllUsers'}`)
  }
}
