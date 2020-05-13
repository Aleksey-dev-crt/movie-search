import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {movieData} from "../shared/interfaces";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit  {

  searchStr: string = ''
  minLength: number = 3
  validationError: boolean
  popular: movieData[] = []
  results: movieData
  foundMovie: movieData[] = []
  searchResults: movieData

  constructor(
    public movieService: MovieService,
    private http: HttpClient,
  ) {
  }


  ngOnInit(): void {
    this.http.get<movieData[]>(`${environment.popularUrl}api_key=${environment.apiKey}&language=en-US&page=1`)
      .subscribe(response => {
        this.popular = response['results']
        //console.log('popular', this.popular)
        this.popular.map<void>(results => {
          this.results = results
          //console.log('results', this.results)
        })
      })
    this.movieService.keys = []
  }


  toFavorites(id: number) {
    this.movieService.getFavorites(id, this.popular, this.foundMovie, null)
  }


  handleChange() {
    this.movieService.getMovie(this.searchStr)
      .subscribe(movieName => {
        this.foundMovie = movieName['results']
      })
    if (this.searchStr.length <= this.minLength) {
      this.searchResults = null
    }
  }

  entered() {
    if (this.searchStr.length >= this.minLength) {
      this.validationError = false

      this.foundMovie.map<void>(searchResults => {
        this.searchResults = searchResults
      })
    } else {
      this.validationError = true
    }
  }

}



