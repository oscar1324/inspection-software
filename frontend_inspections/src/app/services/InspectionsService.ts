import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inspection } from '../models/inspection.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService {

  // Store the same url, which exits in your backend
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Create the method
  getAllInspections(): Observable<Inspection []> {
    return this.http.get<Inspection[]>(`${this.apiUrl}/inspections`)
  }
}
