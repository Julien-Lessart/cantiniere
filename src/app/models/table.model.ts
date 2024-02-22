export interface tableCompte{
    jour:string;
    designation:string;
    prix:string;
}
export interface tableEditCarte{
    designation:string;
    prix:string;
}
export interface tableSearchUser{
    nom:string;
    prenom:string;
    email:string;
}

/**
 * Champs ne pas afficher string vide
 * les boolean pour les interactions utlisateur
 */
export interface table{
    nom:string;
    prenom:string;
    email:string;
    jour:string;
    designation:string;
    prix:string;
    modification:boolean;
    delete:boolean;
    compte:boolean;
}