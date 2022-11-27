import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Currency} from "./app.component";


@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
}

