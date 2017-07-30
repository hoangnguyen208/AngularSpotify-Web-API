import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../../Artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchRes: Artist[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  searchMusic(){
    this.spotifyService.getToken().subscribe(
      res => {
        this.spotifyService.searchMusic(this.searchStr, 'artist', res.access_token)
        .subscribe(res => {
          this.searchRes = res.artists.items;
        })
      })
  }

}
