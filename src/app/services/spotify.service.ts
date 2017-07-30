import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private redirect_uri:string;
  private client_id ='f716e056b5944d9bba2340802a7f88be';
  private client_secret = 'acac31590ceb4da38a123253a8c87cc9';
  private access_token:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);

  constructor(private http: Http) { }

  getToken(){
    let params = ('grant_type=client_credentials');
    let headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + this.encoded);
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    return this.http.post('https://accounts.spotify.com/api/token', params , {headers : headers} )
      .map(res=> res.json());
    }

  searchMusic(str: string, type = "artist", token: string){
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.searchUrl, {headers: headers})
      .map((res: Response) => res.json());
  }

  getArtist(id:string ,token:string){
     this.artistUrl = 'https://api.spotify.com/v1/artists/'+ id;
     let headers = new Headers();
     headers.append('Authorization' , 'Bearer ' + token);
     return this.http.get(this.artistUrl , {headers : headers})
       .map((res: Response) => res.json())
  }

  getAlbums(artistId:string ,token:string){
     this.albumsUrl = 'https://api.spotify.com/v1/artists/'+ artistId + '/albums';
     let headers = new Headers();
     headers.append('Authorization' , 'Bearer ' + token);
     return this.http.get(this.albumsUrl , {headers : headers})
       .map((res: Response) => res.json())
  }

  getAlbum(id:string ,token:string){
     this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
     let headers = new Headers();
     headers.append('Authorization' , 'Bearer ' + token);
     return this.http.get(this.albumUrl , {headers : headers})
       .map((res: Response) => res.json())
  }
}
