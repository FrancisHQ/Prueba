import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { IPrioridad } from 'src/app/interfaces/IPrioridad';
import { ITareas } from 'src/app/interfaces/ITareas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  tareas: FormGroup;
  filtroForm: FormGroup;
  taskGrup: ITareas[] = [];
  tarea: ITareas = {};
  originalTaskGrup: ITareas[] = [];
  loading = false;
  prioridades: IPrioridad[] = [];
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  sidebarVisible = false;
  filtrosVisible = false;
  ultimoId: number = 0; // Variable para almacenar el último ID
  validateEdit = false;

  constructor(private _fb: FormBuilder, private datePipe: DatePipe) {
    this.tareas = this._fb.group({
      id: [''],
      titulo: [null],
      descripcion: [null, Validators.required],
      fechaVencimiento: [null],
      prioridad: [null],
      estado: [1],
      filtro: [''],
    });

    this.filtroForm = this._fb.group({
      titulo: [''],
      descripcion: [''],
      fechaVencimiento: [null],
    });
  }

  ngOnInit() {
    this.iniciarTareas();
    this.items = [{ label: 'Lista de tareas', icon: 'pi pi-fw pi-list' }];
    this.activeItem = this.items[0];

    this.prioridades = [
      { text: 'Alta', key: '1' },
      { text: 'Media', key: '2' },
      { text: 'Baja', key: '3' },
    ];

    this.filtroForm.valueChanges.subscribe(() => {
      this.filtrarTareas();
    });

    const idFromStorage = localStorage.getItem('ultimoId');
    this.ultimoId = idFromStorage ? +idFromStorage : 0;
  }

  mostrarSidebar() {
    this.sidebarVisible = true;
  }

  ocultarSidebar() {
    this.sidebarVisible = false;
    this.tareas.reset();
  }

  mostrarFiltros() {
    this.filtrosVisible = true;
  }

  ocultarFiltros() {
    this.filtrosVisible = false;
  }

  filtrarTareas() {
    const filtroTitulo =
      this.filtroForm.get('titulo')?.value?.toLowerCase() || '';
    const filtroDescripcion =
      this.filtroForm.get('descripcion')?.value?.toLowerCase() || '';
    const filtroFecha =
      this.datePipe.transform(
        this.filtroForm.get('fechaVencimiento')?.value,
        'dd/MM/yyyy'
      ) || '';

    console.log('Filtro:', { filtroTitulo, filtroDescripcion, filtroFecha });

    if (!filtroTitulo && !filtroDescripcion && !filtroFecha) {
      this.taskGrup = [...this.originalTaskGrup];
      return;
    }
    this.taskGrup = this.originalTaskGrup.filter((tarea) => {
      const tareaTitulo = tarea.titulo?.toLowerCase() || '';
      const tareaDescripcion = tarea.descripcion?.toLowerCase() || '';
      const tareaFecha = tarea?.fechaVencimiento || '';

      return (
        (!filtroTitulo || tareaTitulo.includes(filtroTitulo)) &&
        (!filtroDescripcion || tareaDescripcion.includes(filtroDescripcion)) &&
        (!filtroFecha || tareaFecha.includes(filtroFecha))
      );
    });
  }

  limpiarFiltros() {
    this.filtroForm.reset();
    this.taskGrup = [...this.originalTaskGrup];
  }

  Agregar() {
    this.sidebarVisible = false;
    if (this.tareas.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tarea sin descripción.',
      });
      Object.values(this.tareas.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    const tarea = this.tareas.value;
    tarea.id = ++this.ultimoId;
    tarea.fechaVencimiento = this.datePipe.transform(
      tarea.fechaVencimiento,
      'dd/MM/yyyy'
    );
    this.taskGrup.push(tarea);
    this.originalTaskGrup.push(tarea);
    this.guardarTareas();
    this.tareas.reset();
    this.sidebarVisible = false;
    this.actualizar();
    localStorage.setItem('ultimoId', this.ultimoId.toString());
  }

  editarTarea(tarea: ITareas) {
    this.validateEdit = true;
    this.mostrarSidebar();

    this.tareas.patchValue({
      id: tarea.id,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaVencimiento: tarea.fechaVencimiento,
      prioridad: tarea.prioridad,
    });
    console.log('this.tarea', this.tarea);
    console.log('this.tareas', this.tareas.value);
  }
  Editar() {
    console.log('this.tareas en EDITAR', this.tareas.value);
    const objetoEncontrado = this.taskGrup.find(x => x.id === this.tareas.value.id);
    if (objetoEncontrado) {
      const index = this.taskGrup.indexOf(objetoEncontrado);
      if (index !== -1) {
        const fechaVencimiento = this.tareas.value.fechaVencimiento ?? undefined;
        this.taskGrup[index] = {
          id: objetoEncontrado.id,
          titulo: this.tareas.value.titulo,
          descripcion: this.tareas.value.descripcion,
          fechaVencimiento: fechaVencimiento ? 
            this.datePipe.transform(
              fechaVencimiento,
              'dd/MM/yyyy',
            ) : undefined,
          prioridad: this.tareas.value.prioridad
        };
      }
    }
    console.log("this.taskGrup", this.taskGrup);
    
    if (this.tareas.valid) {
      this.sidebarVisible = false;
    }
  }
  

  eliminarTarea(tarea: ITareas) {
    const index = this.taskGrup.indexOf(tarea);
    if (index !== -1) {
      this.taskGrup.splice(index, 1);
      this.originalTaskGrup.splice(index, 1);
      this.guardarTareas();
    }
  }

  private guardarTareas() {
    console.log(JSON.stringify(this.taskGrup));
    localStorage.setItem('Tareas', JSON.stringify(this.taskGrup));
  }

  private iniciarTareas() {
    const actualizarTareas = localStorage.getItem('Tareas');
    if (actualizarTareas) {
      this.taskGrup = JSON.parse(actualizarTareas);
      this.originalTaskGrup = [...this.taskGrup];
    }
  }

  public get f(): any {
    return this.tareas.controls;
  }

  actualizar() {
    this.loading = true;
    setTimeout(() => {
      this.taskGrup = [...this.taskGrup];
      this.loading = false;
    }, 1000);
  }
}
