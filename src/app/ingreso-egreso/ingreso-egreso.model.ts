export class IngresoEgreso {
    descripcion : string;
    monto : number;
    tipo : string;
    uid? : string;

    constructor(obj : objIngresoEgreso){
        this.descripcion = obj && obj.descripcion || null;
        this.monto = obj && obj.monto || null;
        this.tipo = obj && obj.tipo || null;
    }
}

interface objIngresoEgreso{
    descripcion : string,
    monto : number;
    tipo : string;
}