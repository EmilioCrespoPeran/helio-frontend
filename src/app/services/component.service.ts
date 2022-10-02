import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { ComponentModel } from '../models/component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService extends RestService {

  list(): Observable<ComponentModel[]> {
    return new Observable(observable => {
      super.get('/component').subscribe({
        next: (value) => {
          var data: ComponentModel[] = [];
          if (value) {
            value.forEach(item => {
              data.push(new ComponentModel({
                'id': item.id,
                'source': item.component.source,
                'clazz': item.component.clazz,
                'type': item.component.type
              }));
            });
          }
          observable.next(data);
        },
        error: (e) => observable.error(e),
        complete: () => observable.complete()
      });
    });
  }

  addComponent(component: ComponentModel): Observable<ComponentModel> {
    return super.post('/component', component.toJson());
  }

  deleteComponent(componentId: string): Observable<any> {
    return super.delete('/component/' + componentId);
  }

  getComponentsByType(type: string): Observable<ComponentModel[]> {
    return new Observable<ComponentModel[]>(observable => {
      this.list().subscribe({
        next: (v) => observable.next(v.filter(c => c.type == type)),
        error: (e) => observable.error(e),
        complete: () => observable.complete()
      });
    });
  }

}
