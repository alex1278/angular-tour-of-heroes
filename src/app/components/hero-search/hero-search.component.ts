/**
 * Created by Alex on 07.09.2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extentions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../../services/hero-search.service';
import { Hero } from '../../hero';

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.styl'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();
    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router) {}

        // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300) // wait 300ms each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search is same as previous
            .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
            // returne the http search observable
            // or the observable of empty heroes if there was no search term
            .catch(error => {
                // TODO: add real erro hanling
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
