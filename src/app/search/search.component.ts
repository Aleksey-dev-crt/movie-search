import { Component, OnInit, HostListener } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { IMovieData } from '../shared/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchStr = '';
  minLength = 3;
  validationError: boolean;
  popular = [] as IMovieData[];
  searchResults = [] as IMovieData[];
  pageNumber = 1;
  searchPageNumber = 1;
  totalPages: number;
  scrollUpBtn = false;

  constructor(
    public movieService: MovieService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initMovies();
  }

  initMovies() {
    this.movieService.getMovies(this.pageNumber).subscribe(
      (response) => {
        this.popular = response.results;
        this.totalPages = response.total_pages;
      },
      (err) => console.error('Observer got an error: ' + err)
    );
  }

  @HostListener('window:scroll', ['$event']) scrollPage() {
    if (window.scrollY > 1000) {
      this.scrollUpBtn = true;
    } else {
      this.scrollUpBtn = false;
    }
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }

  onScroll() {
    if (this.pageNumber !== this.totalPages) {
      this.pageNumber++;
      this.loadNextMovies(this.pageNumber);
    }
  }

  loadNextMovies(pageNumber: number) {
    this.spinner.show();
    this.movieService.getMovies(pageNumber).subscribe(
      (response) => (this.popular = this.popular.concat(response.results)),
      (err) => console.error('Observer got an error: ' + err),
      () => this.spinner.hide()
    );
  }

  toFavorites(movie: IMovieData) {
    localStorage.setItem(`${movie.id}`, JSON.stringify(movie));
  }

  handleChange() {
    if (this.searchStr.length <= this.minLength) {
      this.searchResults = null;
    }
  }

  entered() {
    if (this.searchStr.length >= this.minLength) {
      this.movieService
        .getSearchedMovie(this.searchStr, this.searchPageNumber)
        .subscribe(
          (response) => {
            this.searchResults = response.results;
            this.totalPages = response.total_pages;
          },
          (err) => console.error('Observer got an error: ' + err)
        );
    } else {
      this.validationError = true;
    }
  }

  onScrollSearch() {
    if (this.searchPageNumber !== this.totalPages) {
      this.searchPageNumber++;
      this.loadNextMoviesSearch(this.searchPageNumber);
    }
  }

  loadNextMoviesSearch(searchPageNumber: number) {
    this.spinner.show();
    this.movieService
      .getSearchedMovie(this.searchStr, searchPageNumber)
      .subscribe(
        (response) =>
          (this.searchResults = this.searchResults.concat(response.results)),
        (err) => console.error('Observer got an error: ' + err),
        () => this.spinner.hide()
      );
  }
}
