export type ServiceType = 'luce' | 'gas' | 'dual';
export type CustomerType = 'privato' | 'azienda';
export type FunnelStep = 'profilo' | 'consumi' | 'email' | 'confronto' | 'anagrafica';

export interface Provider {
  id: string;
  nome: string;
  logo_url?: string;
  email_operatore?: string;
  attivo: boolean;
  created_at: string;
}

export interface BaseOffer {
  id: string;
  provider_id: string;
  nome_offerta: string;
  quota_fissa_mensile: number;
  durata_mesi?: number;
  bonus_attivazione: number;
  condizioni_url?: string;
  visibile: boolean;
  created_at: string;
  provider?: Provider;
}

export interface OfferLuce extends BaseOffer {
  tipo_tariffa: 'fissa' | 'variabile';
  prezzo_kwh: number;
  spread_pun?: number;
  green_energy: boolean;
  penale_recesso: boolean;
}

export interface OfferGas extends BaseOffer {
  tipo_tariffa: 'fissa' | 'variabile';
  prezzo_smc: number;
  spread_psv?: number;
  penale_recesso: boolean;
}

export interface OfferDual extends BaseOffer {
  prezzo_kwh: number;
  prezzo_smc: number;
}

export interface LeadData {
  id?: string;
  tipo_cliente: CustomerType;
  tipo_servizio: ServiceType;
  spesa_mensile: number;
  consumo_luce_kwh: number;
  consumo_gas_smc: number;
  email?: string;
  telefono?: string;
  nome?: string;
  cognome?: string;
}

export interface ContractData {
  codice_fiscale: string;
  indirizzo: string;
  cap: string;
  citta: string;
  provincia: string;
  pod?: string;
  pdr?: string;
  metodo_pagamento: 'iban' | 'bollettino' | 'carta';
  iban?: string;
}

export interface ComparisonResult {
  offer_id: string;
  offer_name: string;
  provider_name: string;
  tipo_offerta: ServiceType;
  spesa_annua_stimata: number;
  nuova_spesa_mensile: number;
  risparmio_annuo: number;
  esito: 'positivo' | 'negativo';
  dettagli_offerta: OfferLuce | OfferGas | OfferDual;
}
