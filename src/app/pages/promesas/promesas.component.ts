import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.contarTres().then(
      (msj) => console.log('Termino', msj)
      )
      .catch(error => console.log('Erro en la promesa', error));;
  }

// ************** FUNCIONES QUE RETORNAN PROMESAS ************** \\
contarTres (): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let contador = 0;
        let intervalo = setInterval(() => {
          contador += 1;
          console.log(contador);
          if (contador == 3) {
            resolve(true)
            // reject('Error.!');
            clearInterval(intervalo);
          }
        }, 1000);
      });
}


  // **************** PROMESAS ************** \\\\

  // constructor() { 

  //   let promesa = new Promise((resolve, reject) => {
  //     let contador = 0;
  //     let intervalo = setInterval(() => {
  //       contador += 1;
  //       console.log(contador);
  //       if (contador == 3) {
  //         resolve('jalo.!')
  //         // reject('Error.!');
  //         clearInterval(intervalo);
  //       }
  //     }, 1000);
  //   });

  //   promesa.then(
  //     (msj) => console.log('Termino', msj)
  //     )
  //     .catch(error => console.log('Erro en la promesa', error));
  // }

}
