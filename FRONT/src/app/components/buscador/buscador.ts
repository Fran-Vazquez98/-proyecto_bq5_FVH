import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para el [(ngModel)]

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-box">
      <input 
        type="text" 
        [(ngModel)]="termino" 
        (input)="buscar()" 
        placeholder="Buscar whisky por nombre..."
      >
    </div>
  `,
  styleUrl: './buscador.css'
})
export class BuscadorComponent {
  termino: string = '';
  @Output() alBuscar = new EventEmitter<string>();

  buscar() {
    this.alBuscar.emit(this.termino);
  }
}