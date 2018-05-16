// Components shouldn't fetch or
// save data directly and they certainly shouldn't knowingly present fake data.
// They should focus on presenting data and delegate data access to a service.

// create a HeroService that all application classes can use to get heroes. Instead of creating that service with new,
// you'll rely on Angular dependency injection to inject it into the HeroesComponent constructor.
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// Observable is one of the key classes in the RxJS library.
// simulate getting data from the server with the RxJS of() function.
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  // make the HeroService available to the dependency injection system
  // before Angular can inject it into the HeroesComponen
  // do this by registering a provider.
  // A provider is something that can create or deliver a service;
  // in this case, it instantiates the HeroService class to provide the service.
  providedIn: 'root'
  // When you provide the service at the root level,
  // Angular creates a single, shared instance of HeroService
  // and injects into any class that asks for it.
  // Registering the provider in the @Injectable metadata also allows
  // Angular to optimize an app by removing the service if it turns out
  // not to be used after all.

  // you can register providers at different levels:
  // in the HeroesComponent, in the AppComponent, in the AppModule.
  // EX: ng generate service hero --module=app
})
// @Injectable marks the class as one that participates in the dependency injection system.
//  The HeroService class is going to provide an injectable service,
// and it can also have its own injected dependencies. It doesn't have any dependencies yet

// The @Injectable() decorator accepts a metadata object for the service,
// the same way the @Component() decorator did for your component classes.
export class HeroService {

  constructor(private messageService: MessageService) { }
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }
  // of(HEROES) returns an Observable<Hero[]>
  // that emits a single value, the array of mock heroes.

  // call HttpClient.get<Hero[]>()
  // which also returns an Observable<Hero[]>
  // that emits a single value,
  // an array of heroes from the body of the HTTP response.

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
