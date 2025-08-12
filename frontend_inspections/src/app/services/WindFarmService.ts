import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TotalCountWTGPiloted} from '../models/total-wtg-pilotados.model';
import { TotalCountWTGInspections } from '../models/total-wtg-inspeccionados.model';
import { WindFarm } from '../models/windfarm.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WindFarmService {

    private url = 'http://localhost:8000';

    constructor(private http: HttpClient) {

    }

    createNewWindFarm(formData: any): Observable<any> {
        return this.http.post(`${this.url}/add_windFarm`, formData);
    }


    deleteWindFarmID(formData: any): Observable<any> {
        return this.http.post(`${this.url}/deleteBy_id`, formData);
    }
}