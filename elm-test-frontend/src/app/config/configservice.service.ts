import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:5093/Book';

  getStoreBook(filter: any) {
    return this.http.post<any>(this.configUrl, filter);
  }
}
