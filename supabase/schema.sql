-- ====================================================================
-- VELOCITY — PostgreSQL Database Schema & Row-Level Security (RLS)
-- Exotic Car & Luxury Fleet Operating System
-- ====================================================================

create extension if not exists "uuid-ossp";

-- 1. FLEET VEHICLES TABLE
create table if not exists public.fleet_vehicles (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  name text not null,
  category text not null,
  daily_rate numeric(10,2) not null,
  security_deposit numeric(10,2) not null,
  horsepower integer not null,
  zero_to_sixty text not null,
  transmission text not null,
  status text default 'Available in Garage' check (status in ('Available in Garage', 'Currently on Road', 'In Scheduled Maintenance')),
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CLIENT FLEET RESERVATIONS TABLE
create table if not exists public.reservations (
  id uuid primary key default uuid_generate_v4(),
  reservation_code text unique not null,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  vehicle_id uuid references public.fleet_vehicles(id) on delete set null,
  vehicle_name text not null,
  pickup_date date not null,
  return_date date not null,
  duration_days integer not null,
  daily_rate numeric(10,2) not null,
  total_price numeric(10,2) not null,
  security_deposit numeric(10,2) not null,
  delivery_location text not null,
  status text default 'Pending Verification' check (status in ('Pending Verification', 'Confirmed', 'Dispatched', 'Completed', 'Cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. DRIVER QUALIFICATION & INSURANCE VERIFICATIONS
create table if not exists public.driver_verifications (
  id uuid primary key default uuid_generate_v4(),
  reservation_id uuid references public.reservations(id) on delete cascade,
  driver_name text not null,
  license_number text not null,
  date_of_birth date not null,
  insurance_provider text not null,
  is_verified boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ====================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.fleet_vehicles enable row level security;
alter table public.reservations enable row level security;
alter table public.driver_verifications enable row level security;

-- Public can view vehicles
create policy "Vehicles are publicly viewable"
  on public.fleet_vehicles for select
  using (true);

-- Public can submit reservations & verification
create policy "Public can submit reservations"
  on public.reservations for insert
  with check (true);

create policy "Public can submit driver verification"
  on public.driver_verifications for insert
  with check (true);

-- Admin / Service Role Full Access
create policy "Admin full access on vehicles"
  on public.fleet_vehicles for all
  using (auth.role() = 'service_role' or auth.jwt() ->> 'role' = 'admin');

create policy "Admin full access on reservations"
  on public.reservations for all
  using (auth.role() = 'service_role' or auth.jwt() ->> 'role' = 'admin');

create policy "Admin full access on verifications"
  on public.driver_verifications for all
  using (auth.role() = 'service_role' or auth.jwt() ->> 'role' = 'admin');
