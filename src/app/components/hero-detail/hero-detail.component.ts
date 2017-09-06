/**
 * Created by Alex on 05.09.2017.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import 'rxjs/add/operator/switchMap';

import { Hero } from '../../hero';

@Component({
    selector: 'hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.styl']
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
        this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero);
    }
    goBack(): void {
        this.location.back();
    }
    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
}
