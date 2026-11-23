import { Component, Input } from '@angular/core';
import { Biblioteca } from '../../models/biblioteca.model';

@Component({
  selector: 'app-libros-tabla',
  standalone: true,
  templateUrl: './libros-tabla.component.html',
  styleUrl: './libros-tabla.component.css'
})
export class LibrosTablaComponent {
  @Input() bibliotecas: Biblioteca[] = [];

  get libros() {
    return this.bibliotecas.flatMap((biblioteca) =>
      biblioteca.libros.map((libro) => ({
        ...libro,
        biblioteca: biblioteca.nombre
      }))
    );
  }
}
