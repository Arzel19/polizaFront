import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PolizaModel } from '../model/poliza-model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  constructor(private httpClient: HttpClient) {

  }
  url: string='https://api-poliza.onrender.com/api/poliza';
  getPolizas(): Observable<any>{
    return this.httpClient.get<any>(this.url+'/list').pipe(map(res=>res));

  }

  savePoliza(request: any): Observable<any>{
    return this.httpClient.post<any>(this.url+'/save', request).pipe(map(res=>res));
  }

  updatePoliza(request: any): Observable<any>{
    return this.httpClient.post<any>(this.url+'/update', request).pipe(map(res=>res));
  }

  deletePoliza(id: number): Observable<any>{
    return this.httpClient.get<any>(this.url+'/delete/'+id).pipe(map(res=>res));
  }
}
