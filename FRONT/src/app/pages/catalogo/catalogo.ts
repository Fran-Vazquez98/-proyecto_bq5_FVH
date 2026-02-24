import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiskyService } from '../../services/whisky.service';
import { Whisky } from '../../models/whisky.model';
import { WhiskyCard } from '../../components/whisky-card/whisky-card';
import { BuscadorComponent } from '../../components/buscador/buscador';
import { ModalComponent } from '../../components/modal/modal';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, WhiskyCard, BuscadorComponent, ModalComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  whiskies: Whisky[] = [];
  whiskySeleccionado: Whisky | null = null;
  errorMensaje: string = '';
  cargando: boolean = false;

  constructor(private whiskyService: WhiskyService) {}

  ngOnInit(): void {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.whiskyService.getWhiskies().subscribe({
      next: (data) => {
        this.whiskies = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error de conexión: No se pudo conectar con la API segura.';
        this.cargando = false;
        console.error(err);
      }
    });
  }

  filtrar(termino: string): void {
    if (!termino.trim()) {
      this.cargarTodos();
      return;
    }

    this.whiskyService.buscarPorNombre(termino).subscribe({
      next: (data) => {
        this.whiskies = data;
      },
      error: (err) => {
        console.error('Error en la búsqueda', err);
      }
    });
  }

  abrirModal(whisky: Whisky): void {
    this.whiskySeleccionado = whisky;
  }

  cerrarModal(): void {
    this.whiskySeleccionado = null;
  }
}