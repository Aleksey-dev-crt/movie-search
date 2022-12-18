import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IMovieData, IMovieDetails } from '../shared/interfaces';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  MovieDetails = {} as IMovieDetails;
  recommendations: IMovieData[] = [];
  pageNumber = 1;
  totalPages: number;
  movieID: number;

  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.movieID = params.id;
      },
      (err) => console.error('Observer got an error: ' + err)
    );

    this.movieService.getMovieDetails(this.movieID).subscribe(
      (response) => {
        this.MovieDetails = response;
      },
      (err) => console.error('Observer got an error: ' + err)
    );

    this.movieService
      .getMovieRecommendations(this.movieID, this.pageNumber)
      .subscribe(
        (response) => {
          this.recommendations = response.results;
          this.totalPages = response.total_pages;
        },
        (err) => console.error('Observer got an error: ' + err)
      );
  }

  loadNextRecommendations(pageNumber: number) {
    this.movieService
      .getMovieRecommendations(this.movieID, pageNumber)
      .subscribe(
        (response) => {
          this.recommendations = this.recommendations.concat(response.results);
        },
        (err) => console.error('Observer got an error: ' + err)
      );
  }

  onScroll() {
    if (this.pageNumber !== this.totalPages) {
      this.pageNumber++;
      this.loadNextRecommendations(this.pageNumber);
    }
  }

  toFavorites(movie: IMovieDetails) {
    localStorage.setItem(`${movie.id}`, JSON.stringify(movie));
  }
}
