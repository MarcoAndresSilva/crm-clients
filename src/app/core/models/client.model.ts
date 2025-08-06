export interface Client {
    _id?: string; // el id sera opcional al crear pero sera requerido al editar, lo generara mongoDB 
    name: string;
    company: string;
    email: string;
    phone?: string; // opcional
    createdAt?: Date; // la fecha de creacion sera opcional y la generara mongoDB
    updatedAt?: Date; // la fecha de actualizacion sera opcional y la generara mongoDB
}