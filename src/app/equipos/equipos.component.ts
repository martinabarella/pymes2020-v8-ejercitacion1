import { Component, OnInit } from '@angular/core';
import { Equipo } from '../equipo';
import { EquiposService } from '../equipos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; 

  submitted = false;
  Titulo = "Equipos";
  Items: Equipo[] = [];
  FormReg: FormGroup;


  constructor(
    private equipoService:  EquiposService, public formBuilder: FormBuilder

    //private articulosFamiliasService:  MockArticulosFamiliasService
  ){}
 
  ngOnInit() {
    this.GetEquipos();
    this.FormReg = this.formBuilder.group({
      IdEquipo: [0],

      EquipoNombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],

      EquipoRanking: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],

    });
  }
 
  GetEquipos() {
    this.equipoService.get()
    .subscribe((res:Equipo[]) => {
      this.Items = res;
    });
    }

  Agregar() {
    this.AccionABMC = "A";
    //this.FormReg.reset(this.FormReg.value);
    this.FormReg.reset();
    //this.FormReg.controls['IdEmpresa'].setValue(0);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  Cancelar() {
    this.AccionABMC = "L";
    this.submitted = false;
    this.GetEquipos();
  }
    Grabar() {

    this.submitted = true;

    // verificar que los validadores esten OK
     if (this.FormReg.invalid) {
      window.alert("Revisar Datos");
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    // var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split("/");
    // if (arrFecha.length == 3)
    //   itemCopy.FechaFundacion = 
    //       new Date(
    //         arrFecha[2],
    //         arrFecha[1] - 1,
    //         arrFecha[0]
    //       ).toISOString();

    // agregar post
    if (itemCopy.IdEquipo == 0 || itemCopy.IdEquipo == null) {
      itemCopy.IdEquipo = 0;
      console.log(itemCopy);
      this.equipoService.post(itemCopy).subscribe((res: any) => {

        this.Cancelar();
        window.alert("Registro grabado");
        // this.modalDialogService.Alert('Registro agregado correctamente.');
        // this.Buscar();
      });
    } else {
      // modificar put
      this.equipoService
        .put(itemCopy.IdEquipo, itemCopy)
        .subscribe((res: any) => {
          this.Cancelar();
          window.alert("Registro modificado");
        });
    }
    //this.GetEquipos();
  }

  Modificar(item) {

    this.submitted = false;
    this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
    this.BuscarPorId(item, "A");
  }

   BuscarPorId(item, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.equipoService.getById(item.IdEquipo).subscribe((res: any) => {
      this.FormReg.patchValue(res);

      // //formatear fecha de  ISO 8061 a string dd/MM/yyyy
      // var arrFecha = res.FechaFundacion.substr(0, 10).split("-");
      // this.FormReg.controls.FechaFundacion.patchValue(
      //   arrFecha[2] + "/" + arrFecha[1] + "/" + arrFecha[0]
      // );

      this.AccionABMC = AccionABMC;
    });
  }
  Eliminar(IdEquipo)
  {
    this.equipoService.delete(IdEquipo).subscribe((res: string) =>
    {
      this.Cancelar();

      this.GetEquipos();
      window.alert("Registro eliminado");
    })
  }

}
