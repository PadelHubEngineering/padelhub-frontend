export enum Genere {
    Maschio = "Maschio",
    Femmina = "Femmina",
    Altro = "Altro"
}

export type Utente = {
    nome: string,
    cognome: string,
    email: string,
    telefono: string,
    nickname: string,
    password: string,
    dataDiNascita: Date, // E un date
    genere: Genere,
    livello: number,
    foto: string, // È una stringa in base64
    tagTelegram: string,
    confPassword: string,
}