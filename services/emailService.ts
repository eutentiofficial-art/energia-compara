import { supabase } from './supabase';

/**
 * Email Service
 * Responsabile dell'invio delle email tramite invocazione della Supabase Edge Function 'send-contract'.
 */

export class EmailService {
  /**
   * Invia le email di contratto al cliente e all'amministratore.
   * La logica di invio effettiva è gestita lato server nella Edge Function per sicurezza.
   */
  static async sendContractEmails(leadData: any, contractData: any, offerName: string) {
    try {
      console.log('Invocazione Edge Function "send-contract" per:', leadData.email);
      
      const { data, error } = await supabase.functions.invoke('send-contract', {
        body: { 
          leadData, 
          contractData, 
          offerName 
        },
      });

      if (error) {
        console.error('Errore durante l\'invocazione della funzione Supabase:', error);
        return false;
      }

      if (data?.success) {
        console.log('Edge Function eseguita con successo:', data.message);
        return true;
      } else {
        console.warn('La Edge Function ha risposto con un errore logico:', data?.error);
        return false;
      }
    } catch (err) {
      console.error('Errore imprevisto durante la chiamata al servizio email:', err);
      return false;
    }
  }
}
