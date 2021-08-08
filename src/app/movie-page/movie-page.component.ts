import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {ActivatedRoute, Params} from "@angular/router";
import {movieData, movieDetails} from "../shared/interfaces";


@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  MovieDetails: movieDetails
  recommendations: movieData[] = []
  results: movieData
  movieID: any

  constructor(
      public movieService: MovieService,
      private route: ActivatedRoute
              ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.movieID = params.id
    })

    this.movieService.getMovieDetails(this.movieID)
      .subscribe(response => {
        this.MovieDetails = response
      })

    this.movieService.getMovieRecommendations(this.movieID)
      .subscribe(response => {
        this.recommendations = response['results']
        //console.log('getMovieRecommendations', this.recommendations)
        this.recommendations.map<void>(results => {
          this.results = results
          //console.log('results', this.results)
        })
      })
  }


  toFavorites(id: number) {
    this.movieService.getFavorites(id, null, null, this.MovieDetails)
  }
}

