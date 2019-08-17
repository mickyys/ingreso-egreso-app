
import { IngresoEgreso } from './ingreso-egreso.model';
import { Action } from '@ngrx/store';

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';
export const UNSET_ITEM = '[Ingreso Egreso] Unset Item';

export class SetItemsAction implements Action{
    readonly type = SET_ITEMS;
    constructor(public items : IngresoEgreso[]){}
}

export class UnSetItemsAction implements Action{
    readonly type = UNSET_ITEMS;
}

export class UnSetItemAction implements Action{
    readonly type = UNSET_ITEM;
    constructor(public items : IngresoEgreso[], public uid : string){}
}

export type acciones = SetItemsAction | 
                       UnSetItemsAction |
                       UnSetItemAction
                       ; 