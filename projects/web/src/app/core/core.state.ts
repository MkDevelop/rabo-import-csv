import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { RouterStateUrl } from './router/router.state';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  router: routerReducer
};

export const selectSettingsState =
  createFeatureSelector<AppState, SettingsState>('settings');

export const selectRouterState =
  createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
}
