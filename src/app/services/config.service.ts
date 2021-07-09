import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Configuration;
  constructor(private http: HttpClient) { }

  onLoad(url: string) {
    return new Promise((resolve) => {
      this.http.get(url)
        .subscribe((config: Configuration) => {
          this.config = config;
          resolve(true);
        });
    });
  }

  getConfiguration(): Configuration {
    return this.config;
  }


}
