export class Rol {
    _id: string;
    nombre: string;
    permisos: {
        usuarios?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        clientes?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        categorias?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        subcategorias?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        roles?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        ventas?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        proveedores?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        productos?: { agregar: boolean, eliminar: boolean, ver: boolean, modificar: boolean },
        reportes?: { ver: boolean },
    };
    descripcion: string;
    created_at: Date
    constructor(){
        this.permisos = {
            usuarios: { agregar: false, eliminar: false, ver: false, modificar: false },
            clientes: { agregar: false, eliminar: false, ver: false, modificar: false },
            categorias: { agregar: false, eliminar: false, ver: false, modificar: false },
            subcategorias: { agregar: false, eliminar: false, ver: false, modificar: false },
            roles: { agregar: false, eliminar: false, ver: false, modificar: false },
            ventas: { agregar: false, eliminar: false, ver: false, modificar: false },
            proveedores: { agregar: false, eliminar: false, ver: false, modificar: false },
            productos: { agregar: false, eliminar: false, ver: false, modificar: false },
            reportes: { ver: false }
        }
    }
}
