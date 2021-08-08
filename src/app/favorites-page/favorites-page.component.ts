import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";

export interface favoriteMovies {
  adult: boolean
  backdrop_path: string
  genre_ids: []
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {

    fromLocalStorage: string
    favoriteMovie: {}
    favoriteMovies: favoriteMovies[] = []

  constructor() { }



  ngOnInit(): void {

    for (let i = 0; i < localStorage.length; i++) {
      this.fromLocalStorage = localStorage.getItem(`${localStorage.key(i)}`)
      this.favoriteMovies.push(JSON.parse(this.fromLocalStorage))
    }
    this.favoriteMovies.map<void>(results => {
      this.favoriteMovie = results
    })
  }

  clear() {
    localStorage.clear()
    this.favoriteMovies = null
  }


  remove(id) {
    localStorage.removeItem(id)
    const remove = this.favoriteMovies.filter(ID => ID.id !== id)
    this.favoriteMovies = remove
  }
}
