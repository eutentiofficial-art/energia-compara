import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Flame, LayoutGrid, Building2, User, Mail, ShieldCheck, 
  CheckCircle2, AlertCircle, ArrowRight, Loader2, Phone, 
  Check, CreditCard as CardIcon, FileCheck,
  Info, ChevronDown, TrendingDown, FileText
} from 'lucide-react';
import { LeadData, ServiceType, ComparisonResult, OfferLuce, OfferGas, OfferDual, ContractData } from '../types';
import { ComparisonEngine } from '../services/comparisonEngine';
import { supabase } from '../services/supabase';
import { EmailService } from '../services/emailService';

const PROVINCE_ITALIANE = [
  "AG", "AL", "AN", "AO", "AQ", "AR", "AP", "AT", "AV", "BA", "BT", "BL", "BN", "BG", "BI", "BO", "BZ", "BS", "BR", "CA", "CL", "CB", "CE", "CT", "CZ", "CH", "CO", "CS", "CR", "KR", "CN", "EN", "FM", "FE", "FI", "FG", "FC", "GE", "GO", "GR", "IM", "IS", "SP", "LT", "LE", "LC", "LI", "LO", "LU", "MC", "MN", "MS", "MT", "ME", "MI", "MO", "MB", "NA", "NO", "NU", "OR", "PD", "PA", "PR", "PV", "PG", "PU", "PE", "PC", "PI", "PT", "PN", "PZ", "PO", "RG", "RA", "RC", "RE", "RI", "RN", "RM", "RO", "SA", "SS", "SV", "SI", "SR", "SO", "TA", "TE", "TR", "TO", "TP", "TN", "TV", "TS", "UD", "VA", "VE", "VB", "VC", "VR", "VV", "VI", "VT"
];

const MOCK_OFFERS: (OfferLuce | OfferGas | OfferDual)[] = [
  { 
    id: '1', provider_id: 'p1', nome_offerta: 'Eco-Green Fix', tipo_tariffa: 'fissa', 
    prezzo_kwh: 0.12, quota_fissa_mensile: 10, bonus_attivazione: 50, 
    green_energy: true, penale_recesso: false, visibile: true, created_at: '', 
    provider: { id: 'p1', nome: 'GreenNetwork', attivo: true, created_at: '' } 
  } as OfferLuce,
  { 
    id: '2', provider_id: 'p2', nome_offerta: 'Gas Safe Plus', tipo_tariffa: 'fissa', 
    prezzo_smc: 0.45, quota_fissa_mensile: 12, bonus_attivazione: 30, 
    penale_recesso: false, visibile: true, created_at: '', 
    provider: { id: 'p2', nome: 'Plenitude', attivo: true, created_at: '' } 
  } as OfferGas,
  { 
    id: '3', provider_id: 'p3', nome_offerta: 'Combo Relax', 
    prezzo_kwh: 0.11, prezzo_smc: 0.42, quota_fissa_mensile: 18, 
    bonus_attivazione: 80, visibile: true, created_at: '', 
    provider: { id: 'p3', nome: 'Eni', attivo: true, created_at: '' } 
  } as OfferDual
];

async function loadOffersFromDB(serviceType: ServiceType): Promise<(OfferLuce | OfferGas | OfferDual)[]> {
  try {
    let tableName = '';
    if (serviceType === 'luce') tableName = 'offers_luce';
    else if (serviceType === 'gas') tableName = 'offers_gas';
    else if (serviceType === 'dual') tableName = 'offers_dual';
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*, provider:providers(*)')
      .eq('visibile', true);
    
    if (error) {
      console.error('Errore caricamento offerte:', error);
      return MOCK_OFFERS.filter(o => {
        if (serviceType === 'luce') return 'prezzo_kwh' in o && !('prezzo_smc' in o);
        if (serviceType === 'gas') return 'prezzo_smc' in o && !('prezzo_kwh' in o);
        return 'prezzo_kwh' in o && 'prezzo_smc' in o;
      });
    }
    
    console.log('Offerte caricate da DB:', data);
    return data || [];
  } catch (err) {
    console.error('Errore critico:', err);
    return MOCK_OFFERS;
  }
}

const Step1Profile = ({ data, updateData, nextStep }: any) => {
  const services = [
    { id: 'luce', label: 'Luce', icon: Zap },
    { id: 'gas', label: 'Gas', icon: Flame },
    { id: 'dual', label: 'Luce + Gas', icon: LayoutGrid }
  ];
  const clients = [
    { id: 'privato', label: 'Privato', icon: User },
    { id: 'azienda', label: 'Azienda', icon: Building2 }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Cosa vuoi confrontare?</h2>
        <p className="text-slate-500 text-sm">Personalizza la tua ricerca energetica</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-3 ml-1 tracking-widest">Tipo di Servizio</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {services.map((s) => (
              <button 
                key={s.id} 
                onClick={() => updateData({ tipo_servizio: s.id as ServiceType })} 
                className={`p-4 md:p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 md:gap-3 ${data.tipo_servizio === s.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
              >
                <s.icon className="w-6 h-6 md:w-8 md:h-8" />
                <span className="font-bold text-sm md:text-base">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-3 ml-1 tracking-widest">Tipo di Profilo</p>
          <div className="grid grid-cols-2 gap-3">
            {clients.map((c) => (
              <button 
                key={c.id} 
                onClick={() => updateData({ tipo_cliente: c.id as any })} 
                className={`p-3 md:p-5 rounded-xl border-2 transition-all flex flex-row items-center justify-center gap-2 ${data.tipo_cliente === c.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
              >
                <c.icon size={18} />
                <span className="font-bold text-sm">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={nextStep} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl transition-all transform hover:-translate-y-1">
        Continua
      </button>
    </div>
  );
};

const Step2Consumption = ({ data, updateData, onFinish, isSaving }: any) => {
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const offers = await loadOffersFromDB(data.tipo_servizio);
      
      if (!offers || offers.length === 0) {
        alert('Nessuna offerta disponibile per questo servizio al momento.');
        setLoading(false);
        return;
      }
      
      const best = ComparisonEngine.getBestOffer(data, data.tipo_servizio, offers);
      
      if (onFinish && best) {
        onFinish(best);
      }
    } catch (err) {
      console.error('Errore calcolo:', err);
      alert('Errore durante il calcolo. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = data.email && data.email.includes('@') && data.email.length > 5;
  const isConsumptionValid = data.spesa_mensile > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">I tuoi consumi</h2>
        <p className="text-slate-500">Calcoliamo il risparmio sui dati reali</p>
      </div>
      
      <div className="space-y-5">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2 ml-1">Spesa media mensile attuale (€)</label>
          <input 
            type="number" 
            value={data.spesa_mensile || ''} 
            onChange={(e) => updateData({ spesa_mensile: Number(e.target.value) })} 
            placeholder="Es. 80" 
            className="w-full p-4 bg-white border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none transition-all text-slate-800 shadow-sm" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.tipo_servizio === 'luce' || data.tipo_servizio === 'dual') && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">kWh annui</label>
              <input 
                type="number" 
                value={data.consumo_luce_kwh || ''} 
                onChange={(e) => updateData({ consumo_luce_kwh: Number(e.target.value) })} 
                placeholder="2700" 
                className="w-full p-3 bg-white border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none" 
              />
            </div>
          )}

          {(data.tipo_servizio === 'gas' || data.tipo_servizio === 'dual') && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 ml-1">SMC annui</label>
              <input 
                type="number" 
                value={data.consumo_gas_smc || ''} 
                onChange={(e) => updateData({ consumo_gas_smc: Number(e.target.value) })} 
                placeholder="1200" 
                className="w-full p-3 bg-white border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none" 
              />
            </div>
          )}
        </div>

        <div className="relative group">
          <label className="block text-[10px] uppercase font-bold text-indigo-600 mb-1 ml-1">Email per i risultati</label>
          <div className="relative">
            <input 
              type="email" 
              value={data.email || ''} 
              onChange={(e) => updateData({ email: e.target.value })} 
              placeholder="esempio@email.it" 
              className="w-full p-4 pl-12 bg-white border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none transition-all text-lg shadow-sm" 
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={20} />
          </div>
        </div>
      </div>

      <button 
        onClick={handleCalculate} 
        disabled={isSaving || loading || !isConsumptionValid || !isEmailValid} 
        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl"
      >
        {(isSaving || loading) ? <Loader2 className="animate-spin" size={20} /> : <>Calcola Risparmio <ArrowRight size={20} /></>}
      </button>
    </div>
  );
};
const Step4Result = ({ result, currentMonthly, phone, setPhone, nextStep, isSaving }: any) => {
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\+\-\(\)]{9,15}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 9;
  };

  const isPhoneValid = phone && validatePhone(phone);
  const currentAnnual = currentMonthly * 12;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          <CheckCircle2 size={14} /> Analisi Completata
        </div>
        <h2 className="text-3xl font-black text-slate-900 leading-tight">Ottima notizia!</h2>
      </div>

      <div className="flex flex-col bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100">
        <div className="bg-slate-50 p-6 flex flex-col items-center justify-center border-b border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tua spesa attuale indicata</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-base font-medium">€</span>
            <span className="text-2xl font-bold line-through">{currentAnnual.toFixed(0)}</span>
            <span className="text-[10px] uppercase font-bold opacity-70">/ anno</span>
          </div>
        </div>

        <div className="bg-emerald-100 p-8 flex flex-col items-center justify-center relative border-b border-emerald-200/50">
          <div className="absolute inset-0 bg-emerald-200/20 pointer-events-none" />
          
          <span className="text-[11px] font-black text-emerald-700 uppercase tracking-[0.3em] mb-2 relative z-10">Nuova spesa annua stimata</span>
          
          <div className="flex items-center justify-center gap-2 text-emerald-700 relative z-10">
            <span className="text-3xl font-black mb-2">€</span>
            <span className="text-7xl font-black tracking-tighter">{Math.round(result.spesa_annua_stimata)}</span>
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 bg-emerald-600 text-white px-8 py-3 rounded-full font-black text-base uppercase tracking-widest shadow-xl flex items-center gap-3 relative z-10 border-2 border-emerald-400/50"
          >
            <TrendingDown size={20} />
            Risparmio di € {result.risparmio_annuo.toFixed(0)}
          </motion.div>

          <TrendingDown size={120} className="absolute right-[-20px] bottom-[-20px] text-emerald-600/5 rotate-[-15deg]" />
        </div>

        <div className="p-8 flex flex-col items-center justify-center bg-white">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nuova rata mensile stimata</span>
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="text-3xl font-black mb-2">€</span>
            <span className="text-6xl font-black tracking-tight">{result.nuova_spesa_mensile.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-5 bg-blue-50/50 p-8 rounded-3xl border border-blue-100 shadow-sm">
        <div className="text-center">
          <h4 className="font-black text-blue-700 text-xl leading-tight">Sblocca subito questa offerta esclusiva per te</h4>
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mt-2 flex items-center justify-center gap-1">
            <ShieldCheck size={14} /> Attivazione assistita gratuita al 100%
          </p>
        </div>
        <div className="relative group">
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Il tuo numero di cellulare" 
            className="w-full p-4 pl-12 bg-white border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all text-lg font-bold shadow-sm group-focus-within:shadow-md" 
          />
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
        </div>
        <button 
          onClick={nextStep} 
          disabled={isSaving || !isPhoneValid}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <>Conferma e Sblocca <ArrowRight size={20} /></>}
        </button>
      </div>
    </div>
  );
};

const Step6OfferDetail = ({ result, nextStep }: any) => {
  const offer = result.dettagli_offerta;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl font-black text-indigo-600 shadow-sm border border-slate-100 shrink-0">
          {result.provider_name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 leading-tight">{offer.nome_offerta}</h2>
          <p className="text-indigo-600 text-sm font-bold">{result.provider_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
          <p className="text-[10px] uppercase font-bold text-slate-400">Prezzo Luce</p>
          <p className="text-lg font-black text-slate-800">{('prezzo_kwh' in offer) ? `€ ${offer.prezzo_kwh}/kWh` : 'N/A'}</p>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
          <p className="text-[10px] uppercase font-bold text-slate-400">Prezzo Gas</p>
          <p className="text-lg font-black text-slate-800">{('prezzo_smc' in offer) ? `€ ${offer.prezzo_smc}/SMC` : 'N/A'}</p>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
          <p className="text-[10px] uppercase font-bold text-slate-400">Costi Fissi</p>
          <p className="text-lg font-black text-slate-800">€ {offer.quota_fissa_mensile}/mese</p>
        </div>
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col gap-1">
          <p className="text-[10px] uppercase font-bold text-emerald-600">Bonus Benvenuto</p>
          <p className="text-lg font-black text-emerald-700">€ {offer.bonus_attivazione}</p>
        </div>
      </div>

      <div className="space-y-3 px-2">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Check size={12} className="text-emerald-600" />
          </div>
          Fornitura 100% Green inclusa
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Check size={12} className="text-emerald-600" />
          </div>
          Prezzo bloccato per 12 mesi
        </div>
      </div>

      <div className="pt-4 flex flex-col items-center">
        <p className="text-slate-500 text-sm font-medium mb-3">Ricevi questa offerta in email</p>
        <button onClick={nextStep} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl">
          Procedi <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Step7Anagrafica = ({ leadData, updateLeadData, bestOffer, onSubmit, isSaving }: any) => {
  const [form, setForm] = useState<ContractData & { nome: string; cognome: string }>({
    nome: leadData.nome || '',
    cognome: leadData.cognome || '',
    codice_fiscale: '', 
    indirizzo: '', 
    cap: '', 
    citta: '', 
    provincia: 'MI',
    pod: '', 
    pdr: '', 
    metodo_pagamento: 'iban', 
    iban: ''
  });

  const isDual = bestOffer.tipo_offerta === 'dual';
  const isLuce = bestOffer.tipo_offerta === 'luce' || isDual;
  const isGas = bestOffer.tipo_offerta === 'gas' || isDual;

  const isFormValid = form.nome && form.cognome && form.codice_fiscale && form.indirizzo && form.cap && form.citta && (form.metodo_pagamento === 'bollettino' || (form.metodo_pagamento === 'iban' && form.iban && form.iban.length > 10));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Ricevi l'offerta a te dedicata</h2>
        <p className="text-indigo-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-2">Validità 3 giorni</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">Nome</label>
          <input type="text" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm" placeholder="Es: Mario" />
        </div>
        <div className="md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">Cognome</label>
          <input type="text" value={form.cognome} onChange={(e) => setForm({...form, cognome: e.target.value})} className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm" placeholder="Es: Rossi" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">Codice Fiscale</label>
          <input type="text" value={form.codice_fiscale} onChange={(e) => setForm({...form, codice_fiscale: e.target.value})} className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm uppercase" placeholder="RSSMRA80A01H501U" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">Indirizzo di residenza</label>
          <input type="text" value={form.indirizzo} onChange={(e) => setForm({...form, indirizzo: e.target.value})} className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm" placeholder="Via Roma, 10" />
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">CAP</label>
          <input type="text" value={form.cap} onChange={(e) => setForm({...form, cap: e.target.value})} className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm" placeholder="20121" />
        </div>
        
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">Città</label>
          <input type="text" value={form.citta} onChange={(e) => setForm({...form, citta: e.target.value})} className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm" placeholder="Milano" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1 block">Provincia</label>
          <div className="relative">
            <select 
              value={form.provincia} 
              onChange={(e) => setForm({...form, provincia: e.target.value})} 
              className="w-full p-3 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-xl outline-none shadow-sm appearance-none"
            >
              {PROVINCE_ITALIANE.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {isLuce && (
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase font-bold text-indigo-500 ml-1 mb-1 block">Codice POD (Luce)</label>
            <input type="text" value={form.pod} onChange={(e) => setForm({...form, pod: e.target.value})} className="w-full p-3 bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none" placeholder="IT001E..." />
          </div>
        )}
        {isGas && (
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase font-bold text-amber-500 ml-1 mb-1 block">Codice PDR (Gas)</label>
            <input type="text" value={form.pdr} onChange={(e) => setForm({...form, pdr: e.target.value})} className="w-full p-3 bg-amber-50/30 border-2 border-transparent focus:border-amber-500 rounded-xl outline-none" placeholder="5023..." />
          </div>
        )}

        <div className="md:col-span-2 mt-4">
          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 mb-3 block tracking-widest">Metodo di Pagamento</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => setForm({...form, metodo_pagamento: 'iban'})}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${form.metodo_pagamento === 'iban' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
            >
              <CardIcon size={20} />
              <span className="font-bold text-xs">Conto Corrente (SDD)</span>
            </button>
            <button 
              type="button"
              onClick={() => setForm({...form, metodo_pagamento: 'bollettino'})}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${form.metodo_pagamento === 'bollettino' ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
            >
              <FileText size={20} />
              <span className="font-bold text-xs">Bollettino Postale</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {form.metodo_pagamento === 'iban' && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              className="md:col-span-2 overflow-hidden"
            >
              <div className="pt-2 pb-1">
                <label className="text-[10px] uppercase font-bold text-indigo-500 ml-1 mb-1 block">Codice IBAN</label>
                <input 
                  type="text" 
                  value={form.iban} 
                  onChange={(e) => setForm({...form, iban: e.target.value.toUpperCase()})} 
                  className="w-full p-3 bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none font-mono" 
                  placeholder="IT60X00000..." 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => {
          updateLeadData({ nome: form.nome, cognome: form.cognome });
          onSubmit(form);
        }} 
        disabled={isSaving || !isFormValid} 
        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50 mt-4"
      >
        {isSaving ? <Loader2 className="animate-spin" size={20} /> : 'Conferma e richiedi offerta'}
      </button>
    </div>
  );
};

const SuccessPage = () => (
  <div className="text-center py-10 space-y-10">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
      <CheckCircle2 size={48} />
    </motion.div>
    
    <div className="space-y-3">
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Grazie, richiesta ricevuta!</h2>
      <p className="text-slate-500 text-lg max-w-sm mx-auto">Abbiamo inviato i dettagli tecnici della tua offerta al tuo indirizzo email.</p>
    </div>

    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-left space-y-6">
      <h4 className="font-black text-slate-800 flex items-center gap-2 text-xl">
        <Info size={24} className="text-indigo-600" /> Cosa accadrà dopo?
      </h4>
      <div className="space-y-4">
        {[
          { icon: Mail, text: "Riceverai un'email di riepilogo con i dettagli dell'offerta scelta.", color: "text-blue-500" },
          { icon: Phone, text: "Un nostro consulente dedicato ti contatterà per validare i dati tecnici.", color: "text-green-500" },
          { icon: FileCheck, text: "Riceverai il contratto digitale per la firma elettronica certificata.", color: "text-indigo-500" }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 ${item.color}`}>
              <item.icon size={20} />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed pt-2">{item.text}</p>
          </div>
        ))}
      </div>
    </div>

    <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl">
      Torna alla Home
    </button>
  </div>
);
