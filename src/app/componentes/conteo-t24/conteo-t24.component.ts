import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SessionStorageService } from 'ngx-webstorage';
import { Mensaje } from 'src/app/models/mensaje.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-conteo-t24',
  templateUrl: './conteo-t24.component.html',
  styleUrls: ['./conteo-t24.component.scss']
})
export class ConteoT24Component implements OnInit {

  mensajesConteo: Mensaje[] = [];
  tipoMensajeList: number[] = [102, 103, 104, 190, 206, 299, 900, 910];
  buscando: boolean = false;
  error:any = ''
  message: any = 'No existen mensajes'
  slbtr:any;
  tipoMsje: number = -1;
  fecha: any;
  hora:any='';
  horas: any[]=[];

  constructor(private api: ApiService, public storage: SessionStorageService) { }

  ngOnInit(): void {
    this.storage.observe('slbtr').subscribe(result=>{
      this.slbtr = result;
    })

    this.loadMensaje();
    this.selectHoras();

    setInterval(() => {
      if ((this.fecha == '1970/1/1' || this.fecha == 'NaN/0NaN/NaN' || this.fecha == 'Invalid date') && this.tipoMsje == -1 && this.hora == '') {
        this.loadMensaje();
      } else {
        this.search();
      }
    }, 6000)

  }

  loadMensaje() {
    this.buscando = true;
    let prov: any = [];
    this.mensajesConteo=[];
    this.error=''
    this.api.getConteo().subscribe(result => {
      this.mensajesConteo = result.filter(e => {
        if (prov.indexOf(e.tipoM) == -1) {
          prov.push(e.tipoM);
          return e;
        } else return;
      });
      this.buscando = false;
      this.storage.store('t24',this.mensajesConteo);
      this.selectHoras();
    },error=>{
      this.buscando = false;
      this.error= 'Problemas de conexión con el servidor de servi'+ error.error;
    });
  }

  compararRec(item:any){
  return (this.slbtr.MT_102!=item.totalRecibido && item.tipoM==102)
  ||(this.slbtr.MT_103!=item.totalRecibido && item.tipoM==103) 
  ||(this.slbtr.MT_104!=item.totalRecibido && item.tipoM==104)
  ||(this.slbtr.MT_190!=item.totalRecibido && item.tipoM==190)
  ||(this.slbtr.MT_199!=item.totalRecibido && item.tipoM==199)
  ||(this.slbtr.MT_206!=item.totalRecibido && item.tipoM==206)
  ||(this.slbtr.MT_299!=item.totalRecibido && item.tipoM==299)
  ||(this.slbtr.MT_900!=item.totalRecibido && item.tipoM==900)
  ||(this.slbtr.MT_910!=item.totalRecibido && item.tipoM==910)  
  ||(this.slbtr.MT_950!=item.totalRecibido && item.tipoM==950)  
  }

  compararOpe(item:any){
    return (this.slbtr.Transf_102!=item.totalOpe && item.tipoM==102)
    ||(this.slbtr.Transf_104!=item.totalOpe && item.tipoM==104) 
    ||(this.slbtr.Transf_206!=item.totalOpe && item.tipoM==206) 
  }

  selectHoras() {
    console.log('fecha', this.fecha)
    let date: string = moment(this.fecha).format('YYYY/MM/DD')
    this.api.selectHoras(date).subscribe((result) => {
      console.log('resul',result);
      console.log('fecha',date);
      this.horas = result;
    })
  }
  search(){
    let date: string = moment(this.fecha).format('YYYY/MM/DD')

    if ((date == '1970/1/1' || date == 'NaN/0NaN/NaN') && this.tipoMsje == -1 && this.hora == '') {
      this.loadMensaje();
    } else {
      console.log(this.hora);

      this.api.buscarMensaje(this.tipoMsje, date, this.hora).subscribe((result) => {
        this.mensajesConteo = result;

      })
    }
  }
  
  execETL(){}

}
