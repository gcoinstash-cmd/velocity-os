-- ====================================================================
-- VELOCITY — Starter Demo Data & Master Fleet Records
-- ====================================================================

insert into public.fleet_vehicles (code, name, category, daily_rate, security_deposit, horsepower, zero_to_sixty, transmission, status, image_url) values
(
  'CAR-01',
  'Lamborghini Huracán EVO',
  'Supercar',
  1450.00,
  2500.00,
  631,
  '2.9s',
  '7-Speed Dual-Clutch',
  'Available in Garage',
  'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80'
),
(
  'CAR-02',
  'Ferrari F8 Tributo',
  'Supercar',
  1650.00,
  3000.00,
  710,
  '2.8s',
  '7-Speed F1 Dual-Clutch',
  'Available in Garage',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'
),
(
  'CAR-03',
  'Porsche 911 GT3 RS',
  'Hypercar',
  1350.00,
  2500.00,
  518,
  '3.0s',
  '7-Speed PDK',
  'Currently on Road',
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
),
(
  'CAR-04',
  'McLaren 720S Spider',
  'Hypercar',
  1750.00,
  3500.00,
  710,
  '2.8s',
  '7-Speed Seamless Shift',
  'Available in Garage',
  'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80'
),
(
  'CAR-05',
  'Mercedes-AMG G63 BiTurbo',
  'Luxury SUV',
  950.00,
  1500.00,
  577,
  '4.5s',
  '9-Speed AMG Speedshift',
  'Available in Garage',
  'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80'
),
(
  'CAR-06',
  'Rolls-Royce Ghost Extended',
  'Ultra Luxury',
  1850.00,
  4000.00,
  563,
  '4.6s',
  '8-Speed Satellite-Aided',
  'Available in Garage',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
);

insert into public.reservations (reservation_code, client_name, client_email, client_phone, vehicle_name, pickup_date, return_date, duration_days, daily_rate, total_price, security_deposit, delivery_location, status) values
(
  'RES-9012',
  'Darius Sterling',
  'darius@sterling-holdings.co',
  '+1 (305) 919-4822',
  'Lamborghini Huracán EVO',
  current_date + interval '2 days',
  current_date + interval '5 days',
  3,
  1450.00,
  4350.00,
  2500.00,
  'Miami Executive Airport (OPF FBO Private Tarmac)',
  'Confirmed'
),
(
  'RES-9013',
  'Genevieve Fontaine',
  'g.fontaine@crestview-luxury.com',
  '+1 (310) 744-8890',
  'Ferrari F8 Tributo',
  current_date + interval '3 days',
  current_date + interval '5 days',
  2,
  1650.00,
  3300.00,
  3000.00,
  'The Beverly Hills Hotel (Porte-Cochère)',
  'Confirmed'
);
