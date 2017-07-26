import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private redirect_uri:string;
  private client_id ='f716e056b5944d9bba2340802a7f88be';
  private client_secret = 'acac31590ceb4da38a123253a8c87cc9';
  private access_token:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private base64 = 'OTk2MDgwOTM3ZWJiNDU5NGEwOTc5MTQ2YzljMGMxMjE6MGJkYTNjZmQyMTNjNDYyMmJjNmM1NjI1ODY1NjhlYzg=';

  constructor(private http: Http) { }

  getToken(){    
    let headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + this.encoded);
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    return this.http.post('https://accounts.spotify.com/api/token', {params: {grant_type: "client_credentials"}} , {headers : headers})
        .map(res=> res.json());
  }

  searchMusic(str: string, type = "artist", token: string){
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.searchUrl, {headers: headers})
      .map((res: Response) => res.json());
  }

}
