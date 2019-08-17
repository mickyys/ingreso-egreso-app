import * as fromIngresoEgreso from './ingreso.egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducers';


export interface IngresoEgresoState {
    items : IngresoEgreso[];
}

export interface AppState extends AppState{
    ingresoEgreso : IngresoEgresoState
}

const estadoInciial : IngresoEgresoState = {
    items : []
}

export function IngresoEgresoReducers(state = estadoInciial, action : fromIngresoEgreso.acciones) : IngresoEgresoState {
    switch(action.type){
        case fromIngresoEgreso.SET_ITEMS :
            return {
                items : [...action.items.map(item => { return { ...item }}) ]
            };
        case fromIngresoEgreso.UNSET_ITEMS :    
            return {
                items : []
            };
        case fromIngresoEgreso.UNSET_ITEM : 
            return {
                items : action.items.filter(x => x.uid != action.uid) 
            };
        default :
            return state;
    }
}