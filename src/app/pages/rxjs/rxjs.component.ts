import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscipcion: Subscription;
  constructor() {
    this.subscipcion = this.RegresaObserveble()
    .subscribe(
      numero => console.log('subs', numero),
      error => console.error('Error en el obs', error),
      () => console.info('El observedor termino.!')
     );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Destroy Observable');
    this.subscipcion.unsubscribe();
  }
  
  RegresaObserveble(): Observable<any> {
    let contador = 0;
    return new Observable((observer: Subscriber<any>) => {
      let intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        }
        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Error.!!!');
        // }
      }, 1000);
    })
    .pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if ((valor % 2) === 1)
        {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
