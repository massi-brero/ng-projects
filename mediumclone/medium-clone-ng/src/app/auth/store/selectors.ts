import {createFeatureSelector} from "@ngrx/store";
import {AppStateInterface} from "../../shared/types/appState.interface";
import {AuthStateInterface} from "../types/authStateInterface";

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')
