import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Biblioteca, RegistroBiblioteca } from '../models/biblioteca.model';

@Injectable({ providedIn: 'root' })
export class BibliotecaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/bibliotecas`;

  consultar(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(this.url);
  }

  registrar(biblioteca: RegistroBiblioteca): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(this.url, biblioteca);
  }
}
