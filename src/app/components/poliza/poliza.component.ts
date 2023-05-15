import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {PolizaModel} from 'src/app/model/poliza-model';
import {PolizaService} from 'src/app/service/poliza.service';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.sass']
})
export class PolizaComponent implements OnInit{

  listPolizas: PolizaModel [] = []
  formPoliza: FormGroup = new FormGroup({});
  formActualizarPoliza: FormGroup = new FormGroup({});

  constructor(private polizaService: PolizaService){

  }

  ngOnInit(): void {
    this.list();
    this.formPoliza= new FormGroup({
      idEmpleado: new FormControl(),
      sku: new FormControl(),
      cantidad: new FormControl(),
      fecha: new FormControl('')
    });
    this.formActualizarPoliza= new FormGroup({
      idPoliza: new FormControl(),
      idEmpleado: new FormControl()
    });
  }

  list(){
    this.polizaService.getPolizas().subscribe(resp=>{
      if(resp){
        let convertido=JSON.stringify(resp);
        convertido=convertido.slice(31,convertido.length-1);
        resp=JSON.parse(convertido);
        this.listPolizas=resp;
      }
    })
  }

  delete(id: any){
    if(confirm("¿Seguro que quiere borrar la poliza "+id+"?")) {
      this.polizaService.deletePoliza(id).subscribe(resp=>{
        if(resp){
          this.list();
        }
      });
    }
  }

  save(){
    this.polizaService.savePoliza(this.formPoliza.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formPoliza.reset();
      }
    })
  }

  update(){
    this.polizaService.updatePoliza(this.formActualizarPoliza.value).subscribe(resp=>{
      if(resp){
        this.list();
      }
    })
  }

  newPoliza(){
    this.formPoliza.reset();
  }

  selectItem(item: any){
    this.formActualizarPoliza.controls['idPoliza'].setValue(item.idPoliza);
    this.formActualizarPoliza.controls['idEmpleado'].setValue(item.idEmpleado);
  }
}
