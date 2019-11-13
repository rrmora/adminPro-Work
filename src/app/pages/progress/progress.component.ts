import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  public progreso1: number = 50;
  public progreso2: number = 20;

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor) {
    
  }

}
