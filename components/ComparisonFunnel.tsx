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
