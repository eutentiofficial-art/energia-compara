// Fix: Removed problematic 'deno.ns' reference that cannot be resolved by the current compiler environment.
// Fix: Declared the Deno global object to satisfy TypeScript 'Cannot find name' errors while maintaining compatibility with the Supabase Edge Function runtime.
declare const Deno: any;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Gestione preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { leadData, contractData, offerName } = await req.json()
    // The Deno object is provided by the Supabase Edge Function environment at runtime.
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

    if (!RESEND_API_KEY) {
      console.error('Configurazione mancante: RESEND_API_KEY non trovata nelle variabili d\'ambiente.')
      throw new Error('Errore di configurazione server.')
    }

    // 1. Invia Email di conferma al Cliente
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Energy Comparison <noreply@tuodominio.it>',
        to: [leadData.email],
        subject: `Richiesta Ricevuta: ${offerName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 40px; border: 1px solid #e2e8f0; border-radius: 24px;">
            <h2 style="color: #4f46e5; font-size: 24px; font-weight: 800; margin-bottom: 16px;">Ciao ${leadData.nome || 'Cliente'},</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">Grazie per aver scelto il nostro servizio di comparazione. Abbiamo ricevuto con successo la tua richiesta per l'offerta <strong>${offerName}</strong>.</p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">Un nostro consulente specializzato analizzerà i dati tecnici forniti e ti contatterà telefonicamente entro 24/48 ore lavorative per guidarti nell'attivazione finale.</p>
            <div style="margin-top: 32px; padding: 24px; bg-color: #f8fafc; border-radius: 16px; background: #f8fafc;">
              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 12px;">Riepilogo della richiesta</h3>
              <p style="margin: 4px 0; color: #1e293b;"><strong>Offerta:</strong> ${offerName}</p>
              <p style="margin: 4px 0; color: #1e293b;"><strong>Indirizzo:</strong> ${contractData.indirizzo}, ${contractData.citta}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">Questa è una comunicazione automatica generata dal sistema Energy Comparison Engine. Si prega di non rispondere a questa email.</p>
          </div>
        `,
      }),
    })

    // 2. Invia Email con dati tecnici all'Amministratore
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Energy CRM <crm@tuodominio.it>',
        to: ['mia-email@esempio.com'],
        subject: `[NUOVA PRATICA] - ${leadData.nome} ${leadData.cognome} (${leadData.email})`,
        html: `
          <div style="font-family: monospace; padding: 20px; background: #111; color: #0f0; border-radius: 8px;">
            <h2 style="color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px;">DATI PRATICA ENERGETICA</h2>
            
            <p><strong>[CLIENTE]</strong></p>
            <p>Nome/Cognome: ${leadData.nome} ${leadData.cognome}</p>
            <p>Email: ${leadData.email}</p>
            <p>Telefono: ${leadData.telefono}</p>
            <p>Codice Fiscale: ${contractData.codice_fiscale}</p>
            
            <p style="margin-top: 20px;"><strong>[OFFERTA SELEZIONATA]</strong></p>
            <p>Nome Offerta: ${offerName}</p>
            
            <p style="margin-top: 20px;"><strong>[DATI TECNICI FORNITURA]</strong></p>
            <p>Indirizzo: ${contractData.indirizzo}</p>
            <p>Città: ${contractData.cap} ${contractData.citta} (${contractData.provincia})</p>
            <p>POD (Luce): ${contractData.pod || 'NON FORNITO'}</p>
            <p>PDR (Gas): ${contractData.pdr || 'NON FORNITO'}</p>
            
            <p style="margin-top: 20px;"><strong>[PAGAMENTO]</strong></p>
            <p>Metodo: ${contractData.metodo_pagamento}</p>
            <p>IBAN: ${contractData.iban || 'N/A'}</p>
            
            <p style="margin-top: 30px; border-top: 1px solid #333; padding-top: 10px; color: #888; font-size: 10px;">ID LEAD: ${leadData.id || 'N/A'}</p>
          </div>
        `,
      }),
    })

    const customerData = await customerEmailResponse.json()
    const adminData = await adminEmailResponse.json()

    if (!customerEmailResponse.ok || !adminEmailResponse.ok) {
      console.error('Dettagli errore Resend (Customer):', customerData)
      console.error('Dettagli errore Resend (Admin):', adminData)
      throw new Error('Errore durante l\'invio delle email tramite Resend.')
    }

    console.log(`Successo: Pratica inviata per ${leadData.email}. CustomerID: ${customerData.id}, AdminID: ${adminData.id}`)

    return new Response(JSON.stringify({ success: true, message: 'Processo completato' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Critical Function Error:', error.message)
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})