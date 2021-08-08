import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {movieData} from "../shared/interfaces";

@Injectable({providedIn: 'root'})


export class MovieService {

  public keys: any[] = []

  constructor(private http: HttpClient) {
  }


  getMovie(movieName: string): Observable<any> {
    return this.http.get<any>
    (      `${environment.searchUrl}${movieName}!&api_key=${environment.apiKey}`)
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>
    (`${environment.detailsUrl}${id}?api_key=${environment.apiKey}&language=en-US`)
  }

  getMovieRecommendations(id: number): Observable<any> {
    return this.http.get<movieData[]>
    (`${environment.detailsUrl}${id}/recommendations?api_key=${environment.apiKey}&language=en-US&page=1`)
  }

  getFavorites(id: number, popular?: movieData[], found?: movieData[], movieDetails?: {}) {
    for (let i in popular) {
      if (popular[i].id === id) {
        localStorage.setItem(`${id}`, JSON.stringify(popular[i]))
      }
    }
    for (let i in found) {
      if (found[i].id === id) {
        localStorage.setItem(`${id}`, JSON.stringify(found[i]))
      }
    }
    if (movieDetails !== null) {
    localStorage.setItem(`${id}`, JSON.stringify(movieDetails))
    }
  }

  inFavorites(id?: number) {

      for (let i = 0; i < localStorage.length; i++) {
        this.keys.push(localStorage.key(i))
      }

      let equal = this.keys.find(keys => keys == id)
      if (equal) {
        return true
      } else {
        return false
      }
    }


}
