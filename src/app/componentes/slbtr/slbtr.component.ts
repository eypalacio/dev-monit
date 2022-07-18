import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionStorageService } from 'ngx-webstorage';
import { Slbtr } from 'src/app/models/slbtr.model';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-slbtr',
  templateUrl: './slbtr.component.html',
  styleUrls: ['./slbtr.component.scss']
})
export class SlbtrComponent implements OnInit {

  mensajesSLBTR: Slbtr[] = [];
  conteoSLBTR: Slbtr[] = [];
  buscando: boolean = false;
  error: any = '';
  message: any = 'No existen mensajes';
  t24: any[] = [];

  constructor(private api: ApiService, public storage: SessionStorageService) { }

  ngOnInit(): void {
    this.storage.observe('t24').subscribe(result => {
      this.t24 = result;
    })

    this.loadMensaje();
    this.loadConteo();

    setInterval(()=>{
      this.loadMensaje();
      this.loadConteo();
    }, 60000);
  }

  loadMensaje() {
    this.buscando = true;
    this.error = '';
    this.api.getMensajeSLBTR().subscribe(result => {
      this.mensajesSLBTR = this.convertirFechaHora(result);
      this.buscando = false;
    }, error => {
      this.error = 'Problemas de conexión con el servidor de servi' + error.error;
      this.buscando = false
    });
  }

  convertirFechaHora(result: any) {
    result.forEach((element: any) => {
      element.fecha = moment.utc(element.fecha, 'YYYY-MM-DD').format('YYYY-MM-DD');
      element.hora = moment.utc(element.hora).format('HH:mm:ss');
    });
    return result;
  }

  loadConteo() {
    this.api.getConteoSLBTR().subscribe(result => {
      this.conteoSLBTR = result;
      this.storage.store('slbtr', this.conteoSLBTR[0]);
    });
  }

  comparar(item:any, tipo: string){
    return (this.t24.filter(e=>e.tipoM==tipo)[0].totalRecibido != item) && (this.t24.filter(e=>e.tipoM==tipo)[0].totalOpe != item)
  }

 btnRefrescar(){
  this.loadMensaje();
  this.loadConteo();
 }

}
