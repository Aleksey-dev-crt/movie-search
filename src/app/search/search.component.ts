import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {movieData} from "../shared/interfaces";
import {NgxSpinnerService} from "ngx-spinner";


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
  searchResults: movieData[] = []
  pageNumber: number = 1
  searchPageNumber: number = 1
  totalPages: number

  constructor(
    public movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}


  ngOnInit(): void {
    this.initMovies()
  }

  initMovies() {
    this.movieService.getMovies(this.pageNumber)
    .subscribe(response => {
      this.popular = response['results']
      this.totalPages = response['total_pages']
      //console.log('popular', this.popular)
      this.movieService.keys = []
    })
  }

  onScroll() {
    if (this.pageNumber !== this.totalPages) {
      this.pageNumber++
      //console.log('pageNumber', this.pageNumber)
      this.spinner.show()
      this.loadNextMovies(this.pageNumber)
      this.spinner.hide()
    }
  }

  loadNextMovies(pageNumber: number) {
    this.movieService.getMovies(pageNumber)
    .subscribe(response => {
      this.popular = this.popular.concat(response['results'])
      //console.log('newPopular', this.popular)
    })
}

  toFavorites(id: number) {
    this.movieService.getFavorites(id, this.popular, this.searchResults, null)
  }

  handleChange() {
    this.spinner.hide()
    if (this.searchStr.length <= this.minLength) {
      this.searchResults = null
    }
  }

  entered() {
    if (this.searchStr.length >= this.minLength) {
      this.movieService.getMovie(this.searchStr, this.searchPageNumber)
      .subscribe(response => {
        this.searchResults = response['results']
        this.totalPages = response['total_pages']
      })
    } else {
      this.validationError = true
    }
  }

  onScrollSearch() {
    if (this.searchPageNumber !== this.totalPages) {
      this.searchPageNumber++
      this.spinner.show()
      this.loadNextMoviesSearch(this.searchPageNumber)
      this.spinner.hide()
    }
  }

  loadNextMoviesSearch(searchPageNumber: number) {
    this.movieService.getMovie(this.searchStr, searchPageNumber)
    .subscribe(response => {
      this.searchResults = this.searchResults.concat(response['results'])
    })
  }
}



