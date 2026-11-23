import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca.service';
import { RegistroBiblioteca } from '../../models/biblioteca.model';

@Component({
  selector: 'app-biblioteca-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './biblioteca-form.component.html',
  styleUrl: './biblioteca-form.component.css'
})
export class BibliotecaFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(BibliotecaService);

  @Output() bibliotecaRegistrada = new EventEmitter<void>();

  guardando = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(255)]],
    direccion: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(255)]],
    ciudad: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(255)]]
  });

  registrar(): void {
    if (this.guardando() || this.form.invalid) {
      return;
    }

    const valores = this.form.getRawValue();
    const biblioteca: RegistroBiblioteca = {
      nombre: valores.nombre.trim(),
      direccion: valores.direccion.trim(),
      ciudad: valores.ciudad.trim()
    };

    this.guardando.set(true);
    this.service.registrar(biblioteca).subscribe({
      next: () => {
        this.form.reset();
        this.guardando.set(false);
        this.bibliotecaRegistrada.emit();
      },
      error: (error) => {
        this.guardando.set(false);
        console.error(error);
      }
    });
  }
}
