import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-head-estatus',
  templateUrl: './head-estatus.component.html',
  styleUrls: ['./head-estatus.component.css']
})
export class HeadEstatusComponent implements OnInit {

  @Input() Titulo = '';
  @Input() estatus = [];
  constructor() { }

  ngOnInit() {
  }

}
