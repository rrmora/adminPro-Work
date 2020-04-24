import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ClientesService } from '../../services/clientes/clientes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  faFilter = faFilter;
  filters: FormGroup;
  initialDate = new Date();
  maxDate = new Date();
  
  @Output() filterResult = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private clientService: ClientesService) { }

  ngOnInit() {
    this.initialDate.setFullYear(this.initialDate.getFullYear(), this.initialDate.getMonth() - 12);
    this.filters = this.fb.group({
      fechaInicio: [this.initialDate],
      fechaFinal: [new Date()],
      nombre: ['']
    })
  }

  filter() {
    var data = this.filters.getRawValue();
    data.fechaInicio =  moment(data.fechaInicio).format('YYYY-MM-DD HH:mm:ss');
    data.fechaFinal = moment(data.fechaFinal).format('YYYY-MM-DD HH:mm:ss');
    console.log(data);

    this.clientService.GetClientesFilter(data).subscribe((result: any) => {
     this.filterResult.emit(result);
  });
  }

}
