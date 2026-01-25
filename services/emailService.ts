import emailjs from '@emailjs/browser';

/**
 * Email Service con EmailJS
 * Gestisce l'invio delle email di conferma al cliente e notifica all'admin
 */

// Configurazione EmailJS
const EMAILJS_CONFIG = {
  publicKey: 'wyGyW0nMt_dLVwEo3',
  serviceId: 'service_6r5jntl',
  templateCustomer: 'template_contract',
  templateAdmin: 'template_lead'
};

export class EmailService {
  /**
   * Inizializza EmailJS con la public key
   */
  private static init() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  /**
   * Invia email di conferma al cliente
   */
  private static async sendCustomerEmail(leadData: any, contractData: any, offerName: string, savings: number) {
    this.init();

    const templateParams = {
      customer_name: `${leadData.nome} ${leadData.cognome}`,
      customer_email: leadData.email,
      offer_name: offerName,
      address: contractData.indirizzo,
      city: contractData.citta,
      cap: contractData.cap,
      savings: savings.toFixed(0),
      to_email: leadData.email
    };

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateCustomer,
        templateParams
      );
      console.log('Email cliente inviata con successo:', response);
      return true;
    } catch (error) {
      console.error('Errore invio email cliente:', error);
      return false;
    }
  }

  /**
   * Invia email di notifica all'admin
   */
  private static async sendAdminEmail(leadData: any, contractData: any, offerName: string) {
    this.init();

    const templateParams = {
      customer_name: `${leadData.nome} ${leadData.cognome}`,
      customer_email: leadData.email,
      customer_phone: leadData.telefono || 'Non fornito',
      codice_fiscale: contractData.codice_fiscale,
      offer_name: offerName,
      address: contractData.indirizzo,
      cap: contractData.cap,
      city: contractData.citta,
      provincia: contractData.provincia,
      pod: contractData.pod || 'Non fornito',
      pdr: contractData.pdr || 'Non fornito',
      payment_method: contractData.metodo_pagamento,
      iban: contractData.iban || 'N/A',
      lead_id: leadData.id || 'N/A'
    };

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateAdmin,
        templateParams
      );
      console.log('Email admin inviata con successo:', response);
      return true;
    } catch (error) {
      console.error('Errore invio email admin:', error);
      return false;
    }
  }

  /**
   * Metodo principale: invia entrambe le email
   */
  static async sendContractEmails(leadData: any, contractData: any, offerName: string, savings: number = 0) {
    try {
      console.log('Invio email tramite EmailJS...');

      // Invia email al cliente
      const customerSent = await this.sendCustomerEmail(leadData, contractData, offerName, savings);
      
      // Invia email all'admin
      const adminSent = await this.sendAdminEmail(leadData, contractData, offerName);

      if (customerSent && adminSent) {
        console.log('Entrambe le email inviate con successo!');
        return true;
      } else {
        console.warn('Una o entrambe le email non sono state inviate');
        return false;
      }
    } catch (error) {
      console.error('Errore critico nel servizio email:', error);
      return false;
    }
  }
}
