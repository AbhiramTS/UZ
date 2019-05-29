import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Preview } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TemplatingService {

  constructor(private http :HttpClient) { }

  preview = async (link: string) : Promise<Preview> => {
    return await this.http.get<Preview>(link).toPromise();
  }
}
