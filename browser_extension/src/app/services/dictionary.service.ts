import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  getDefinition(word: string): Observable<string> {
    return this.http.get<string>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  }
}