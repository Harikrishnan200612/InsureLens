-- InsureLens Supabase PostgreSQL Schema
-- AI-Powered Financial Clarity for Health Insurance

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (synchronized with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Policies Table
CREATE TABLE IF NOT EXISTS public.policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  policy_number TEXT NOT NULL,
  insurer_name TEXT NOT NULL,
  policy_holder TEXT NOT NULL,
  sum_insured NUMERIC NOT NULL,
  copay_percentage NUMERIC DEFAULT 0,
  deductible NUMERIC DEFAULT 0,
  room_rent_limit NUMERIC DEFAULT 0,
  treatment_limit NUMERIC DEFAULT 0,
  waiting_period INTEGER DEFAULT 30,
  valid_from DATE,
  valid_to DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Policy Rules & Clauses
CREATE TABLE IF NOT EXISTS public.policy_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id UUID REFERENCES public.policies(id) ON DELETE CASCADE NOT NULL,
  rule_name TEXT NOT NULL,
  clause_reference TEXT NOT NULL,
  clause_text TEXT NOT NULL,
  rule_value TEXT,
  confidence TEXT DEFAULT 'high',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Claims Table
CREATE TABLE IF NOT EXISTS public.claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  policy_id UUID REFERENCES public.policies(id) ON DELETE SET NULL,
  hospital_name TEXT NOT NULL,
  treatment TEXT,
  admission_date DATE,
  discharge_date DATE,
  total_bill NUMERIC NOT NULL,
  status TEXT DEFAULT 'In Progress',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Claim Line Items
CREATE TABLE IF NOT EXISTS public.claim_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  is_admissible BOOLEAN DEFAULT true,
  notes TEXT
);

-- 7. Analysis Results
CREATE TABLE IF NOT EXISTS public.analysis_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id UUID REFERENCES public.claims(id) ON DELETE CASCADE NOT NULL,
  admissible_amount NUMERIC NOT NULL,
  estimated_insurance_contribution NUMERIC NOT NULL,
  estimated_patient_contribution NUMERIC NOT NULL,
  financial_gap NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Deductions Table
CREATE TABLE IF NOT EXISTS public.deductions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES public.analysis_results(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  label TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  reason TEXT NOT NULL,
  policy_reference TEXT NOT NULL,
  clause_text TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deductions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only access their own data)
CREATE POLICY "Users can view own record" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can manage own policies" ON public.policies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own claims" ON public.claims FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own documents" ON public.documents FOR ALL USING (auth.uid() = user_id);
