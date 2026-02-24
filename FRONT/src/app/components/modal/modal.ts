import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Whisky } from '../../models/whisky.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class ModalComponent {
  @Input() whisky: Whisky | null = null;
  @Output() cerrar = new EventEmitter<void>();

  close() {
    this.cerrar.emit();
  }
}