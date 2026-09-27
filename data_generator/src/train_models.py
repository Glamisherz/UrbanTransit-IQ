import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import (
    RandomForestClassifier, 
    HistGradientBoostingClassifier, 
    HistGradientBoostingRegressor, 
    RandomForestRegressor
)
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    classification_report, 
    accuracy_score, 
    f1_score, 
    mean_absolute_error, 
    mean_squared_error, 
    r2_score, 
    silhouette_score
)

class HighPerformanceModelEngine:
    """
    Competition-Grade Machine Learning Benchmarking Engine for UrbanTransit IQ.
    Uses multi-threaded HistGradientBoosting & Balanced Ensembles to achieve top-tier 
    accuracy, robust F1-scores, and high R² regression metrics in seconds.
    Dynamically exports model comparison outputs to JSON for UI dashboard sync.
    """
    def __init__(self, feature_dir="./data/features", model_dir="./models", output_json="model_metrics.json"):
        self.feature_dir = feature_dir
        self.model_dir = model_dir
        self.output_json = output_json
        os.makedirs(self.model_dir, exist_ok=True)
        self.metrics_payload = {}

    def benchmark_delay_classifiers(self):
        print("\n" + "=" * 75)
        print(" [1/3] BENCHMARKING MULTI-CLASS DELAY SEVERITY CLASSIFIERS")
        print("=" * 75)
        
        df = pd.read_parquet(f"{self.feature_dir}/delay_features.parquet")

        # High-Signal Features (including engineered load factor & capacity)
        feature_cols = [
            'total_distance_km', 'standard_duration_min', 'seating_capacity', 'crush_capacity',
            'load_factor', 'hour_sin', 'hour_cos', 'day_of_week', 'is_weekend', 'is_peak_hour', 'route_hist_avg_delay'
        ]
        target_col = 'delay_severity_class'

        # Stratified Train/Test Split
        X = df[feature_cols].fillna(0)
        y = df[target_col]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        # Multi-Threaded & Class-Balanced Classifiers
        models = {
            "RandomForest_Balanced": RandomForestClassifier(
                n_estimators=100, max_depth=14, class_weight='balanced', random_state=42, n_jobs=-1
            ),
            "HistGradientBoosting": HistGradientBoostingClassifier(
                max_iter=100, max_depth=10, random_state=42
            )
        }

        classifier_results = {}
        best_model = None
        best_f1 = -1.0
        best_name = ""

        for name, model in models.items():
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            acc = float(accuracy_score(y_test, y_pred)) * 100
            f1 = float(f1_score(y_test, y_pred, average='weighted'))
            
            classifier_results[name] = {
                "accuracy": round(acc, 2),
                "f1_score": round(f1, 4)
            }
            print(f" -> {name}: Accuracy = {acc:.2f}%, Weighted F1-Score = {f1:.4f}")

            if f1 > best_f1:
                best_f1 = f1
                best_model = model
                best_name = name

        # Calculate combined accuracy for verification matching
        rf_acc = classifier_results.get("RandomForest_Balanced", {}).get("accuracy", 0.0)
        hist_acc = comparison_acc = classifier_results.get("HistGradientBoosting", {}).get("accuracy", 0.0)
        overall_accuracy = round((rf_acc + hist_acc) / 2, 2)

        # Save classification metrics to payload
        self.metrics_payload["delay_classifiers"] = {
            "random_forest_accuracy": rf_acc,
            "hist_gradient_boosting_accuracy": hist_acc,
            "overall_match_accuracy": overall_accuracy,
            "winning_classifier": best_name,
            "total_trips_evaluated": len(y_test)
        }

        print(f"\n[WINNER]: {best_name} selected as primary Delay Classifier (F1: {best_f1:.4f})")
        
        # Display full classification report for the winning model
        y_best_pred = best_model.predict(X_test)
        print("\nDetailed Performance Report:\n", classification_report(y_test, y_best_pred, digits=4))

        joblib.dump(best_model, f"{self.model_dir}/delay_classifier.joblib")
        print(f" -> Model saved to {self.model_dir}/delay_classifier.joblib")

    def benchmark_demand_forecasters(self):
        print("\n" + "=" * 75)
        print(" [2/3] BENCHMARKING PASSENGER DEMAND FORECASTERS")
        print("=" * 75)
        
        df = pd.read_parquet(f"{self.feature_dir}/demand_features.parquet")

        feature_cols = [
            'hour', 'day_of_week', 'month', 'is_weekend', 'is_peak_hour',
            'hour_sin', 'hour_cos', 'crush_capacity', 'seating_capacity'
        ]
        target_col = 'passenger_count'

        X = df[feature_cols].fillna(0)
        y = df[target_col]

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        models = {
            "HistGradientBoostingRegressor": HistGradientBoostingRegressor(
                max_iter=120, learning_rate=0.08, max_depth=8, random_state=42
            ),
            "RandomForestRegressor": RandomForestRegressor(
                n_estimators=80, max_depth=12, random_state=42, n_jobs=-1
            )
        }

        forecaster_results = {}
        best_model = None
        best_r2 = -999.0
        best_name = ""

        for name, model in models.items():
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            mae = float(mean_absolute_error(y_test, y_pred))
            rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
            r2 = float(r2_score(y_test, y_pred))
            
            forecaster_results[name] = {
                "mae": round(mae, 2),
                "rmse": round(rmse, 2),
                "r2_score": round(r2, 4)
            }
            print(f" -> {name}: MAE = {mae:.2f}, RMSE = {rmse:.2f}, R² = {r2:.4f}")

            if r2 > best_r2:
                best_r2 = r2
                best_model = model
                best_name = name

        self.metrics_payload["demand_forecasters"] = {
            "winning_forecaster": best_name,
            "best_r2_score": round(best_r2, 4),
            "forecaster_models": forecaster_results
        }

        print(f"\n[WINNER]: {best_name} selected as primary Demand Forecaster (R²: {best_r2:.4f})")
        joblib.dump(best_model, f"{self.model_dir}/demand_forecaster.joblib")
        print(f" -> Model saved to {self.model_dir}/demand_forecaster.joblib")

    def execute_route_clustering(self):
        print("\n" + "=" * 75)
        print(" [3/3] SPATIAL-TEMPORAL ROUTE CLUSTERING & PROFILING")
        print("=" * 75)
        
        df = pd.read_parquet(f"{self.feature_dir}/route_cluster_features.parquet")

        cluster_cols = ['total_trips', 'avg_duration', 'delay_rate', 'total_distance_km']
        X = df[cluster_cols].fillna(0)

        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        kmeans = KMeans(n_clusters=4, random_state=42, n_init=20)
        df['route_cluster'] = kmeans.fit_predict(X_scaled)
        sil_score = float(silhouette_score(X_scaled, df['route_cluster']))

        cluster_labels = {
            0: "High-Performing Express",
            1: "Overcrowded Bottleneck",
            2: "Reliable Low-Demand",
            3: "High-Delay Risk"
        }
        df['cluster_archetype'] = df['route_cluster'].map(cluster_labels)

        print(f" -> K-Means Clustering Silhouette Score: {sil_score:.4f}")
        print("\nRoute Archetype Distribution:\n", df['cluster_archetype'].value_counts().to_string())

        self.metrics_payload["route_clustering"] = {
            "silhouette_score": round(sil_score, 4),
            "clusters_count": 4,
            "archetype_counts": df['cluster_archetype'].value_counts().to_dict()
        }

        joblib.dump(kmeans, f"{self.model_dir}/route_kmeans.joblib")
        joblib.dump(scaler, f"{self.model_dir}/route_scaler.joblib")
        df.to_parquet(f"{self.feature_dir}/route_clusters_assigned.parquet", index=False)
        print(f" -> Cluster assignments & scaler saved to {self.model_dir}/")

    def export_metrics_json(self):
        """Exports calculated pipeline metrics dynamically to JSON."""
        with open(self.output_json, "w") as f:
            json.dump(self.metrics_payload, f, indent=4)
        print(f"\n[DYNAMIC EXPORT]: Model benchmarking metrics saved to '{self.output_json}'")

    def run_pipeline(self):
        self.benchmark_delay_classifiers()
        self.benchmark_demand_forecasters()
        self.execute_route_clustering()
        self.export_metrics_json()
        print("\n" + "=" * 75)
        print(" ALL ML MODELS BENCHMARKED, EVALUATED, AND SERIALIZED IN ./models/")
        print("=" * 75)

if __name__ == "__main__":
    engine = HighPerformanceModelEngine()
    engine.run_pipeline()