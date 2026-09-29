import React, { useState, useEffect } from "react";
import {
  Server,
  Layers,
  Bus,
  AlertTriangle,
  Clock,
  TrendingUp,
  Leaf,
  DollarSign,
  Users,
  ShieldCheck,
  Radio,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Cpu,
  Activity,
  Check,
  Zap,
  Filter,
  Navigation,
  Compass,
  MapPin,
  Send,
  UserCheck,
  ShieldAlert,
  X,
  Signal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DeckMap from "./DeckMap";

const OverviewTab = ({
  kpis,
  auditData,
  chartSampleData,
  filteredDirectives = [],
}) => {
  const [directiveFilter, setDirectiveFilter] = useState("ALL");
  const [mapViewMode, setMapViewMode] = useState("CONGESTION"); // CONGESTION, VOLUME, DENSITY
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState("");

  // Real-time simulated GPS Ping stream ticker state
  const [gpsPings, setGpsPings] = useState([
    {
      id: 101,
      bus: "Bus S-02",
      route: "R-22",
      speed: "42 km/h",
      status: "Boarding 14 Pax",
      coord: "24.8607° N, 67.0011° E",
    },
    {
      id: 102,
      bus: "Bus S-15",
      route: "R-10",
      speed: "28 km/h",
      status: "Heavy Traffic Slowdown",
      coord: "24.8718° N, 67.0199° E",
    },
    {
      id: 103,
      bus: "Bus S-08",
      route: "R-45",
      speed: "55 km/h",
      status: "Smooth Cruising",
      coord: "24.9056° N, 67.0822° E",
    },
  ]);

  // Simulate real-time ping updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const sampleBuses = [
        "Bus S-01",
        "Bus S-12",
        "Bus S-20",
        "Bus S-05",
        "Bus S-18",
      ];
      const sampleRoutes = ["R-10", "R-15", "R-22", "R-30", "R-45"];
      const sampleStatuses = [
        "Boarding 22 Pax",
        "Speed Normal",
        "Approaching Terminal",
        "Minor Delay (+3m)",
      ];

      const randomBus =
        sampleBuses[Math.floor(Math.random() * sampleBuses.length)];
      const randomRoute =
        sampleRoutes[Math.floor(Math.random() * sampleRoutes.length)];
      const randomSpeed = Math.floor(Math.random() * 35) + 20 + " km/h";
      const randomStatus =
        sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)];
      const randomLat = (24.8 + Math.random() * 0.15).toFixed(4);
      const randomLng = (67.0 + Math.random() * 0.15).toFixed(4);

      setGpsPings((prev) => [
        {
          id: Date.now(),
          bus: randomBus,
          route: randomRoute,
          speed: randomSpeed,
          status: randomStatus,
          coord: `${randomLat}° N, ${randomLng}° E`,
        },
        ...prev.slice(0, 4), // keep last 5 pings
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic Metrics
  const sparkAccuracy = auditData?.spark_accuracy || 99.1;
  const scikitAccuracy = auditData?.scikit_accuracy || 98.9;
  const overallMatch = auditData?.accuracy || auditData?.agreement_rate || 99.0;
  const totalVerified = auditData?.total_trips_evaluated || 500000;

  const totalTrips = kpis?.total_trips ?? 500000;
  const onTimePct = kpis?.on_time_performance_pct ?? 88.5;
  const avgDelay = kpis?.avg_delay_minutes ?? 17.74;
  const activeBuses = kpis?.active_buses ?? 142;
  const totalBuses = kpis?.total_buses ?? 160;
  const fleetUtilization = Math.round((activeBuses / totalBuses) * 100);

  const displayedDirectives = filteredDirectives.filter((dir) => {
    if (directiveFilter === "ALL") return true;
    return (dir.Priority_Level || "").toUpperCase() === directiveFilter;
  });

  const handleOpenIncidentModal = (incident) => {
    setSelectedIncident(incident);
    setBroadcastStatus("");
    setIsModalOpen(true);
  };

  const handleSendBroadcast = () => {
    setBroadcastStatus("Broadcasting SMS & Radio alert to field units...");
    setTimeout(() => {
      setBroadcastStatus(
        "Broadcast successfully dispatched to all active units on route!",
      );
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative">
      {/* LEFT COLUMN: LIVE FLEET, MAP, SHIFTS & INCIDENTS (4 COLS) */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        {/* WIDGET 1: REAL-TIME SYSTEM & FLEET DISPATCH STATUS */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
              <Server className="h-4 w-4 text-indigo-400" /> Active Fleet &
              System Status
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-mono border border-emerald-500/20 flex items-center gap-1">
              <Radio className="h-3 w-3 animate-pulse" /> Live Telemetry
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <p className="text-slate-400 text-[11px] flex items-center gap-1">
                <Bus className="h-3.5 w-3.5 text-indigo-400" /> Active Units
              </p>
              <p className="text-sm font-bold text-white font-mono mt-1">
                {activeBuses} / {totalBuses}{" "}
                <span className="text-[10px] text-emerald-400 font-normal">
                  ({fleetUtilization}%)
                </span>
              </p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <p className="text-slate-400 text-[11px] flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Match
                Score
              </p>
              <p className="text-sm font-bold text-emerald-400 font-mono mt-1">
                {overallMatch.toFixed(2)}% Verified
              </p>
            </div>
          </div>

          {/* ROUTE HEALTH DISTRIBUTION PROGRESS BAR */}
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-300 mb-1.5">
              <span>Dynamic Route Health Matrix</span>
              <span className="text-emerald-400 font-mono">
                65% Smooth Flow
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 w-[65%]"
                title="65% Smooth"
              ></div>
              <div
                className="h-full bg-amber-500 w-[22%]"
                title="22% Moderate Rush"
              ></div>
              <div
                className="h-full bg-red-500 w-[13%]"
                title="13% Severe Bottlenecks"
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 mt-1.5 font-mono">
              <span className="text-emerald-400">● 65% Smooth</span>
              <span className="text-amber-400">● 22% Moderate</span>
              <span className="text-red-400">● 13% Critical</span>
            </div>
          </div>
        </div>

        {/* WIDGET 2: LIVE 3D MAP WITH INTERACTIVE HEATMAP TOGGLE */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-white">
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" /> Spatial Route Grid
            </span>
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setMapViewMode("CONGESTION")}
                className={`px-2 py-0.5 rounded font-mono transition-all ${mapViewMode === "CONGESTION" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Congestion
              </button>
              <button
                onClick={() => setMapViewMode("VOLUME")}
                className={`px-2 py-0.5 rounded font-mono transition-all ${mapViewMode === "VOLUME" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Volume
              </button>
              <button
                onClick={() => setMapViewMode("DENSITY")}
                className={`px-2 py-0.5 rounded font-mono transition-all ${mapViewMode === "DENSITY" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Density
              </button>
            </div>
          </div>

          <div className="w-full h-64 rounded-xl overflow-hidden relative border border-slate-800/60">
            <DeckMap mode={mapViewMode} />
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between font-mono">
            <span>
              Active Layer:{" "}
              <strong className="text-indigo-400">{mapViewMode}</strong>
            </span>
            <span>WebGL Accelerated</span>
          </div>
        </div>

        {/* WIDGET 3: REAL-TIME FLEET GPS PING STREAM / SIMULATION TICKER */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl shadow-xl">
          <h3 className="text-xs font-bold text-white mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-cyan-400 animate-pulse" /> Live
              Fleet GPS Ping Stream
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">
              Auto-Sync (5s)
            </span>
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {gpsPings.map((ping) => (
              <div
                key={ping.id}
                className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <div>
                    <span className="font-bold text-white">{ping.bus}</span> (
                    {ping.route})
                    <span className="block text-[9px] text-slate-400 font-mono">
                      {ping.coord}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-indigo-400 block">
                    {ping.speed}
                  </span>
                  <span className="text-[9px] text-emerald-400">
                    {ping.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET 4: DRIVER & CREW SHIFT MANAGEMENT */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl shadow-xl">
          <h3 className="text-xs font-bold text-white mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-400" /> Crew & Shift
              Safety Compliance
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
              100% Compliant
            </span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white">
                  Capt. Tariq Mehmood
                </span>
                <span className="block text-[10px] text-slate-400">
                  Route R-10 • Shift: 06:00 - 14:00
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                4.5 hrs active
              </span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-white">
                  Capt. Farhan Akhtar
                </span>
                <span className="block text-[10px] text-slate-400">
                  Route R-22 • Shift: 06:00 - 14:00
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                5.1 hrs active
              </span>
            </div>
          </div>
        </div>

        {/* WIDGET 5: LIVE COMMUTER INCIDENT & ALERTS FEED */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl shadow-xl">
          <h3 className="text-xs font-bold text-white mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" /> Live Transit
              Incident Feed
            </span>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
              3 Active Streams
            </span>
          </h3>

          <div className="space-y-2 text-xs">
            <div
              onClick={() =>
                handleOpenIncidentModal({
                  title: "Shahrah-e-Faisal (S020) Delay",
                  route: "R-10",
                  desc: "Traffic bottleneck detected. Expected delay +18 minutes.",
                  priority: "CRITICAL",
                })
              }
              className="p-2.5 bg-slate-950/80 border-l-2 border-red-500 rounded-r-xl flex items-start justify-between gap-2 cursor-pointer hover:bg-slate-800/40 transition-all"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-[11px]">
                    Shahrah-e-Faisal (S020) Delay
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Traffic bottleneck detected. Expected delay +18 minutes.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-indigo-400 font-mono underline shrink-0">
                Action
              </span>
            </div>

            <div
              onClick={() =>
                handleOpenIncidentModal({
                  title: "Saddar Terminal (S002) Crowd Rush",
                  route: "R-22",
                  desc: "High passenger volume. Average stop wait time ~24 mins.",
                  priority: "HIGH",
                })
              }
              className="p-2.5 bg-slate-950/80 border-l-2 border-amber-500 rounded-r-xl flex items-start justify-between gap-2 cursor-pointer hover:bg-slate-800/40 transition-all"
            >
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-[11px]">
                    Saddar Terminal (S002) Crowd Rush
                  </p>
                  <p className="text-[10px] text-slate-400">
                    High passenger volume. Average stop wait time ~24 mins.
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-indigo-400 font-mono underline shrink-0">
                Action
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: KPIS, CHARTS, ESG & DIRECTIVES (8 COLS) */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        {/* TOP SUMMARY KPIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative group shadow-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Total Tracked Trips{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Total completed and live bus journeys today."
              />
            </span>
            <div className="text-2xl font-extrabold text-white mt-1 font-mono">
              {totalTrips.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500">
              Across all active city routes
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              On-Time Punctuality{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Percentage of buses arriving within 3 minutes of schedule."
              />
            </span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
              {onTimePct}%
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold">
              +2.4% vs. previous cycle
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Average Route Delay{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Average extra time commuters spend due to traffic constraints."
              />
            </span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono">
              {avgDelay} min
            </div>
            <span className="text-[10px] text-amber-500">
              Peak hour constraint factor
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-lg">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Bus Crowd Load{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Average passenger capacity threshold utilization."
              />
            </span>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">
              78.2%{" "}
              <span className="text-xs font-normal text-slate-400">Load</span>
            </div>
            <span className="text-[10px] text-cyan-500">
              Optimized distribution
            </span>
          </div>
        </div>

        {/* ML MODEL HEALTH COMPACT CARD */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Cpu className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Dual-Pipeline ML Inference Health
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {overallMatch.toFixed(2)}% AGREEMENT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                PySpark MLlib ({sparkAccuracy}%) vs. Scikit-Learn (
                {scikitAccuracy}%) verification across{" "}
                {totalVerified.toLocaleString()} data records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5" /> Zero Data Drift Detected
            </span>
          </div>
        </div>

        {/* ENVIRONMENTAL & FINANCIAL IMPACT SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                CO₂ Carbon Avoided
              </p>
              <p className="text-lg font-extrabold text-emerald-400 mt-0.5 font-mono">
                14.2 Tons
              </p>
              <p className="text-[10px] text-slate-500">
                Via sustainable public transit
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Est. Daily Collection
              </p>
              <p className="text-lg font-extrabold text-indigo-300 mt-0.5 font-mono">
                Rs. 1,850,000
              </p>
              <p className="text-[10px] text-slate-500">
                Automated fare management
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Commuter Time Saved
              </p>
              <p className="text-lg font-extrabold text-amber-400 mt-0.5 font-mono">
                3,420 Hours
              </p>
              <p className="text-[10px] text-slate-500">
                Optimized signaling & routes
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-lg">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" /> Hourly
              Passenger Rush & Demand
            </h3>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartSampleData}>
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#1e293b",
                      borderRadius: "8px",
                      fontSize: "11px",
                      color: "#f8fafc",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-lg">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-amber-400" /> Expected Delay
              Trends (Peak Hours)
            </h3>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartSampleData}>
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#1e293b",
                      borderRadius: "8px",
                      fontSize: "11px",
                      color: "#f8fafc",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="delay"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECOMMENDED OPERATOR ACTIONS TABLE WITH LIVE FILTER BUTTONS */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" /> Recommended Operator
              Actions ({displayedDirectives.length} Directives)
            </h3>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {["ALL", "HIGH", "CRITICAL"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDirectiveFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                    directiveFilter === lvl
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Route ID</th>
                  <th className="p-2.5">Priority</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Recommended Action</th>
                  <th className="p-2.5 text-right">Action / Execution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {displayedDirectives.length > 0 ? (
                  displayedDirectives.map((rec, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="p-2.5 font-mono font-bold text-white">
                        {rec.Route_ID || `Route-${i + 1}`}
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-bold">
                          {rec.Priority_Level || "HIGH"}
                        </span>
                      </td>
                      <td className="p-2.5 text-indigo-300">
                        {rec.Category || "Schedule Optimization"}
                      </td>
                      <td className="p-2.5 text-slate-100">
                        {rec.Prescriptive_Action ||
                          "Deploy backup buses to relieve stop congestion."}
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => {
                            alert(
                              `Executing Directive for ${rec.Route_ID || `Route-${i + 1}`}:\n"${rec.Prescriptive_Action}"\n\nStatus: Successfully Dispatched!`,
                            );
                          }}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-indigo-600/30 active:scale-95"
                        >
                          Execute <ArrowRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-slate-500">
                      No active directives match the selected filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AUTOMATED DISPATCH INCIDENT MODAL */}
      {isModalOpen && selectedIncident && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                <ShieldAlert className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Emergency Dispatch & Broadcast
                </h3>
                <p className="text-xs text-red-400 font-mono">
                  Priority: {selectedIncident.priority}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 mb-4 space-y-1.5 text-xs">
              <p className="text-white font-bold">{selectedIncident.title}</p>
              <p className="text-slate-300">{selectedIncident.desc}</p>
              <p className="text-indigo-400 font-mono text-[10px]">
                Affected Corridor: {selectedIncident.route}
              </p>
            </div>

            {broadcastStatus && (
              <div className="mb-4 p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 font-mono animate-pulse">
                {broadcastStatus}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={handleSendBroadcast}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" /> Send Automated Radio / SMS
                Broadcast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
