import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NguoinopService {
  private apiURL = environment.apiURL
  constructor(
    private httpClient:HttpClient
  ) { }
  findAll(){
    return this.httpClient.get(this.apiURL + '/api/nguoinop')
  }
  save(nguoinop:any){
    return this.httpClient.post(this.apiURL + '/api/nguoinop',nguoinop)
  }
  findById(id: any){
    return this.httpClient.get(this.apiURL + '/api/nguoinop/' + id)
  }
  update(nguoinop:any){
    return this.httpClient.put(this.apiURL + '/api/nguoinop/' + nguoinop.id,nguoinop)
  }
  delete(nguoinop:any){
    return this.httpClient.delete(this.apiURL + '/api/nguoinop/' + nguoinop.id)
  }

}
