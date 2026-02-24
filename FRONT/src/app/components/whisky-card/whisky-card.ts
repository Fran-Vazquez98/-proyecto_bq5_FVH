import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Whisky } from '../../models/whisky.model';

@Component({
  selector: 'app-whisky-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whisky-card.html',
  styleUrl: './whisky-card.css'
})
export class WhiskyCard{
  // Recibimos el objeto whisky desde el componente padre
  @Input() whisky!: Whisky;

  // Evento para avisar al padre que queremos ver detalles (Modal)
  @Output() verDetalles = new EventEmitter<Whisky>();

  // Método que se dispara al pulsar el botón
  onVerMas() {
    this.verDetalles.emit(this.whisky);
  }
}