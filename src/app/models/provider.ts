export class Provider {
    _id?: string;
    nombre: string;
    telefono: string;
    direccion?: string;
    productos: [{
        producto: string
        precio: number
    }];
    created_at?: string;
}
