import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inspection } from '../models/inspection.model';
import { TotalCountWTGPiloted} from '../models/total-wtg-pilotados.model';
import { TotalCountWTGInspections } from '../models/total-wtg-inspeccionados.model';
import { WindFarm } from '../models/windfarm.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * La responsabilidad principal es gestionar todos los datos relacionados con las inspecciones.
 */
export class InspectionsService {

  // Store the same url, which exits in your backend
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Create the method
  getAllInspections(): Observable<Inspection []> {
    return this.http.get<Inspection[]>(`${this.apiUrl}/inspections`)
  }

  getTotalWTGPiloted(): Observable<TotalCountWTGPiloted> {
    return this.http.get<TotalCountWTGPiloted>(`${this.apiUrl}/getTotalCount_WTG_piloted`)
  }

  getTotalWTGInspections(): Observable<TotalCountWTGInspections> {
    return this.http.get<TotalCountWTGInspections>(`${this.apiUrl}/getTotalCount_WTG_Inspections`)
  }

  getTotalNetExtraCountMonth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTotalNetCountMonth`)
  }

  // Petición para obtener toda la lista de parques eolicos
  getAllWindFarm(): Observable<WindFarm[]> {
    return this.http.get<WindFarm[]>(`${this.apiUrl}/getAll_WindFarms`)
  }

  insertNewDialyRegister(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_inspections`, formData)
  }

  getInspectionById(wind_farm_id: number): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.apiUrl}/inspection_id/${wind_farm_id}`)
  }


  
}
