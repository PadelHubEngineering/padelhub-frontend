import type { PartitaRetI, GiocatoreRetI } from "../partite/Partita.types";

export class PrenotazionePartitaRetI {
    pagato!: boolean;
    costo!: number;

    partita?: PartitaRetI;
    giocatore?: GiocatoreRetI;

    dataPrenotazione!: string
}
