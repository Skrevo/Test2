import {Component, OnInit} from '@angular/core';
import {HttpService} from "./HttpService";

export interface Currency {
  txt: string;
  rate: number;
  cc: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Конвертер валют';
  currency: Currency[] = [];
  value1!: number;
  value2!: number;
  selectOfCur1!: string;
  selectOfCur2!: string;

  calcFromVal1(): void {
    if (this.selectOfCur1 === this.selectOfCur2)
      this.value2 = this.value1
    for (let key in this.currency) {
      if (this.selectOfCur1 === this.currency[key].cc && this.selectOfCur2 === 'UAH')
        this.value2 = this.value1 * this.currency[key].rate
      if (this.selectOfCur1 === 'UAH' && this.selectOfCur2 === this.currency[key].cc)
        this.value2 = 1 / this.currency[key].rate * this.value1
      //
      if (this.selectOfCur1 === this.currency[key].cc && (this.selectOfCur2 !== 'UAH' && this.selectOfCur2 !== this.selectOfCur1)) {
        for (let key2 in this.currency) {
          if (this.selectOfCur2 === this.currency[key2].cc)
            this.value2 = this.value1 * this.currency[key].rate / this.currency[key2].rate
        }
      }
    }
  }

  calcFromVal2(): void {
    if (this.selectOfCur1 === this.selectOfCur2)
      this.value1 = this.value2
    for (let key in this.currency) {
      if (this.selectOfCur2 === this.currency[key].cc && this.selectOfCur1 === 'UAH')
        this.value1 = this.value2 * this.currency[key].rate
      if (this.selectOfCur2 === 'UAH' && this.selectOfCur1 === this.currency[key].cc)
        this.value1 = 1 / this.currency[key].rate * this.value2
      //
      if (this.selectOfCur2 === this.currency[key].cc && (this.selectOfCur1 !== 'UAH' && this.selectOfCur1 !== this.selectOfCur2)){
        for (let key2 in this.currency) {
          if (this.selectOfCur1 === this.currency[key2].cc)
            this.value1 = this.value2 * this.currency[key].rate / this.currency[key2].rate
        }
      }
    }
  }

  constructor(private data: HttpService) {
  }

  ngOnInit(): void  {
    this.data.getData().subscribe(currency => this.currency = currency);
  }
}

