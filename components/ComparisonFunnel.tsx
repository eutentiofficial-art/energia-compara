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
    id: '1', 
    provider_id: 'p1', 
    nome_offerta: 'Eco-Green Fix', 
    tipo_tariffa: 'fissa', 
    prezzo_kwh: 0.12, 
    quota_fissa_mensile: 10, 
    bonus_attivazione: 50, 
    green_energy: true, 
    penale_recesso: false, 
    visibile: true, 
    created_at: '', 
    provider: { id: 'p1', nome: 'GreenNetwork', attivo: true, created_at: '' } 
  } as OfferLuce,
  { 
    id: '2', 
    provider_id: 'p2', 
    nome_offerta: 'Gas Safe Plus', 
    tipo_tariffa: 'fissa', 
    prezzo_smc: 0.45, 
    quota_fissa_mensile: 12, 
    bonus_attivazione: 30, 
    penale_recesso: false, 
    visibile: true, 
    created_at: '', 
    provider: { id: 'p2', nome: 'Plenitude', attivo: true, created_at: '' } 
  } as OfferGas,
  { 
    id: '3', 
    provider_id: 'p3', 
    nome_offerta: 'Combo Relax', 
    prezzo_kwh: 0.11, 
    prezzo_smc: 0.42, 
    quota_fissa_mensile: 18, 
    bonus_attivazione: 80, 
    visibile: true, 
    created_at: '', 
    provider: { id: 'p3', nome: 'Eni', attivo: true, created_at: '' } 
  } as OfferDual
];
// STEP 1: PROFILO E SERVIZIO
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

// STEP 2: CONSUMI + EMAIL
const Step2Consumption = ({ data, updateData, onFinish, isSaving }: any) => {
  const handleCalculate = () => {
    const best = ComparisonEngine.getBestOffer(data, data.tipo_servizio, MOCK_OFFERS);
    if (onFinish && best) onFinish(best);
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
        disabled={isSaving || !isConsumptionValid || !isEmailValid} 
        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl"
      >
        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <>Calcola Risparmio <ArrowRight size={20} /></>}
      </button>
    </div>
  );
};

// STEP 4: RESULT CARD
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
