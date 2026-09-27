import os
import pandas as pd
import numpy as np
from datetime import datetime

class DataQualityEngine:
    """
    Production-Grade Data Quality & Preprocessing Engine for UrbanTransit IQ.
    Cleans raw transport logs, corrects operational anomalies, and outputs
    sanitized Parquet datasets along with an executive audit report.
    """
    def __init__(self, raw_dir="./data/raw", processed_dir="./data/processed"):
        self.raw_dir = raw_dir
        self.processed_dir = processed_dir
        os.makedirs(self.processed_dir, exist_ok=True)
        self.audit_log = []

    def log_issue(self, table_name, issue_type, records_affected, action_taken):
        """Appends data quality findings to the master audit trail."""
        self.audit_log.append({
            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Table": table_name,
            "Issue_Type": issue_type,
            "Records_Affected": int(records_affected),
            "Action_Taken": action_taken
        })

    def process_tickets(self):
        print("[DataQualityEngine] Sanitizing Tickets Dataset...")
        df = pd.read_parquet(f"{self.raw_dir}/tickets.parquet")
        initial_len = len(df)

        # 1. Deduplication (SRS Requirement)
        df_dedup = df.drop_duplicates(subset=["ticket_id"]).copy()
        dup_count = initial_len - len(df_dedup)
        if dup_count > 0:
            self.log_issue("Tickets", "Duplicate Scan Entries", dup_count, "Purged duplicate ticketing records")

        # 2. Timestamp Reversal Detection & Correction (tap_out < tap_in)
        df_dedup['tap_in_time'] = pd.to_datetime(df_dedup['tap_in_time'])
        df_dedup['tap_out_time'] = pd.to_datetime(df_dedup['tap_out_time'])
        
        invalid_mask = df_dedup['tap_out_time'] < df_dedup['tap_in_time']
        invalid_count = invalid_mask.sum()
        
        if invalid_count > 0:
            self.log_issue("Tickets", "Timestamp Reversal (tap_out < tap_in)", invalid_count, "Swapped inverted tap timestamps")
            df_dedup.loc[invalid_mask, ['tap_in_time', 'tap_out_time']] = (
                df_dedup.loc[invalid_mask, ['tap_out_time', 'tap_in_time']].values
            )

        df_dedup.to_parquet(f"{self.processed_dir}/tickets_cleaned.parquet", index=False)
        print(f" -> Tickets sanitized: {len(df_dedup)} clean records exported.")

    def process_trips_and_delays(self):
        print("[DataQualityEngine] Sanitizing Trips & Delays Datasets...")
        trips = pd.read_parquet(f"{self.raw_dir}/trips.parquet")
        delays = pd.read_parquet(f"{self.raw_dir}/delays.parquet")

        # Standardize timestamp datatypes
        trips['scheduled_start_time'] = pd.to_datetime(trips['scheduled_start_time'])
        trips['actual_start_time'] = pd.to_datetime(trips['actual_start_time'])
        trips['actual_end_time'] = pd.to_datetime(trips['actual_end_time'])

        # Compute actual trip duration in minutes
        trips['actual_duration_min'] = (trips['actual_end_time'] - trips['actual_start_time']).dt.total_seconds() / 60.0
        
        # Quarantine invalid trip durations (<= 0 minutes)
        invalid_trips = trips[trips['actual_duration_min'] <= 0]
        if len(invalid_trips) > 0:
            self.log_issue("Trips", "Invalid Duration (<= 0 mins)", len(invalid_trips), "Quarantined corrupt trip event logs")
            trips = trips[trips['actual_duration_min'] > 0]

        trips.to_parquet(f"{self.processed_dir}/trips_cleaned.parquet", index=False)
        delays.to_parquet(f"{self.processed_dir}/delays_cleaned.parquet", index=False)
        print(f" -> Trips & Delays sanitized: {len(trips)} trips, {len(delays)} delay logs saved.")

    def pass_through_dimensions(self):
        print("[DataQualityEngine] Validating & Migrating Dimension Tables...")
        dim_tables = ["stops", "vehicles", "routes", "route_stops", "passengers", "service_calendar", "passenger_counts"]
        for tbl in dim_tables:
            if os.path.exists(f"{self.raw_dir}/{tbl}.parquet"):
                df = pd.read_parquet(f"{self.raw_dir}/{tbl}.parquet")
                df.to_parquet(f"{self.processed_dir}/{tbl}_cleaned.parquet", index=False)
        print(" -> All dimension and count tables migrated to ./data/processed/")

    def run_pipeline(self):
        self.process_tickets()
        self.process_trips_and_delays()
        self.pass_through_dimensions()
        
        # Generate Data Quality Audit Report CSV
        audit_df = pd.DataFrame(self.audit_log)
        audit_df.to_csv(f"{self.processed_dir}/Data_Quality_Audit_Report.csv", index=False)
        print("\n" + "=" * 75)
        print(" DATA QUALITY AUDIT REPORT GENERATED")
        print("=" * 75)
        if not audit_df.empty:
            print(audit_df.to_string(index=False))
        else:
            print(" No critical anomalies detected. All checks passed!")
        print("\n[Step 2 Complete] Sanitized datasets saved in ./data/processed/")

if __name__ == "__main__":
    engine = DataQualityEngine()
    engine.run_pipeline()