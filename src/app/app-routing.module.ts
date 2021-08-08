import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchComponent} from "./search/search.component";
import {MoviePageComponent} from "./movie-page/movie-page.component";
import {FavoritesPageComponent} from "./favorites-page/favorites-page.component";

const routes: Routes = [
      {path: '', component: SearchComponent},
      {path: 'moviePage/:id', component: MoviePageComponent},
      {path: 'favoritesPage', component: FavoritesPageComponent},
      {path: '**', redirectTo: '/'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
