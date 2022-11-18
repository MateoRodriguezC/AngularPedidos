import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['',[Validators.required, Validators.email]],
    'clave': ['',[Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private servicioSeguridad: SeguridadService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCrifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario,claveCrifrada).subscribe((datos:any) => {
      // Ok
      //alert("Datos Validos")
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(['/inicio'])
    }, (error: any) => {
      // KO
      alert("Datos Invalidos")
    })
  }

}
