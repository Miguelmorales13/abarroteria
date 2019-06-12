export class Sale {
    _id?: string;
    total: number;
    cliente: any;
    vendedor: any;
    estatus: string;
    // estado: any;
    productos: [{
        producto: string,
        cantidad: number
    }];
    created_at: Date;
}
