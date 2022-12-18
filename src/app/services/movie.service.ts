import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMovieDetails, IResponse } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(pageNumber: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.popularUrl}api_key=${environment.apiKey}&language=en-US&page=${pageNumber}`
    );
  }

  getSearchedMovie(
    movieName: string,
    pageNumber: number
  ): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.searchUrl}${movieName}!&api_key=${environment.apiKey}&language=en-US&page=${pageNumber}`
    );
  }

  getMovieDetails(id: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(
      `${environment.detailsUrl}${id}?api_key=${environment.apiKey}&language=en-US`
    );
  }

  getMovieRecommendations(
    id: number,
    pageNumber: number
  ): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.detailsUrl}${id}/recommendations?api_key=${environment.apiKey}&language=en-US&page=${pageNumber}`
    );
  }

  inFavorites(id: number) {
    return Object.keys(localStorage).some((el) => el === `${id}`);
  }
}
