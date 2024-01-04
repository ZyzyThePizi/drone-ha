import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegistrationDTO } from "../dto/drone.registrationDTO";
import { RegistrationAddDTO } from "../dto/drone.registrationAddDTO";

@Injectable()
export class DroneService{

    endpoint: string = 'https://cssna.teknologija.com/api'

    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }


    constructor(private httpClient: HttpClient) {}

    getRegistrations(): Observable<RegistrationDTO[]> {
        return this.httpClient.get<RegistrationDTO[]>(this.endpoint + '/registrations')
    }

    getDroneById(id:number): Observable<RegistrationDTO>{
        return this.httpClient.get<RegistrationDTO>(this.endpoint + '/registrations/'+ id)
    }

    postRegistration(drone: RegistrationAddDTO): Observable<RegistrationAddDTO> {
        return this.httpClient.post<RegistrationAddDTO>(this.endpoint + '/registrations', drone , this.httpHeader)
    }

    updateRegistration(id: number, item: RegistrationAddDTO): Observable<RegistrationAddDTO> {
        return this.httpClient.patch<RegistrationAddDTO>(this.endpoint + '/registrations/' + id , item, this.httpHeader)
    }

    deleteRegistration(id: number): Observable<any> {
        return this.httpClient.delete(this.endpoint+ '/registrations/' + id)
    }

}