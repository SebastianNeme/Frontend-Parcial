import { Component, inject, OnInit, signal } from '@angular/core';
import { Biblioteca } from './models/biblioteca.model';
import { BibliotecaService } from './services/biblioteca.service';
import { BibliotecaFormComponent } from './bibliotecas/biblioteca-form/biblioteca-form.component';
import { LibrosTablaComponent } from './libros/libros-tabla/libros-tabla.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BibliotecaFormComponent, LibrosTablaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private service = inject(BibliotecaService);
  bibliotecas = signal<Biblioteca[]>([]);

  ngOnInit(): void {
    this.cargarBibliotecas();
  }

  cargarBibliotecas(): void {
    this.service.consultar().subscribe({
      next: (bibliotecas) => {
        this.bibliotecas.set(bibliotecas);
      },
      error: (error) => console.error(error)
    });
  }
}
