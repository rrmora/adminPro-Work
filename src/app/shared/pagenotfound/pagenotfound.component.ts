import { Component, OnInit } from '@angular/core';

declare function init_plugin();
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styles: []
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugin();
  }

}
