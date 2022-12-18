import { Component, OnInit } from '@angular/core';
import { IMovieData } from '../shared/interfaces';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  favoriteMovies: IMovieData[] = [];

  constructor() {}

  ngOnInit(): void {
    Object.values(localStorage).forEach((movie) =>
      this.favoriteMovies.push(JSON.parse(movie))
    );
  }

  clear() {
    localStorage.clear();
    this.favoriteMovies = [];
  }

  remove(id: number) {
    localStorage.removeItem(`${id}`);
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.id !== id
    );
  }
}
