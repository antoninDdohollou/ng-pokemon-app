import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit{
  // {}
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // attendre 300ms de pause entre chaque requête {...."a"."ab"..."abz"."ab"...."abc"....}
      debounceTime(300),
      // ignorer la recherche en cours si c'est la même que la précédente {....."ab"...."ab"...."abc"....}
      distinctUntilChanged(),
      // on retourne la liste des résultats correpsondant aux termes de la recherche {....."ab"........"abc"....}
      switchMap((term) => this.pokemonService.searchPokemonList(term))

    )
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
