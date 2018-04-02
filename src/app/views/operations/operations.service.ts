import { Injectable } from '@angular/core';
import { Operation } from './operation';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OperationsService {
  private urlRest = environment.apiUrl + "pub/items/";
  private operations: Operation[] = [];


  constructor(private httpService: HttpClient) { }

  public getNumberOfOperations$(): Observable<any> {
    return this.httpService.get(this.urlRest + "count");
  }
  //el $ es para identificar que una funcion devuelve un observable
  public getOperationsList$(): Observable<Operation[]> {
    return this.httpService.get<Operation[]>(this.urlRest);
  }

  public getOperationById$(id:string): Observable<Operation> {
    return this.httpService.get<Operation>(this.urlRest + id);
  }

  public saveOperation$(operation: Operation): Observable<any> {
    return this.httpService.post(this.urlRest, operation);
  }

  public deleteOperation$(operation: Operation): Observable<any> {
    return this.httpService.delete(this.urlRest + operation._id);
  }
}
