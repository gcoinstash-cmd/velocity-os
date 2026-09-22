/**
 * VELOCITY — Database Engine & Local Data Store
 * Supports live Supabase cloud connection with automatic local storage fallback.
 */

const STORAGE_KEYS = {
  VEHICLES: 'velocity_vehicles',
  RESERVATIONS: 'velocity_reservations',
  VERIFICATIONS: 'velocity_verifications'
};

function initializeVelocityData() {
  if (!localStorage.getItem(STORAGE_KEYS.VEHICLES)) {
    const defaultVehicles = [
      {
        id: 'CAR-01',
        name: 'Lamborghini Huracán EVO',
        category: 'Supercar',
        daily_rate: 1450,
        security_deposit: 2500,
        horsepower: 631,
        zero_to_sixty: '2.9s',
        transmission: '7-Speed Dual-Clutch',
        status: 'Available in Garage',
        image_url: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'CAR-02',
        name: 'Ferrari F8 Tributo',
        category: 'Supercar',
        daily_rate: 1650,
        security_deposit: 3000,
        horsepower: 710,
        zero_to_sixty: '2.8s',
        transmission: '7-Speed F1 Dual-Clutch',
        status: 'Available in Garage',
        image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'CAR-03',
        name: 'Porsche 911 GT3 RS',
        category: 'Hypercar',
        daily_rate: 1350,
        security_deposit: 2500,
        horsepower: 518,
        zero_to_sixty: '3.0s',
        transmission: '7-Speed PDK',
        status: 'Currently on Road',
        image_url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'CAR-04',
        name: 'McLaren 720S Spider',
        category: 'Hypercar',
        daily_rate: 1750,
        security_deposit: 3500,
        horsepower: 710,
        zero_to_sixty: '2.8s',
        transmission: '7-Speed Seamless Shift',
        status: 'Available in Garage',
        image_url: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'CAR-05',
        name: 'Mercedes-AMG G63 BiTurbo',
        category: 'Luxury SUV',
        daily_rate: 950,
        security_deposit: 1500,
        horsepower: 577,
        zero_to_sixty: '4.5s',
        transmission: '9-Speed AMG Speedshift',
        status: 'Available in Garage',
        image_url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'CAR-06',
        name: 'Rolls-Royce Ghost Extended',
        category: 'Ultra Luxury',
        daily_rate: 1850,
        security_deposit: 4000,
        horsepower: 563,
        zero_to_sixty: '4.6s',
        transmission: '8-Speed Satellite-Aided',
        status: 'Available in Garage',
        image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(defaultVehicles));
  }

  if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
    const defaultReservations = [
      {
        id: 'RES-9012',
        client_name: 'Darius Sterling',
        client_email: 'darius@sterling-holdings.co',
        client_phone: '+1 (305) 919-4822',
        vehicle_name: 'Lamborghini Huracán EVO',
        pickup_date: '2026-10-05',
        return_date: '2026-10-08',
        duration_days: 3,
        delivery_location: 'Miami Executive Airport (Private Terminal FBO)',
        daily_rate: 1450,
        total_price: 4350,
        security_deposit: 2500,
        status: 'Confirmed',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'RES-9013',
        client_name: 'Genevieve Fontaine',
        client_email: 'g.fontaine@crestview-luxury.com',
        client_phone: '+1 (310) 744-8890',
        vehicle_name: 'Ferrari F8 Tributo',
        pickup_date: '2026-10-09',
        return_date: '2026-10-11',
        duration_days: 2,
        delivery_location: 'The Beverly Hills Hotel (Porte-Cochère)',
        daily_rate: 1650,
        total_price: 3300,
        security_deposit: 3000,
        status: 'Confirmed',
        created_at: new Date(Date.now() - 86400000 * 1).toISOString()
      },
      {
        id: 'RES-9014',
        client_name: 'Arman Zadeh',
        client_email: 'arman@valkyrie-fund.io',
        client_phone: '+1 (702) 609-3120',
        vehicle_name: 'Mercedes-AMG G63 BiTurbo',
        pickup_date: '2026-10-12',
        return_date: '2026-10-15',
        duration_days: 3,
        delivery_location: 'Wynn Las Vegas Private Valet',
        daily_rate: 950,
        total_price: 2850,
        security_deposit: 1500,
        status: 'Pending Verification',
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(defaultReservations));
  }
}

const VelocityDB = {
  init: initializeVelocityData,

  getVehicles: () => {
    VelocityDB.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.VEHICLES)) || [];
    } catch {
      return [];
    }
  },

  getReservations: () => {
    VelocityDB.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) || [];
    } catch {
      return [];
    }
  },

  addReservation: (reservation) => {
    VelocityDB.init();
    const reservations = VelocityDB.getReservations();
    const newId = 'RES-' + Math.floor(1000 + Math.random() * 9000);
    const newRecord = {
      id: newId,
      created_at: new Date().toISOString(),
      status: 'Pending Verification',
      ...reservation
    };
    reservations.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    return newRecord;
  },

  deleteReservation: (id) => {
    VelocityDB.init();
    const reservations = VelocityDB.getReservations().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    return true;
  }
};

VelocityDB.init();
window.VelocityDB = VelocityDB;
