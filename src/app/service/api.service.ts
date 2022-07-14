import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slbtr } from '../models/slbtr.model';
import { Mensaje } from '../models/mensaje.model';
import {Repair} from '../models/repair.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // url: string = 'http://172.40.3.14:9706/apis/';
  url: string = 'http://localhost:9608/apis/';

  constructor(private http: HttpClient) { }
  
  getMensajeSLBTR():Observable<Slbtr[]>{
    let dir = this.url+'mensajesSLBTR';
    return this.http.get<Slbtr[]>(dir);
  }

  getConteoSLBTR(){
    let dir = this.url+'conteoSLBTR';
    return this.http.get<Slbtr[]>(dir);
  }

  getConteo():Observable<Mensaje[]>{
    let dir = this.url+'conteo';
    return this.http.get<Mensaje[]>(dir);
  }

buscarMensaje(tipo:number=0, fecha:string='', hora: string= ''):Observable<Mensaje[]>{
    let dir = this.url+'tipoM';
    return  this.http.get<Mensaje[]>(dir,{params:{'tipo':tipo,'fecha':fecha, 'hora': hora}});
}

selectHoras(fecha: string =''):Observable<string[]>{
  let dir = this.url+'mostrarHoras';
  return this.http.get<string[]>(dir,{params:{'fecha':fecha}});
}

execETL(){
  let dir=this.url+'execETL';
  return this.http.get(dir);
}

getRepair():Observable<Repair[]>{
  let dir = this.url+'repair';
  return this.http.get<Repair[]>(dir);
}

setEstado(id:number){
  let dir = this.url+'estado';
  return this.http.put(dir,{id:id});
}


}
