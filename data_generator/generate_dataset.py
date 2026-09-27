import os
import random
from datetime import datetime, timedelta
import numpy as np
import pandas as pd

# ----------------------------------------------------
# 1. Configuration & Full Scale Targets
# ----------------------------------------------------
OUTPUT_DIR = "./data/raw"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set seeds for absolute reproducibility
np.random.seed(42)
random.seed(42)

# SRS Full Competition Scale Requirements
NUM_PASSENGERS = 50000    # SRS Requirement: 50,000 unique passengers
NUM_ROUTES = 100         # SRS Requirement: 100 transport routes[cite: 1]
NUM_STOPS = 500          # SRS Requirement: 500 stops across the network[cite: 1]
NUM_VEHICLES = 250       # SRS Requirement: 250 vehicles across fleet[cite: 1]
NUM_TRIPS = 500000       # SRS Requirement: 500,000+ completed/planned trips[cite: 1]
NUM_TICKETS = 2000000    # SRS Requirement: 2,000,000+ ticketing transactions[cite: 1]

print("=" * 75)
print(" URBANTRANSIT IQ: FULL-SCALE DATASET GENERATION ENGINE")
print("=" * 75)

# ----------------------------------------------------
# 2. Generate Stops Dimension Table
# ----------------------------------------------------
print("[1/9] Generating Stops Dimension Table (500 stops)...")
stop_ids = [f"STOP_{i:03d}" for i in range(1, NUM_STOPS + 1)]
stops_df = pd.DataFrame({
    "stop_id": stop_ids,
    "stop_name": [f"Station_{i}" for i in range(1, NUM_STOPS + 1)],
    "latitude": np.random.uniform(24.80, 25.00, NUM_STOPS),
    "longitude": np.random.uniform(67.00, 67.20, NUM_STOPS),
    "zone_type": np.random.choice(["Commercial", "Residential", "Transit Hub", "Industrial"], NUM_STOPS)
})
stops_df.to_csv(f"{OUTPUT_DIR}/stops.csv", index=False)

# ----------------------------------------------------
# 3. Fleet & Vehicles Dimension Table
# ----------------------------------------------------
print("[2/9] Generating Vehicles Dimension Table (250 vehicles)...")
vehicle_ids = [f"VEH_{i:03d}" for i in range(1, NUM_VEHICLES + 1)]
vehicles_df = pd.DataFrame({
    "vehicle_id": vehicle_ids,
    "vehicle_type": np.random.choice(
        ["Standard Bus", "Articulated Bus", "Mini Bus", "Light Rail"], 
        NUM_VEHICLES, p=[0.5, 0.2, 0.2, 0.1]
    ),
    "seating_capacity": np.random.choice([30, 50, 80, 120], NUM_VEHICLES),
    "crush_capacity": np.random.choice([50, 90, 130, 200], NUM_VEHICLES),
    "operational_status": "Active"
})
vehicles_df.to_csv(f"{OUTPUT_DIR}/vehicles.csv", index=False)

# Map vehicle ID to crush capacity for quick lookup during occupancy logging
vehicle_capacity_map = dict(zip(vehicles_df['vehicle_id'], vehicles_df['crush_capacity']))

# ----------------------------------------------------
# 4. Routes & Route_Stops Mapping Tables
# ----------------------------------------------------
print("[3/9] Generating Routes and Stop Sequences (100 routes)...")
route_ids = [f"R{i:03d}" for i in range(1, NUM_ROUTES + 1)]
routes_data, route_stops_data = [], []
route_stops_dict = {}  # Cache stops per route for fast lookup

for r_id in route_ids:
    num_route_stops = np.random.randint(8, 20)
    selected_stops = np.random.choice(stop_ids, size=num_route_stops, replace=False)
    route_stops_dict[r_id] = list(selected_stops)
    
    total_dist = 0.0
    for seq, s_id in enumerate(selected_stops, 1):
        dist_increment = round(np.random.uniform(0.8, 2.5), 2)
        total_dist += dist_increment
        route_stops_data.append({
            "route_id": r_id,
            "stop_id": s_id,
            "stop_sequence": seq,
            "distance_from_origin_km": round(total_dist, 2),
            "scheduled_dwell_time_sec": np.random.choice([30, 45, 60, 90])
        })
        
    routes_data.append({
        "route_id": r_id,
        "route_name": f"Route-{r_id}",
        "origin_stop_id": selected_stops[0],
        "destination_stop_id": selected_stops[-1],
        "total_distance_km": round(total_dist, 2),
        "standard_duration_min": int(total_dist * 3.5),
        "is_active": True
    })

pd.DataFrame(routes_data).to_csv(f"{OUTPUT_DIR}/routes.csv", index=False)
route_stops_df = pd.DataFrame(route_stops_data)
route_stops_df.to_csv(f"{OUTPUT_DIR}/route_stops.csv", index=False)

# ----------------------------------------------------
# 5. Passenger Profiles Dimension Table
# ----------------------------------------------------
print("[4/9] Generating Passenger Profiles (50,000 passengers)...")
passenger_ids = [f"PASS_{i:05d}" for i in range(1, NUM_PASSENGERS + 1)]
passengers_df = pd.DataFrame({
    "passenger_id": passenger_ids,
    "passenger_type": np.random.choice(
        ["Daily Commuter", "Occasional", "Student", "Senior"], 
        NUM_PASSENGERS, p=[0.5, 0.25, 0.15, 0.10]
    ),
    "preferred_route_id": np.random.choice(route_ids, NUM_PASSENGERS)
})
passengers_df.to_csv(f"{OUTPUT_DIR}/passengers.csv", index=False)

# ----------------------------------------------------
# 6. Service Calendar & Timetables
# ----------------------------------------------------
print("[5/9] Generating 365-Day Service Calendar...")
start_date = datetime(2025, 1, 1)
calendar_data = []

for d in range(365):
    curr_date = start_date + timedelta(days=d)
    is_wknd = curr_date.weekday() >= 5
    calendar_data.append({
        "service_date": curr_date.strftime("%Y-%m-%d"),
        "day_of_week": curr_date.strftime("%A"),
        "is_weekday": not is_wknd,
        "is_holiday": random.random() < 0.03,
        "special_event_flag": random.random() < 0.05
    })

calendar_df = pd.DataFrame(calendar_data)
calendar_df.to_csv(f"{OUTPUT_DIR}/service_calendar.csv", index=False)

# ----------------------------------------------------
# 7. Trips & Incident Delays Fact Tables (500,000 Trips)
# ----------------------------------------------------
print("[6/9] Generating Trips and Delay Logs (500,000 trips)...")
trip_records, delay_records = [], []

p_distribution = np.array([
    0.01, 0.01, 0.01, 0.01, 0.02, 0.05, 0.09, 0.11, 
    0.08, 0.04, 0.04, 0.04, 0.05, 0.05, 0.05, 0.07, 
    0.11, 0.08, 0.03, 0.01, 0.01, 0.01, 0.01, 0.01
])
p_distribution /= p_distribution.sum()

for t_id in range(1, NUM_TRIPS + 1):
    r_id = random.choice(route_ids)
    v_id = random.choice(vehicle_ids)
    days_offset = random.randint(0, 364)
    hour = int(np.random.choice(range(24), p=p_distribution))
    
    sched_start = start_date + timedelta(days=days_offset, hours=hour, minutes=random.randint(0, 59))
    
    # 52% probability of operational delay to meet 250,000+ delay entries[cite: 1]
    is_delayed = random.random() < 0.52
    delay_min = round(np.random.exponential(scale=7.5), 2) if is_delayed else 0.0
    actual_start = sched_start + timedelta(minutes=delay_min)
    actual_end = actual_start + timedelta(minutes=random.randint(20, 90))
    
    trip_id_str = f"TRIP_{t_id:06d}"
    trip_records.append({
        "trip_id": trip_id_str,
        "route_id": r_id,
        "vehicle_id": v_id,
        "trip_date": sched_start.strftime("%Y-%m-%d"),
        "scheduled_start_time": sched_start.strftime("%Y-%m-%d %H:%M:%S"),
        "actual_start_time": actual_start.strftime("%Y-%m-%d %H:%M:%S"),
        "actual_end_time": actual_end.strftime("%Y-%m-%d %H:%M:%S"),
        "status": "Delayed" if delay_min > 5.0 else "Completed"
    })
    
    if is_delayed and delay_min > 2.0:
        delay_records.append({
            "delay_id": f"DEL_{len(delay_records)+1:06d}",
            "trip_id": trip_id_str,
            "stop_id": random.choice(route_stops_dict[r_id]),
            "scheduled_arrival": sched_start.strftime("%Y-%m-%d %H:%M:%S"),
            "actual_arrival": actual_start.strftime("%Y-%m-%d %H:%M:%S"),
            "delay_duration_min": delay_min,
            "delay_reason": np.random.choice([
                "Traffic Congestion", "Passenger Overcrowding", "Vehicle Fault", "Weather"
            ])
        })

trips_df = pd.DataFrame(trip_records)
trips_df.to_csv(f"{OUTPUT_DIR}/trips.csv", index=False)
pd.DataFrame(delay_records).to_csv(f"{OUTPUT_DIR}/delays.csv", index=False)

# ----------------------------------------------------
# 8. Passenger_Counts Fact Table (Boarding/Alighting/Occupancy)
# ----------------------------------------------------
print("[7/9] Generating Passenger Counts & Vehicle Occupancy Logs...")
passenger_counts_data = []

# Sample a subset of trips for granular stop-level passenger count logging (~150k trips)
sample_trips = trips_df.sample(n=150000, random_state=42)

for _, row in sample_trips.iterrows():
    t_id = row['trip_id']
    r_id = row['route_id']
    v_id = row['vehicle_id']
    crush_cap = vehicle_capacity_map[v_id]
    
    stops_in_route = route_stops_dict[r_id]
    current_occ = 0
    
    for seq, s_id in enumerate(stops_in_route, 1):
        if seq == 1:
            boarding = np.random.randint(5, 35)
            alighting = 0
        elif seq == len(stops_in_route):
            boarding = 0
            alighting = current_occ
        else:
            boarding = np.random.randint(0, 20)
            alighting = np.random.randint(0, min(current_occ + 1, 20))
            
        current_occ = max(0, current_occ + boarding - alighting)
        occ_rate = round(current_occ / crush_cap, 2)
        
        passenger_counts_data.append({
            "count_id": f"CNT_{len(passenger_counts_data)+1:08d}",
            "trip_id": t_id,
            "stop_id": s_id,
            "stop_sequence": seq,
            "boarding_count": boarding,
            "alighting_count": alighting,
            "current_occupancy": current_occ,
            "occupancy_rate": occ_rate
        })

pd.DataFrame(passenger_counts_data).to_csv(f"{OUTPUT_DIR}/passenger_counts.csv", index=False)

# ----------------------------------------------------
# 9. Ticketing Transactions & Controlled Anomalies (2,000,000 Tickets)
# ----------------------------------------------------
print("[8/9] Generating Ticketing Logs (2,000,000 transactions)...")
ticket_records = []
trip_ids_list = trips_df["trip_id"].values

for tck_id in range(1, NUM_TICKETS + 1):
    p_id = random.choice(passenger_ids)
    t_id = random.choice(trip_ids_list)
    o_stop = random.choice(stop_ids)
    d_stop = random.choice(stop_ids)
    
    tap_in = start_date + timedelta(days=random.randint(0, 364), hours=random.randint(6, 22), minutes=random.randint(0, 59))
    
    # Controlled Anomaly #1: 1% Timestamp Reversal (tap_out < tap_in)[cite: 1]
    if random.random() < 0.01:
        tap_out = tap_in - timedelta(minutes=random.randint(5, 30))
    else:
        tap_out = tap_in + timedelta(minutes=random.randint(10, 60))
        
    ticket_records.append({
        "ticket_id": f"TCK_{tck_id:08d}",
        "passenger_id": p_id,
        "trip_id": t_id,
        "origin_stop_id": o_stop,
        "destination_stop_id": d_stop,
        "tap_in_time": tap_in.strftime("%Y-%m-%d %H:%M:%S"),
        "tap_out_time": tap_out.strftime("%Y-%m-%d %H:%M:%S"),
        "fare_amount": round(random.uniform(1.5, 5.0), 2)
    })

tickets_df = pd.DataFrame(ticket_records)

# Controlled Anomaly #2: Inject 1.5% Duplicate Scan Entries[cite: 1]
duplicates = tickets_df.sample(frac=0.015)
tickets_df = pd.concat([tickets_df, duplicates], ignore_index=True)
tickets_df.to_csv(f"{OUTPUT_DIR}/tickets.csv", index=False)

# ----------------------------------------------------
# 10. Convert CSV Outputs to Compressed Parquet Format
# ----------------------------------------------------
print("[9/9] Converting raw CSV outputs to compressed Parquet format...")
for fname in os.listdir(OUTPUT_DIR):
    if fname.endswith(".csv"):
        df_temp = pd.read_csv(f"{OUTPUT_DIR}/{fname}")
        df_temp.to_parquet(f"{OUTPUT_DIR}/{fname.replace('.csv', '.parquet')}", index=False)

print("=" * 75)
print(" STEP 1 FULLY COMPLETE: All 9 relational tables generated in ./data/raw/")
print("=" * 75)