import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor(private _router: Router, private title: Title, private meta: Meta) {

    this.GetData().subscribe(data => {
      console.log("url: ", data);
      this.titulo = data;
      this.title.setTitle(this.titulo); 
      const metaTag: MetaDefinition = {
        name: 'Descripción',
        content: this.titulo,
      };
      this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }
   
  GetData(): Observable<string> {
   return  this._router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data.titulo)
    )
  }
}
