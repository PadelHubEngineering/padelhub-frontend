

export class PartitaRetI {
    orario!: string
    giocatori!: GiocatoreRetI[]
    categoria_max!: number
    categoria_min!: number
    _id!: string
    circolo?: CircoloRetI
    tipoCampo!: string
}

export class CircoloRetI {
    _id!: string
    nome!: string
    durataSlot!: number
    costoPrenotazione!: number
}

export type GiocatoreRetI = {
    nome: string,
    cognome: string,
    nickname: string,
    foto: string,
    email: string
}

export type PartiteAperteI = {
    giaPrenotato: boolean,
    partite: PartitaRetI[],
    circolo: CircoloRetI,
    isAffiliato: boolean
}

function getLivello(n: number) {
    switch(n){
        case 1:
            return "Principante"
        case 2:
            return "Esordiente"
        case 3:
            return "Intermedio"
        case 4:
            return "Avanzato"
        case 5:
            return "Esperto"
        default: return ""
    }
}

export function stampaCategorie( categoria_min: number, categoria_max: number) {

    categoria_min = parseInt( categoria_min.toString() )
    categoria_max = parseInt( categoria_max.toString() )

    let ret: string[] = []

    console.log(categoria_min)
    console.log(categoria_max)

    if( categoria_min === categoria_max )
        return getLivello( categoria_min )

    for( let i=categoria_min;i<=categoria_max;i++ ){
        ret.push( getLivello(i) )
    }

    return ret.join(", ")

}
