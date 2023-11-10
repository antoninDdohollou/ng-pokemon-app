import { Injectable } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  getPokemonById(pokemonId: number): Pokemon|undefined{
    return POKEMONS.find(pokemon => pokemon.id == pokemonId);
  }
  getPokelonTypeList(): string[] {
    return [ 
      'Feu', 
      'Eau', 
      'Plante', 
      'Insecte', 
      'Normal', 
      'Vol', 
      'Poison', 
      'Fée', 
      'Psy', 
      'Electrik', 
      'Combat' 
    ];
  }
}
