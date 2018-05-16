import { Component, OnInit } from '@angular/core';
// import { HEROES } from '../mock-heroes';
// use HeroServices instead
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero = 'Windstorm';
  // change hero from a string to an object.
  // heroes = HEROES;

  heroes: Hero[];

  // selectedHero: Hero;

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  constructor(private heroService: HeroService) { }
  // parameter simultaneously defines a private heroService property and
  // identifies it as a HeroService injection site.

  // When Angular creates a HeroesComponent,
  // the Dependency Injection system sets the
  // heroService parameter to the singleton instance of HeroService.
  ngOnInit() {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // to retrieve the heroes from the service.

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();

    // HeroService.getHeroes() method has a synchronous signature,
    // which implies that the HeroService can fetch heroes synchronously

    // The HeroService must wait for the server to respond,
    // getHeroes() cannot return immediately with hero data,
    // and the browser will not block while the service waits.

    // HeroService.getHeroes() must have an asynchronous signature of some kind
    // It can take a callback.
    // It could return a Promise or an Observable.
    // use the Angular HttpClient.get method to fetch the heroes and
    // HttpClient.get() returns an Observable.

  // }

  // While you could call getHeroes() in the constructor,
  // that's not the best practice.

  // Reserve the constructor for simple initialization
  // such as wiring constructor parameters to properties.
  // The constructor shouldn't do anything.
  // It certainly shouldn't call a function that makes
  //  HTTP requests to a remote server as a real data service would.

  // Instead, call getHeroes() inside the ngOnInit lifecycle hook and
  // let Angular call ngOnInit at an appropriate time after
  // constructing a HeroesComponent instance.

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  // This method now waits for the Observable to emit the array of heroes—
  // which could happen now or several minutes from now.
  // Then subscribe passes the emitted array to the callback,
  // which sets the component's heroes property.

  // This asynchronous approach will work when
  // the HeroService requests heroes from the server.
}
