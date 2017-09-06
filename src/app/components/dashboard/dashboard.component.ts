/**
 * Created by Alex on 05.09.2017.
 */
import { Component, OnInit } from '@angular/core';

import { Hero } from '../../hero';
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {
    constructor(private heroService: HeroService) {}
    heroes: Hero[] = [];

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
