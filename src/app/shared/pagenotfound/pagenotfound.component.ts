import { Component, OnInit } from '@angular/core';

declare function init_plugin();
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  fecha: number = new Date().getFullYear();   
  constructor() { }

  ngOnInit() {
    init_plugin();
  }

}
