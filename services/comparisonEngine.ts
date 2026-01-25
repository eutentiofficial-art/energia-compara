import { 
  LeadData, 
  OfferLuce, 
  OfferGas, 
  OfferDual, 
  ComparisonResult, 
  ServiceType 
} from '../types';

/**
 * Comparison Engine Module
 * Responsabile del calcolo del risparmio e dell'individuazione delle migliori offerte.
 */

export class ComparisonEngine {
  /**
   * Calcola la spesa annua stimata per un'offerta Luce.
   */
  static calculateLuceAnnualCost(consumption: LeadData, offer: OfferLuce): number {
    const energyCost = offer.prezzo_kwh * consumption.consumo_luce_kwh;
    const fixedFees = offer.quota_fissa_mensile * 12;
    return energyCost + fixedFees - offer.bonus_attivazione;
  }

  /**
   * Calcola la spesa annua stimata per un'offerta Gas.
   */
  static calculateGasAnnualCost(consumption: LeadData, offer: OfferGas): number {
    const energyCost = offer.prezzo_smc * consumption.consumo_gas_smc;
    const fixedFees = offer.quota_fissa_mensile * 12;
    return energyCost + fixedFees - offer.bonus_attivazione;
  }

  /**
   * Calcola la spesa annua stimata per un'offerta Dual.
   */
  static calculateDualAnnualCost(consumption: LeadData, offer: OfferDual): number {
    const luceCost = offer.prezzo_kwh * consumption.consumo_luce_kwh;
    const gasCost = offer.prezzo_smc * consumption.consumo_gas_smc;
    const fixedFees = offer.quota_fissa_mensile * 12;
    return luceCost + gasCost + fixedFees - offer.bonus_attivazione;
  }

  /**
   * Funzione principale per ottenere il confronto di un'offerta specifica rispetto ai consumi dell'utente.
   */
  static compareOffer(
    consumption: LeadData, 
    offer: OfferLuce | OfferGas | OfferDual, 
    type: ServiceType
  ): ComparisonResult {
    const currentAnnualExpense = Number(consumption.spesa_mensile) * 12;
    let estimatedAnnual = 0;

    // Dispatch logic based on offer type
    if (type === 'luce') {
      estimatedAnnual = this.calculateLuceAnnualCost(consumption, offer as OfferLuce);
    } else if (type === 'gas') {
      estimatedAnnual = this.calculateGasAnnualCost(consumption, offer as OfferGas);
    } else if (type === 'dual') {
      estimatedAnnual = this.calculateDualAnnualCost(consumption, offer as OfferDual);
    }

    const savingsAnnual = currentAnnualExpense - estimatedAnnual;
    const newMonthlyExpense = estimatedAnnual / 12;

    return {
      offer_id: offer.id,
      offer_name: offer.nome_offerta,
      provider_name: offer.provider?.nome || 'Operatore Ignoto',
      tipo_offerta: type,
      spesa_annua_stimata: Number(estimatedAnnual.toFixed(2)),
      nuova_spesa_mensile: Number(newMonthlyExpense.toFixed(2)),
      risparmio_annuo: Number(savingsAnnual.toFixed(2)),
      esito: savingsAnnual > 0 ? 'positivo' : 'negativo',
      dettagli_offerta: offer
    };
  }

  /**
   * Task 1 Requirement: getBestOffer
   * Riceve i consumi e una lista di offerte candidate per restituire la migliore (quella con più risparmio).
   */
  static getBestOffer(
    consumption: LeadData,
    serviceType: ServiceType,
    availableOffers: (OfferLuce | OfferGas | OfferDual)[]
  ): ComparisonResult | null {
    if (!availableOffers || availableOffers.length === 0) return null;

    const comparisons = availableOffers.map(offer => 
      this.compareOffer(consumption, offer, serviceType)
    );

    // Ordina per risparmio decrescente
    comparisons.sort((a, b) => b.risparmio_annuo - a.risparmio_annuo);

    return comparisons[0];
  }
}
