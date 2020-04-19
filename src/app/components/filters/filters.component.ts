import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  faFilter = faFilter;
  filters: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filters = this.fb.group({
      fechaInicio: [new Date()],
      fechaFinal: [new Date()],
      nombre: ['']
    })
  }

  filter() {
    
  }

}
