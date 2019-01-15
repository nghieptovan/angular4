import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import * as fromRoot from '../index';
import * as categories from './categories.actions';
import { CategoryService } from './categories.service';

@Injectable()
export class CategoryEffects {
    constructor(private _actions: Actions,
        private httpService: HttpService,
        private categoryService: CategoryService,
        private store: Store<fromRoot.AppState>) {
    }

    @Effect() loadCategories$ = this._actions.ofType(categories.LOAD)
        .switchMap((action) => {
            return this.categoryService.loadCategoryById(action.payload.id)
                .map((result) => {
                    if (result.json() && result.json().length) {
                        return new categories.LoadSuccess({ categories: result.json()[0], selectedId: action.payload.selectedId });
                    } else {
                        return new categories.LoadSuccess({ categories: {}, selectedId: 0 });
                    }
                }).catch((error) => {
                    return Observable.of(new categories.LoadFailed(error));
                });
        });

    @Effect() loadFacets$ = this._actions.ofType(categories.LOAD_FACETS)
        .switchMap((action) => {
            return this.categoryService.getElsCategory(action.payload.id)
                .map((result) => {
                    const temp = result.json();
                    if (temp) {
                        return new categories.LoadFacetsSuccess({ facets: temp.facets});
                    } else {
                        return Observable.of(new categories.LoadFacetsFailed(null));
                    }
                }).catch((error) => {
                    return Observable.of(new categories.LoadFailed(error));
                });
        });
}
