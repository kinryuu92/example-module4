import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Awesome } from '../models/awesome.class';
@Injectable({
  providedIn: 'root'
})
export class AwesomeService {

  API = 'http://localhost:3000/awesomes';

  constructor(
    public http: HttpClient
  ) { }

  getAllAwesome() : Observable<Awesome[]>{
    return this.http.get<Awesome[]>(this.API);
  }

  addAwesome(awesome : Awesome) : Observable<Awesome>{
    return this.http.post(this.API, awesome );
  }

  updateAwesome(awesome : Awesome) : Observable<Awesome>{
    return this.http.put(`${this.API}/${awesome.id}`, awesome )
  }

  deleteAwesome(awesome : Awesome) : Observable<Awesome>{
    return this.http.delete(`${this.API}/${awesome.id}`)
  }

  handleError(err : any){
   if(err.error instanceof Error){
     console.log(`Client-side error : ${err.error.message}`);
   }else{
    console.log(`Server-side error : ${err.status} - ${err.error}`);
   }
  }
}
