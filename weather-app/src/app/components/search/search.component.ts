import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  cityName = new FormControl('');

  @Output()
  submit: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.submit.emit(this.cityName.value || '');
  }
}
