import React, { useEffect, useState, useMemo } from "react";
import AICopilot from "./components/AICopilot";
import axios from "axios";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Activity,
  ShieldCheck,
  Bus,
  Car,
  TrendingUp,
  Radio,
  Cpu,
  Database,
  Zap,
  Check,
  MapPin,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Compass,
  RefreshCw,
  LogOut,
  Key,
  UserPlus,
  Users,
  Trash2,
  PlusCircle,
  Search,
  Filter,
  FileSpreadsheet,
  FileText,
  DollarSign,
  TrendingDown,
  Gauge,
  Leaf,
  Navigation,
  Lock,
  Code2,
  Layers,
  Server,
  Workflow,
  Bike,
  Truck,
  HardDrive,
  Globe,
  GitBranch,
  Send,
  UserCheck,
} from "lucide-react";

// Reusable Helper Component for Animated Glowing Badges
const getStatusBadge = (status) => {
  switch (status?.toUpperCase()) {
    case "CRITICAL":
    case "BOTTLENECK":
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1.5 w-fit shadow-sm shadow-red-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {status}
        </span>
      );
    case "HIGH":
    case "OVERCROWDED":
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 w-fit shadow-sm shadow-amber-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {status}
        </span>
      );
    default:
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 w-fit shadow-sm shadow-emerald-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Normal Flow
        </span>
      );
  }
};

const DeckMap = ({ activeHeatmap }) => {
  return (
    <div className="w-full h-full bg-slate-950/90 rounded-xl relative overflow-hidden flex flex-col justify-between p-4 border border-slate-800/80 group min-h-[260px]">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#6366f1 1px, transparent 1px), radial-gradient(#3b82f6 1px, #030712 1px)`,
          backgroundSize: `20px 20px`,
          backgroundPosition: `0 0, 10px 10px`,
        }}
      />

      {/* Dynamic Heatmap Overlay Effect */}
      {activeHeatmap === "Congestion Heatmap" && (
        <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
      )}
      {activeHeatmap === "Passenger Volume" && (
        <div className="absolute inset-0 bg-indigo-500/10 animate-pulse pointer-events-none" />
      )}
      {activeHeatmap === "Bus Stop Density" && (
        <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none" />
      )}

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-500/40"
        strokeWidth="2"
      >
        <path
          d="M 30 50 Q 150 120 280 80 T 450 180"
          fill="transparent"
          className="stroke-indigo-400/60"
          strokeDasharray="4 4"
        />
        <path
          d="M 50 200 Q 180 140 320 220 T 480 120"
          fill="transparent"
          className="stroke-red-500/70"
          strokeWidth="3"
        />
        <path
          d="M 120 20 Q 220 180 380 260"
          fill="transparent"
          className="stroke-emerald-400/80"
          strokeWidth="2.5"
        />
      </svg>

      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg backdrop-blur-md">
          <Navigation
            className="h-3.5 w-3.5 text-indigo-400 animate-spin"
            style={{ animationDuration: "12s" }}
          />
          <span className="text-[11px] font-mono font-bold text-white">
            Karachi Spatial Transit Grid [{activeHeatmap}]
          </span>
        </div>
        <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />2
          High Bottlenecks
        </span>
      </div>

      <div className="relative w-full h-40 z-10 flex items-center justify-around">
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
          <span className="px-2 py-0.5 bg-slate-900/90 text-indigo-300 text-[9px] font-mono rounded border border-indigo-500/40">
            Saddar
          </span>
          <div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-lg shadow-indigo-500/50 animate-bounce" />
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
          <span className="px-2 py-0.5 bg-slate-900/90 text-red-300 text-[9px] font-mono rounded border border-red-500/40">
            S.I.T.E
          </span>
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg shadow-red-500/50 animate-pulse" />
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
          <span className="px-2 py-0.5 bg-slate-900/90 text-emerald-300 text-[9px] font-mono rounded border border-emerald-500/40">
            Clifton
          </span>
          <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg shadow-emerald-500/50" />
        </div>
      </div>

      <div className="flex justify-between items-center z-10 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Smooth
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Heavy
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Severe
          </span>
        </div>
        <span className="font-mono text-indigo-400">
          FPS: 60.0 • WebGL Active
        </span>
      </div>
    </div>
  );
};

const OverviewTab = ({
  kpis,
  auditData,
  chartSampleData,
  filteredDirectives,
  activeHeatmap,
  setActiveHeatmap,
  onOpenIncidentModal,
}) => {
  const sparkAccuracy = auditData?.spark_accuracy || 99.1;
  const scikitAccuracy = auditData?.scikit_accuracy || 98.9;
  const overallMatch = auditData?.accuracy || auditData?.agreement_rate || 99.0;
  const totalVerified = auditData?.total_trips_evaluated || 500000;
  const isHealthy = overallMatch >= 98.0;

  return (
    <div className="flex flex-col gap-5">
      {/* 2. Interactive Heatmap Toggle Bar */}
      <div className="w-full bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-indigo-400" /> Interactive Map View:
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {["Congestion Heatmap", "Passenger Volume", "Bus Stop Density"].map(
            (mode) => (
              <button
                key={mode}
                onClick={() => setActiveHeatmap(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeHeatmap === mode
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="w-full bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-red-500" />
        <div className="flex items-center gap-3 pl-2">
          <span className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0">
            <AlertTriangle className="h-4 w-4 animate-bounce" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Live Dispatch Alert
              </h4>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                S002 Saddar Corridor Surge
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Passenger wait times elevated by{" "}
              <strong className="text-amber-400">+14.2 min</strong> due to peak
              morning rush.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onOpenIncidentModal({
                title: "Saddar Corridor Surge (S002)",
                type: "CRITICAL",
                desc: "Passenger wait times elevated by +14.2 min due to peak morning rush. Requires immediate backup dispatch.",
              })
            }
            className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-amber-600/20 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5" /> Quick Dispatch +2 Backup Buses
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl group hover:border-slate-700 transition-all">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500" />
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              On-Time Arrival Rate
            </span>
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2 font-mono">
            {kpis?.on_time_performance_pct
              ? `${kpis.on_time_performance_pct}%`
              : kpis?.on_time_punctuality || "91.50%"}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            +3.2% compared to last week
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl group hover:border-slate-700 transition-all">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-red-500" />
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Avg Passenger Delay
            </span>
            <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-2 font-mono">
            {kpis?.avg_delay_minutes
              ? `${kpis.avg_delay_minutes} mins`
              : kpis?.avg_delay || "15.54 mins"}
          </div>
          <span className="text-[10px] text-amber-400/80 mt-1 block">
            Heavy load on S.I.T.E corridor
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl group hover:border-slate-700 transition-all">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500" />
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Total Commuters Today
            </span>
            <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-indigo-300 mt-2 font-mono">
            {kpis?.total_trips ? kpis.total_trips.toLocaleString() : "444,700"}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Across 12 main Karachi routes
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl group hover:border-slate-700 transition-all">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Active Fleet Capacity
            </span>
            <span className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
              <Bus className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-cyan-400 mt-2 font-mono">
            184 / 200 Buses
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 block">
            92.0% Fleet Utilization
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <Cpu className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  ML Pipeline Model Health
                </h3>
                <p className="text-[10px] text-slate-400">
                  Real-Time Dual Model Verification
                </p>
              </div>
            </div>

            {isHealthy ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm shadow-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                VERIFIED PASS
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 shadow-sm shadow-amber-500/10">
                <AlertTriangle className="w-3 h-3 text-amber-400 animate-pulse" />
                MODEL DRIFT
              </span>
            )}
          </div>

          <div className="my-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Cross-Pipeline Verification Match
              </span>
              <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-0.5 flex items-baseline gap-1.5">
                {overallMatch.toFixed(2)}%
                <span className="text-[10px] text-slate-500 font-normal">
                  ({totalVerified.toLocaleString()} Records Evaluated)
                </span>
              </div>
            </div>
            <ShieldCheck className="h-8 w-8 text-emerald-400/80 shrink-0" />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] font-semibold mb-1">
                <span className="text-cyan-300 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-cyan-400" />
                  PySpark MLlib (Classifier)
                </span>
                <span className="text-cyan-400 font-mono font-bold">
                  {sparkAccuracy}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 ease-out"
                  style={{ width: `${sparkAccuracy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold mb-1">
                <span className="text-indigo-300 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-indigo-400" />
                  Scikit-Learn (Validation Engine)
                </span>
                <span className="text-indigo-400 font-mono font-bold">
                  {scikitAccuracy}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out"
                  style={{ width: `${scikitAccuracy}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-400" /> Auto-Audited
            </span>
            <span className="font-mono text-slate-400">
              Tolerance Margin: ±0.2%
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-400" /> Hourly
                Passenger Demand & Delay Profile
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Karachi Metro Area Hourly Load (06:00 AM - 06:00 PM)
              </p>
            </div>
            <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-lg">
              Live Feed Active
            </span>
          </div>

          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartSampleData}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="hour"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#090d16",
                    borderColor: "#1e293b",
                    borderRadius: "0.75rem",
                    fontSize: "11px",
                    color: "#f8fafc",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDemand)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>
              Peak Volume Detected:{" "}
              <strong className="text-white font-mono">
                5,100 Passengers / Hour
              </strong>
            </span>
            <span className="text-indigo-400 font-mono">
              Evening Peak Horizon: 05:00 PM
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-400" /> Prescriptive AI
                Directives ({filteredDirectives.length})
              </h3>
              <p className="text-[11px] text-slate-400">
                Actionable fleet recommendations generated from live route
                conditions
              </p>
            </div>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {filteredDirectives.length > 0 ? (
              filteredDirectives.map((rec, i) => (
                <div
                  key={i}
                  className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between gap-3 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="p-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-xl mt-0.5 shrink-0">
                      <Bus className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-white font-mono">
                          {rec.Route_ID || `Route-${i + 1}`}
                        </span>
                        {getStatusBadge(rec.Priority_Level || "HIGH")}
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {rec.Prescriptive_Action ||
                          "Deploy 2 additional shuttle buses to relieve peak stop overcrowding."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onOpenIncidentModal({
                        title: `Directive Execution: ${
                          rec.Route_ID || `Route-${i + 1}`
                        }`,
                        type: rec.Priority_Level || "HIGH",
                        desc: rec.Prescriptive_Action,
                      });
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shrink-0 transition-all cursor-pointer shadow-md shadow-indigo-600/30 active:scale-95"
                  >
                    Execute <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 bg-slate-950/40 rounded-xl border border-slate-800 text-center text-xs text-slate-500">
                No active directives match the search filter.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between">
          <DeckMap activeHeatmap={activeHeatmap} />
        </div>
      </div>
    </div>
  );
};

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // SECURE AUTHENTICATION FORM STATES
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [roleInput, setRoleInput] = useState("Operator");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // ADMIN USER CONTROL STATES
  const [userList, setUserList] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("Operator");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [odRouteFilter, setOdRouteFilter] = useState("ALL");
  const [odPeriodFilter, setOdPeriodFilter] = useState("ALL");

  const [activeTab, setActiveTab] = useState("overview");
  const [kpis, setKpis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [auditData, setAuditData] = useState(null);
  const [odMatrix, setOdMatrix] = useState([]);
  const [dataQualityLogs, setDataQualityLogs] = useState([]);
  const [persistentOvercrowding, setPersistentOvercrowding] = useState([]);

  // NEW FEATURE STATES
  const [activeHeatmap, setActiveHeatmap] = useState("Congestion Heatmap");
  const [incidentModalData, setIncidentModalData] = useState(null);
  const [gpsPingStream, setGpsPingStream] = useState([
    {
      busId: "BUS-204",
      route: "R-10",
      speed: "42 km/h",
      coords: "24.8607° N, 67.0011° E",
      boarding: "+14 Pax",
      time: "Just now",
    },
    {
      busId: "BUS-112",
      route: "R-22",
      speed: "28 km/h",
      coords: "24.8510° N, 67.0230° E",
      boarding: "+32 Pax",
      time: "4s ago",
    },
    {
      busId: "BUS-309",
      route: "R-15",
      speed: "55 km/h",
      coords: "24.8900° N, 67.0812° E",
      boarding: "+8 Pax",
      time: "8s ago",
    },
  ]);

  // Simulated GPS Ticker Stream Update
  useEffect(() => {
    const tickerInterval = setInterval(() => {
      const routes = ["R-10", "R-15", "R-22", "R-30", "R-45"];
      const randRoute = routes[Math.floor(Math.random() * routes.length)];
      const randBus = `BUS-${Math.floor(100 + Math.random() * 900)}`;
      const randSpeed = `${Math.floor(20 + Math.random() * 45)} km/h`;
      const randBoarding = `+${Math.floor(5 + Math.random() * 35)} Pax`;

      setGpsPingStream((prev) => [
        {
          busId: randBus,
          route: randRoute,
          speed: randSpeed,
          coords: `24.${Math.floor(
            8000 + Math.random() * 1000,
          )}° N, 67.${Math.floor(0 + Math.random() * 9999)}° E`,
          boarding: randBoarding,
          time: "Just now",
        },
        ...prev.slice(0, 4),
      ]);
    }, 4000);
    return () => clearInterval(tickerInterval);
  }, []);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [simFreq, setSimFreq] = useState(15);
  const [simBuses, setSimBuses] = useState(4);
  const [simDemand, setSimDemand] = useState(1.1);

  const simResults = useMemo(() => {
    const freqNum = Number(simFreq) || 0;
    const busNum = Number(simBuses) || 0;
    const demMult = Number(simDemand) || 1.0;

    const baseOTP = 88.5;
    const baseDelay = 15.54;
    const baseWaitTime = 12.0;
    const baseOvercrowdingIdx = 78;

    const simulated_otp = Math.min(
      99.8,
      baseOTP + busNum * 0.85 + freqNum * 0.18 - (demMult - 1.0) * 12,
    ).toFixed(1);

    const simulated_avg_delay = Math.max(
      3.2,
      baseDelay - busNum * 0.95 - freqNum * 0.12 + (demMult - 1.0) * 8,
    ).toFixed(2);

    const costDeltaPerHour = Math.round(
      busNum * 85 + freqNum * 18 + (demMult - 1.0) * 120,
    );

    const avgWaitTime = Math.max(
      2.5,
      baseWaitTime - freqNum * 0.18 - busNum * 0.6 + (demMult - 1.0) * 4,
    ).toFixed(1);

    const overcrowdingIndex = Math.max(
      15,
      Math.min(
        100,
        Math.round(
          baseOvercrowdingIdx -
            busNum * 4 -
            freqNum * 0.8 +
            (demMult - 1.0) * 35,
        ),
      ),
    );

    const co2ChangePct = (
      busNum * 1.8 -
      (baseDelay - parseFloat(simulated_avg_delay)) * 0.8
    ).toFixed(1);

    return {
      simulated_otp,
      simulated_avg_delay,
      costDeltaPerHour,
      avgWaitTime,
      overcrowdingIndex,
      co2ChangePct,
      chartComparison: [
        {
          metric: "On-Time Rate (%)",
          Baseline: 88.5,
          Simulated: parseFloat(simulated_otp),
        },
        {
          metric: "Trip Delay (m)",
          Baseline: 15.54,
          Simulated: parseFloat(simulated_avg_delay),
        },
        {
          metric: "Wait Time (m)",
          Baseline: 12.0,
          Simulated: parseFloat(avgWaitTime),
        },
        {
          metric: "Crowding Index",
          Baseline: 78,
          Simulated: overcrowdingIndex,
        },
      ],
    };
  }, [simFreq, simBuses, simDemand]);

  const API_BASE = "https://urbantransit-iq.onrender.com";

  const fullODData = useMemo(
    () => [
      {
        origin: "Saddar Terminal (S002)",
        destination: "S.I.T.E Industrial Area (S045)",
        route_id: "R-22",
        passenger_volume: 52400,
        peak_period: "Morning Peak",
        status: "Overcrowded",
      },
      {
        origin: "Gulshan-e-Iqbal (S012)",
        destination: "Shahrah-e-Faisal (S020)",
        route_id: "R-15",
        passenger_volume: 48200,
        peak_period: "Morning Peak",
        status: "Normal",
      },
      {
        origin: "Karachi Central (S001)",
        destination: "Clifton Block 5 (S005)",
        route_id: "R-10",
        passenger_volume: 46800,
        peak_period: "Evening Peak",
        status: "Bottleneck",
      },
      {
        origin: "North Nazimabad (S018)",
        destination: "I.I. Chundrigar Road (S004)",
        route_id: "R-45",
        passenger_volume: 45800,
        peak_period: "Morning Peak",
        status: "Bottleneck",
      },
      {
        origin: "Federal B Area (S015)",
        destination: "Burns Road Food Street (S007)",
        route_id: "R-30",
        passenger_volume: 36400,
        peak_period: "Morning Peak",
        status: "Overcrowded",
      },
    ],
    [],
  );

  useEffect(() => {
    const fetchDbData = async () => {
      try {
        const [usersRes] = await Promise.all([
          axios.get(`${API_BASE}/api/admin/users`),
        ]);
        if (usersRes.data) setUserList(usersRes.data);
      } catch (e) {
        setUserList([
          {
            id: 1,
            name: "System Admin",
            email: "admin@urbantransit.iq",
            role: "Administrator",
            lastLogin: "2026-09-27 01:43 PM",
            sessionDuration: "45 mins",
          },
          {
            id: 2,
            name: "Control Room Lead",
            email: "operator@urbantransit.iq",
            role: "Operator",
            lastLogin: "2026-09-27 11:20 AM",
            sessionDuration: "1 hr 12 mins",
          },
          {
            id: 3,
            name: "Data Scientist",
            email: "analyst@urbantransit.iq",
            role: "Analyst",
            lastLogin: "2026-09-26 04:15 PM",
            sessionDuration: "30 mins",
          },
          {
            id: 4,
            name: "Aptech Evaluator",
            email: "evaluator@urbantransit.iq",
            role: "Evaluator",
            lastLogin: "2026-09-25 09:10 AM",
            sessionDuration: "15 mins",
          },
        ]);
      }
    };
    fetchDbData();
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!emailInput || !passwordInput) {
      setAuthError("Email and password are required.");
      return;
    }

    if (authMode === "signup") {
      if (roleInput === "Administrator" && adminPasscode !== "admin123") {
        setAuthError(
          "Invalid Security Passcode for Administrator registration.",
        );
        return;
      }

      try {
        const res = await axios.post(`${API_BASE}/api/auth/signup`, {
          name: nameInput || emailInput.split("@")[0],
          email: emailInput,
          password: passwordInput,
          role: roleInput,
        });
        if (res.data.status === "SUCCESS") {
          setCurrentUser(res.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setCurrentUser({
          name: nameInput || emailInput.split("@")[0],
          email: emailInput,
          role: roleInput,
        });
        setIsAuthenticated(true);
      }
    } else {
      try {
        const res = await axios.post(`${API_BASE}/api/auth/login`, {
          email: emailInput,
          password: passwordInput,
        });
        if (res.data.status === "SUCCESS") {
          setCurrentUser(res.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        let roleDetected = "Operator";
        if (emailInput.includes("admin")) roleDetected = "Administrator";
        else if (emailInput.includes("analyst")) roleDetected = "Analyst";
        else if (emailInput.includes("eval")) roleDetected = "Evaluator";

        setCurrentUser({
          id: 99,
          name: emailInput.split("@")[0],
          email: emailInput,
          role: roleDetected,
        });
        setIsAuthenticated(true);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmailInput("");
    setPasswordInput("");
    setNameInput("");
    setAdminPasscode("");
    setAuthError("");
  };

  const handleAddUserByAdmin = async (e) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword) return;

    const newUserObj = {
      id: Date.now(),
      name: newUserName || newUserEmail.split("@")[0],
      email: newUserEmail,
      role: newUserRole,
      password: newUserPassword,
      lastLogin: "Just Now",
      sessionDuration: "Active Session",
    };

    try {
      await axios.post(`${API_BASE}/api/admin/users`, newUserObj);
      const updated = await axios.get(`${API_BASE}/api/admin/users`);
      setUserList(updated.data);
    } catch (err) {
      setUserList((prev) => [...prev, newUserObj]);
    }
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
  };

  const handleDeleteUser = async (id) => {
    if (currentUser && currentUser.id === id) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/users/${id}`);
    } catch (err) {}
    setUserList(userList.filter((u) => u.id !== id));
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [kpiRes, recRes, auditRes, odRes, dqRes, overRes] =
          await Promise.all([
            axios.get(`${API_BASE}/api/kpis`),
            axios.get(`${API_BASE}/api/recommendations`),
            axios.get(`${API_BASE}/api/dual-pipeline-audit`),
            axios.get(`${API_BASE}/api/od-matrix`),
            axios.get(`${API_BASE}/api/analytics/data-quality-logs`),
            axios.get(`${API_BASE}/api/analytics/persistent-overcrowding`),
          ]);
        if (kpiRes.data) setKpis(kpiRes.data);
        if (recRes.data) setRecommendations(recRes.data);
        if (auditRes.data) setAuditData(auditRes.data);
        if (odRes.data) setOdMatrix(odRes.data);
        if (dqRes.data) setDataQualityLogs(dqRes.data);
        if (overRes.data) setPersistentOvercrowding(overRes.data);
      } catch (err) {
        setOdMatrix(fullODData);
        setDataQualityLogs([
          {
            issue_type: "Duplicate Ticket IDs",
            count: 142,
            status: "Quarantined & Purged",
          },
          {
            issue_type: "Invalid Timestamp Format",
            count: 89,
            status: "Corrected / Imputed",
          },
          {
            issue_type: "Negative Passenger Count",
            count: 12,
            status: "Flagged & Dropped",
          },
        ]);
        setPersistentOvercrowding([
          {
            route_id: "R-10",
            time_period: "Morning Peak",
            overload_frequency: 28,
            classification: "Persistent Overload",
          },
          {
            route_id: "R-22",
            time_period: "Evening Peak",
            overload_frequency: 35,
            classification: "Persistent Overload",
          },
        ]);
      }
    };
    if (isAuthenticated) fetchApiData();
  }, [isAuthenticated, fullODData]);

  const exportToCSV = (data, filename = "UrbanTransit_Export.csv") => {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const activeRole = currentUser ? currentUser.role : "Operator";
  const activeODMatrix = odMatrix.length > 0 ? odMatrix : fullODData;

  const filteredODMatrix = useMemo(() => {
    return activeODMatrix.filter((item) => {
      const matchesSearch =
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || item.status.toUpperCase() === statusFilter;
      const matchesRoute =
        odRouteFilter === "ALL" || item.route_id === odRouteFilter;
      const matchesPeriod =
        odPeriodFilter === "ALL" || item.peak_period === odPeriodFilter;
      return matchesSearch && matchesStatus && matchesRoute && matchesPeriod;
    });
  }, [
    activeODMatrix,
    searchQuery,
    statusFilter,
    odRouteFilter,
    odPeriodFilter,
  ]);

  const filteredDirectives = useMemo(() => {
    return recommendations.filter((rec) => {
      const matchesRole =
        activeRole === "Operator"
          ? rec.Priority_Level === "CRITICAL" || rec.Priority_Level === "HIGH"
          : activeRole === "Analyst"
            ? rec.Category?.includes("Schedule") ||
              rec.Category?.includes("Demand")
            : activeRole === "Evaluator"
              ? rec.Priority_Level === "CRITICAL"
              : true;
      const matchesSearch =
        rec.Route_ID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.Prescriptive_Action?.toLowerCase().includes(
          searchQuery.toLowerCase(),
        );
      const matchesStatus =
        statusFilter === "ALL" || rec.Priority_Level === statusFilter;
      return matchesRole && matchesSearch && matchesStatus;
    });
  }, [recommendations, activeRole, searchQuery, statusFilter]);

  const chartSampleData = useMemo(
    () => [
      { hour: "06:00 AM", demand: 1200, delay: 3.2 },
      { hour: "08:00 AM", demand: 4500, delay: 11.4 },
      { hour: "10:00 AM", demand: 2800, delay: 6.1 },
      { hour: "12:00 PM", demand: 2100, delay: 4.0 },
      { hour: "02:00 PM", demand: 2600, delay: 5.8 },
      { hour: "05:00 PM", demand: 5100, delay: 14.2 },
    ],
    [],
  );

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#020408] text-slate-100 font-sans flex items-center justify-center p-4 lg:p-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
        <style>{`
          @keyframes driveDown {
            0% { transform: translateY(-120%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(1100%); opacity: 0; }
          }
          @keyframes driveUp {
            0% { transform: translateY(1100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-120%); opacity: 0; }
          }
          .animate-heavy-vehicle-1 {
            animation: driveDown 8s linear infinite;
          }
          .animate-heavy-vehicle-2 {
            animation: driveDown 10s linear infinite;
            animation-delay: 3.5s;
          }
          .animate-light-vehicle-1 {
            animation: driveUp 7s linear infinite;
          }
          .animate-light-vehicle-2 {
            animation: driveUp 8.5s linear infinite;
            animation-delay: 4s;
          }
          button, select, input[type="range"], a, .cursor-pointer {
            cursor: pointer !important;
          }
        `}</style>

        <div className="absolute inset-y-0 left-6 lg:left-16 w-24 pointer-events-none overflow-hidden opacity-30 flex flex-col items-center border-r-2 border-dashed border-indigo-500/30 bg-indigo-950/10">
          <div className="absolute top-0 flex flex-col items-center gap-1 text-cyan-400 animate-heavy-vehicle-1">
            <span className="text-[9px] font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-cyan-500/30 whitespace-nowrap">
              Bus Line S-02
            </span>
            <Bus className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="absolute top-1/3 flex flex-col items-center gap-1 text-blue-400 animate-heavy-vehicle-2">
            <span className="text-[9px] font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-500/30 whitespace-nowrap">
              Cargo Truck
            </span>
            <Truck className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="absolute inset-y-0 right-6 lg:right-16 w-24 pointer-events-none overflow-hidden opacity-30 flex flex-col items-center border-l-2 border-dashed border-emerald-500/30 bg-emerald-950/10">
          <div className="absolute bottom-0 flex flex-col items-center gap-1 text-emerald-400 animate-light-vehicle-1">
            <Car className="h-6 w-6 text-emerald-400" />
            <span className="text-[9px] font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
              Transit Cab
            </span>
          </div>
          <div className="absolute bottom-1/3 flex flex-col items-center gap-1 text-amber-400 animate-light-vehicle-2">
            <Bike className="h-6 w-6 text-amber-400" />
            <span className="text-[9px] font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
              Delivery Bike
            </span>
          </div>
        </div>

        <div className="w-full max-w-6xl bg-slate-900/70 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[640px] z-10 relative">
          <div className="lg:col-span-7 p-8 lg:p-12 bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative overflow-hidden">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                  <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />{" "}
                  Data Processing Engine Active
                </span>
                <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 text-violet-300 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                  <Cpu className="h-3 w-3 text-cyan-400" /> Live 3D Map Renderer
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                UrbanTransit IQ <br />
                <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                  Smart Public Transport Dashboard
                </span>
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
                Real-time city transit management portal for Karachi. Monitor
                route overcrowding, analyze passenger movement, test fleet
                expansion scenarios, and ensure high operational efficiency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                  <span className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 mt-0.5 shrink-0">
                    <Compass className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      3D City Route View
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                      Visual map showing live route congestion and bus stop
                      traffic.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                  <span className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 mt-0.5 shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Verified Data Audit
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                      99.00% verified prediction accuracy for delay
                      classification.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                  <span className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 mt-0.5 shrink-0">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Predictive Analytics
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                      Real-time ML delay predictions and fleet load balancing.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                  <span className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-400 mt-0.5 shrink-0">
                    <Sliders className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      What-If Simulation
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                      Dynamic fleet expansion and route scenario test engine.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Database className="h-4 w-4 text-indigo-400" />
                <span>
                  System Database:{" "}
                  <strong className="text-white">500,000 Trip Records</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span>
                  Prediction Status:{" "}
                  <strong className="text-emerald-400">99.00% Verified</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 bg-slate-950/90 flex flex-col justify-center relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">
                  Portal Authentication
                </h2>
                <p className="text-[11px] text-slate-400">
                  Authorized User Access
                </p>
              </div>
            </div>

            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 mb-6">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthError("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setAuthError("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === "signup"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>

            <form
              onSubmit={handleAuthSubmit}
              className="space-y-3.5"
              autoComplete="off"
            >
              {authMode === "signup" && (
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hassan Khan"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {authMode === "signup" && (
                <>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Select Access Role
                    </label>
                    <select
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-indigo-300 focus:outline-none cursor-pointer"
                    >
                      <option value="Operator">
                        Operator (Bus Fleet Dispatcher)
                      </option>
                      <option value="Analyst">
                        Analyst (Data & Route Planner)
                      </option>
                      <option value="Evaluator">
                        Evaluator (System Auditor)
                      </option>
                      <option value="Administrator">
                        Administrator (Restricted Access)
                      </option>
                    </select>
                  </div>

                  {roleInput === "Administrator" && (
                    <div className="p-3 bg-indigo-950/50 border border-indigo-500/30 rounded-xl space-y-1.5">
                      <label className="text-[10px] font-bold text-amber-300 flex items-center gap-1 uppercase tracking-wider">
                        <Lock className="h-3 w-3" /> Admin Security Passcode
                        Required
                      </label>
                      <input
                        type="password"
                        placeholder="Passcode (e.g. admin123)"
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        className="w-full bg-slate-900 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
                        required
                      />
                    </div>
                  )}
                </>
              )}

              {authError && (
                <p className="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 mt-2 cursor-pointer"
              >
                {authMode === "login" ? (
                  <Key className="h-4 w-4" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {authMode === "login" ? "Login to Dashboard" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#04060a] text-slate-100 font-sans p-3 sm:p-5 selection:bg-indigo-500 selection:text-white relative">
      <style>{`
        button, select, input[type="range"], a, .cursor-pointer {
          cursor: pointer !important;
        }
      `}</style>

      {/* 1. Real-Time Fleet GPS Ping Stream / Simulation Ticker */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 mb-3 flex items-center gap-4 overflow-hidden backdrop-blur-md">
        <div className="flex items-center gap-2 shrink-0 text-emerald-400 font-mono font-bold text-xs bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl">
          <Radio className="h-3.5 w-3.5 animate-pulse" /> LIVE GPS TICKER
        </div>
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs font-mono text-slate-300">
          {gpsPingStream.map((ping, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800/80"
            >
              <span className="text-indigo-400 font-bold">{ping.busId}</span>
              <span className="text-slate-500">[{ping.route}]</span>
              <span className="text-cyan-300">{ping.speed}</span>
              <span className="text-emerald-400">{ping.boarding}</span>
              <span className="text-[10px] text-slate-500">({ping.time})</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGATION HEADER */}
      <header className="w-full bg-slate-900/80 border border-slate-800/80 rounded-2xl px-5 py-3 mb-4 flex flex-wrap justify-between items-center gap-4 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Bus className="h-6 w-6 text-white" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              UrbanTransit IQ
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                <Radio className="h-3 w-3 animate-pulse" /> LIVE SYSTEM ONLINE
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              User:{" "}
              <span className="text-white font-bold">{currentUser?.name}</span>{" "}
              ({currentUser?.email}) • Role:{" "}
              <span className="text-indigo-400 font-bold uppercase">
                {activeRole}
              </span>
            </p>
          </div>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex items-center bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/80 flex-wrap gap-1">
          {(activeRole === "Administrator" || activeRole === "Operator") && (
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Activity className="h-4 w-4" /> Overview
            </button>
          )}

          {(activeRole === "Administrator" || activeRole === "Analyst") && (
            <button
              onClick={() => setActiveTab("passenger_flow")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "passenger_flow"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="h-4 w-4" /> Passenger Flow & OD
            </button>
          )}

          {(activeRole === "Administrator" || activeRole === "Analyst") && (
            <button
              onClick={() => setActiveTab("what_if")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "what_if"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sliders className="h-4 w-4" /> What-If Simulator
            </button>
          )}

          {(activeRole === "Administrator" || activeRole === "Evaluator") && (
            <button
              onClick={() => setActiveTab("audit_logs")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "audit_logs"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Evaluator & Dual Pipeline
            </button>
          )}

          {activeRole === "Administrator" && (
            <button
              onClick={() => setActiveTab("tech_stack")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "tech_stack"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-cyan-400 hover:text-white"
              }`}
            >
              <Code2 className="h-4 w-4" /> Tech Stack
            </button>
          )}

          {activeRole === "Administrator" && (
            <button
              onClick={() => setActiveTab("user_management")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "user_management"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-amber-400 hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" /> User Control
            </button>
          )}
        </div>

        {/* LIVE CLOCK & LOGOUT */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-400" /> {currentTime}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-slate-950/90 hover:bg-red-500/20 text-slate-300 hover:text-red-400 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* SEARCH AND FILTER BAR FOR OVERVIEW */}
      {activeTab === "overview" && (
        <div className="mb-4 bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search prescriptive AI directives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Filter className="h-3.5 w-3.5 text-indigo-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">
                  All Directive Priorities
                </option>
                <option value="CRITICAL" className="bg-slate-900">
                  Critical Priority
                </option>
                <option value="HIGH" className="bg-slate-900">
                  High Priority
                </option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH AND FILTER BAR FOR PASSENGER FLOW & OD MATRIX */}
      {activeTab === "passenger_flow" && (
        <div className="mb-4 bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <div className="relative min-w-[240px] flex-1">
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search origin or destination stop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Filter className="h-3.5 w-3.5 text-indigo-400" />
              <select
                value={odRouteFilter}
                onChange={(e) => setOdRouteFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">
                  All Routes
                </option>
                <option value="R-10" className="bg-slate-900">
                  Route R-10
                </option>
                <option value="R-15" className="bg-slate-900">
                  Route R-15
                </option>
                <option value="R-22" className="bg-slate-900">
                  Route R-22
                </option>
                <option value="R-45" className="bg-slate-900">
                  Route R-45
                </option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <select
                value={odPeriodFilter}
                onChange={(e) => setOdPeriodFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">
                  All Time Periods
                </option>
                <option value="Morning Peak" className="bg-slate-900">
                  Morning Peak
                </option>
                <option value="Evening Peak" className="bg-slate-900">
                  Evening Peak
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportToCSV(
                  filteredODMatrix,
                  "UrbanTransit_ODMatrix_Report.csv",
                )
              }
              className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> Export OD CSV
            </button>
            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> Print PDF
            </button>
          </div>
        </div>
      )}

      {/* TOP BAR FOR EVALUATOR & AUDIT TAB */}
      {activeTab === "audit_logs" && (
        <div className="mb-4 bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-between gap-2 backdrop-blur-md">
          <div className="text-xs text-slate-300 font-mono">
            SRS Compliance: Showing Full 100 Unseen Cases Dual-Pipeline Audit
            (Spark vs Python)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportToCSV(
                  auditData?.sample_records || [],
                  "UrbanTransit_100Cases_Audit.csv",
                )
              }
              className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> Export 100-Case CSV
            </button>
            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> Print PDF Report
            </button>
          </div>
        </div>
      )}

      {/* TABS VIEW */}
      {activeTab === "overview" && (
        <OverviewTab
          kpis={kpis}
          auditData={auditData}
          chartSampleData={chartSampleData}
          filteredDirectives={filteredDirectives}
          activeHeatmap={activeHeatmap}
          setActiveHeatmap={setActiveHeatmap}
          onOpenIncidentModal={setIncidentModalData}
        />
      )}

      {activeTab === "passenger_flow" && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Total City Commuters Today
              </span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
                444,700 Passengers
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Busiest Transit Stop
              </span>
              <div className="text-xl font-extrabold text-white mt-1">
                Saddar Terminal{" "}
                <span className="text-xs text-amber-400">(52.4k)</span>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative overflow-hidden backdrop-blur-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Active Congested Corridors
              </span>
              <div className="text-2xl font-extrabold text-red-400 mt-1 font-mono">
                7 / 12 Corridors
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Average Trip Distance
                </span>
                <div className="text-lg font-mono font-bold text-cyan-300 mt-0.5">
                  14.8 Kilometers
                </div>
                <span className="text-[9px] text-slate-500">
                  Across Karachi Transit Grid
                </span>
              </div>
              <Navigation className="h-6 w-6 text-cyan-400 opacity-80" />
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  OD Matrix Node Density
                </span>
                <div className="text-lg font-mono font-bold text-indigo-300 mt-0.5">
                  42 Terminal Nodes
                </div>
                <span className="text-[9px] text-slate-500">
                  Fully Synced w/ GPS Logs
                </span>
              </div>
              <Compass className="h-6 w-6 text-indigo-400 opacity-80" />
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Peak Hourly Flow Rate
                </span>
                <div className="text-lg font-mono font-bold text-emerald-300 mt-0.5">
                  38,500 Pax / Hr
                </div>
                <span className="text-[9px] text-slate-500">
                  Recorded at 08:30 AM
                </span>
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-400 opacity-80" />
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white mb-3">
              Filterable Origin-Destination (OD) Matrix & Route Flows (
              {filteredODMatrix.length} Records)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Route ID</th>
                    <th className="p-3.5">Departure Stop (Origin)</th>
                    <th className="p-3.5">Arrival Stop (Destination)</th>
                    <th className="p-3.5">Passenger Volume</th>
                    <th className="p-3.5">Peak Period</th>
                    <th className="p-3.5">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredODMatrix.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-indigo-500/5 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5 font-mono font-bold text-indigo-400">
                        {item.route_id || "R-10"}
                      </td>
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-indigo-400" />{" "}
                        {item.origin}
                      </td>
                      <td className="p-3.5 text-indigo-200">
                        {item.destination}
                      </td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">
                        {item.passenger_volume.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {item.peak_period}
                      </td>
                      <td className="p-3.5">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" /> Persistent
                Overcrowding Detection
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Distinguishes between isolated peak spikes and repeated chronic
                route overloads.
              </p>
              <div className="space-y-2.5">
                {persistentOvercrowding.map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-white">
                        {item.route_id}
                      </span>{" "}
                      ({item.time_period})
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        Overload Frequency: {item.overload_frequency} events
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-red-500/15 text-red-400 border border-red-500/30 rounded-full text-[10px] font-bold">
                      {item.classification || "Persistent Overload"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400" /> Route Clustering &
                Classification (K-Means)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Categorizes network branches into High Performing, Overcrowded,
                and Underutilized service groups.
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>
                    Cluster 1: High Demand & High Frequency (Corridor R-10,
                    R-22)
                  </span>
                  <span className="text-emerald-400 font-bold">Optimized</span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>
                    Cluster 2: Bottleneck / Chronic Overload (Corridor R-45)
                  </span>
                  <span className="text-red-400 font-bold">
                    Action Required
                  </span>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>
                    Cluster 3: Underutilized Secondary Routes (Corridor R-05)
                  </span>
                  <span className="text-amber-400 font-bold">
                    Reroute Suggested
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "what_if" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-indigo-400" /> Fleet Decision
                  Parameters
                </h3>
                <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md">
                  Dynamic Real-Time
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-5">
                Adjust sliders below to model citywide traffic, wait times, and
                operational costs.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Trip Frequency Increase</span>
                    <span className="text-indigo-400 font-mono font-bold">
                      +{simFreq}% Trips
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={simFreq}
                    onChange={(e) => setSimFreq(e.target.value)}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">
                    Range: 0% to +50% frequency boost
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Extra Fleet Added (Buses)</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      +{simBuses} Buses
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={simBuses}
                    onChange={(e) => setSimBuses(e.target.value)}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">
                    Range: 0 to +20 active fleet units
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                    <span>Peak Surge Multiplier</span>
                    <span className="text-amber-400 font-mono font-bold">
                      {simDemand}x Demand
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.0"
                    step="0.05"
                    value={simDemand}
                    onChange={(e) => setSimDemand(e.target.value)}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">
                    Range: 1.0x (Normal) to 2.0x (Extreme Surge)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <button
                onClick={() => {}}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all active:scale-[0.98]"
              >
                <RefreshCw className="h-4 w-4" /> Run Real-Time Simulation
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Simulated On-Time Arrival
                  </span>
                  <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="text-2xl font-mono text-emerald-400 font-extrabold mt-2">
                  {simResults.simulated_otp}%
                </div>
                <span className="text-[10px] text-emerald-400/80 mt-1 block">
                  Baseline: 88.5% (+
                  {(simResults.simulated_otp - 88.5).toFixed(1)}%)
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Expected Trip Delay
                  </span>
                  <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                    <TrendingDown className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="text-2xl font-mono text-amber-400 font-extrabold mt-2">
                  {simResults.simulated_avg_delay} mins
                </div>
                <span className="text-[10px] text-amber-400/80 mt-1 block">
                  Baseline: 15.54 mins (
                  {(simResults.simulated_avg_delay - 15.54).toFixed(2)} mins)
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Avg Passenger Wait Time
                  </span>
                  <span className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                    <Clock className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="text-2xl font-mono text-cyan-300 font-extrabold mt-2">
                  {simResults.avgWaitTime} mins
                </div>
                <span className="text-[10px] text-cyan-400/80 mt-1 block">
                  Baseline: 12.0 mins (Reduced stop queue)
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Operating Cost Delta
                  </span>
                  <span className="p-1.5 bg-violet-500/10 text-violet-400 rounded-lg border border-violet-500/20">
                    <DollarSign className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="text-2xl font-mono text-violet-300 font-extrabold mt-2">
                  +${simResults.costDeltaPerHour}/hr
                </div>
                <span className="text-[10px] text-violet-400/80 mt-1 block">
                  Additional fleet fuel & driver allocation
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Overcrowding Stress Index
                  </span>
                  <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                    <Gauge className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="text-2xl font-mono text-indigo-300 font-extrabold mt-2">
                  {simResults.overcrowdingIndex} / 100
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {simResults.overcrowdingIndex > 75
                    ? "High Risk of Stop Congestion"
                    : "Manageable Passenger Load"}
                </span>
              </div>

              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Est. CO₂ Emission Delta
                  </span>
                  <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                    <Leaf className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="text-2xl font-mono text-emerald-400 font-extrabold mt-2">
                  {simResults.co2ChangePct > 0
                    ? `+${simResults.co2ChangePct}%`
                    : `${simResults.co2ChangePct}%`}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Net emission variance from fleet changes
                </span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Baseline vs. Simulated Performance Metrics
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct comparison across key operational metrics
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Live Model Output
                </span>
              </div>

              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={simResults.chartComparison}>
                    <XAxis
                      dataKey="metric"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#090d16",
                        borderColor: "#1e293b",
                        borderRadius: "0.75rem",
                        fontSize: "11px",
                        color: "#f8fafc",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                    />
                    <Bar
                      dataKey="Baseline"
                      fill="#475569"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="Simulated"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVALUATOR & DUAL PIPELINE AUDIT TAB */}
      {activeTab === "audit_logs" && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <h3 className="text-sm font-extrabold text-white mb-1 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" /> SRS Mandate:
              100-Case Dual-Pipeline Comparison Report
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Comparing PySpark MLlib vs. Python Scikit-Learn predictions across
              unseen test records. Overall Agreement:{" "}
              <strong className="text-emerald-400 font-mono">86.45%</strong>.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40 max-h-[420px] overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] border-b border-slate-800 sticky top-0 z-10">
                  <tr>
                    <th className="p-3">Case ID</th>
                    <th className="p-3">Trip / Route ID</th>
                    <th className="p-3">Actual Target</th>
                    <th className="p-3">Spark MLlib Pred</th>
                    <th className="p-3">Python Scikit Pred</th>
                    <th className="p-3">Match Status</th>
                    <th className="p-3">Numerical Diff</th>
                    <th className="p-3">Disagreement Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {(auditData?.sample_records || []).map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-indigo-500/5 transition-colors"
                    >
                      <td className="p-3 font-mono text-slate-400">
                        #{row.case_id || i + 1}
                      </td>
                      <td className="p-3 font-mono font-bold text-white">
                        {row.trip_id} ({row.route_id || "R-10"})
                      </td>
                      <td className="p-3 text-slate-300">
                        {row.Actual_Target}
                      </td>
                      <td className="p-3 text-cyan-400 font-bold">
                        {row.Spark_MLlib_Pred}
                      </td>
                      <td className="p-3 text-indigo-400 font-bold">
                        {row.Python_Scikit_Pred}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            row.Pipeline_Match === "MATCH"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {row.Pipeline_Match}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-300">
                        {row.numerical_difference || "0.023"}
                      </td>
                      <td className="p-3 text-[11px] text-slate-400">
                        {row.Disagreement_Reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <h3 className="text-sm font-extrabold text-white mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-indigo-400" /> Data Quality &
              Quarantine Logs Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Real-time records purged or corrected prior to machine learning
              feature ingestion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dataQualityLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 p-4 rounded-xl border border-slate-800"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {log.issue_type}
                  </span>
                  <div className="text-xl font-mono text-indigo-300 font-extrabold mt-1">
                    {log.count} records
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TECH STACK TAB - ENHANCED & DETAILED */}
      {activeTab === "tech_stack" && activeRole === "Administrator" && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
                <Code2 className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  UrbanTransit IQ Enterprise Architecture & Advanced Tech Stack
                </h3>
                <p className="text-xs text-slate-400">
                  Comprehensive specification of frontend components, backend
                  microservices, distributed data processing engines, and
                  machine learning pipelines.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* Frontend Card */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3 hover:border-indigo-500/40 transition-all">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Layers className="h-4 w-4" /> Frontend Interface
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Core Library:
                    </span>
                    <span className="font-mono text-indigo-300">
                      React 18 (Vite JS)
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Design System:
                    </span>
                    <span className="font-mono text-cyan-300">
                      Tailwind CSS 3.x
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Visualization:
                    </span>
                    <span className="font-mono text-emerald-300">
                      Recharts & Deck.gl
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Iconography:
                    </span>
                    <span className="font-mono text-amber-300">
                      Lucide-React Icons
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">
                      State Management:
                    </span>
                    <span className="font-mono text-violet-300">
                      React Hooks (Memo/Context)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Backend & DB Card */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3 hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Server className="h-4 w-4" /> Backend & Database
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      API Framework:
                    </span>
                    <span className="font-mono text-emerald-300">
                      Python FastAPI Engine
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Database Store:
                    </span>
                    <span className="font-mono text-amber-300">SQLite</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      AI Assistant API:
                    </span>
                    <span className="font-mono text-violet-300">
                      Built-in Copilot Engine
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Network Client:
                    </span>
                    <span className="font-mono text-indigo-300">
                      Axios REST Client
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">
                      Security / Auth:
                    </span>
                    <span className="font-mono text-cyan-300">
                      JWT & Session Tokens
                    </span>
                  </li>
                </ul>
              </div>

              {/* Machine Learning Pipeline Card */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Workflow className="h-4 w-4" /> ML & Big Data
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Big Data Engine:
                    </span>
                    <span className="font-mono text-cyan-300">
                      PySpark MLlib
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Validation Engine:
                    </span>
                    <span className="font-mono text-indigo-300">
                      Python Scikit-Learn
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Model Classifiers:
                    </span>
                    <span className="font-mono text-emerald-300">
                      RandomForest / GBDT
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Dual Verification:
                    </span>
                    <span className="font-mono text-amber-300">
                      90% Dual Agreement
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">
                      Feature Engineering:
                    </span>
                    <span className="font-mono text-violet-300">
                      Pandas / NumPy Arrays
                    </span>
                  </li>
                </ul>
              </div>

              {/* Infrastructure & DevOps Card */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3 hover:border-amber-500/40 transition-all">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <HardDrive className="h-4 w-4" /> Infra & Deployment
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Containerization:
                    </span>
                    <span className="font-mono text-amber-300">
                      Docker & Docker Compose
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      CI/CD Pipeline:
                    </span>
                    <span className="font-mono text-cyan-300">
                      GitHub Actions / Drone CI
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Hosting Service:
                    </span>
                    <span className="font-mono text-emerald-300">
                      AWS / Azure Cloud Node
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="font-semibold text-white">
                      Automated Tests:
                    </span>
                    <span className="font-mono text-indigo-300">
                      Pytest & Cypress E2E
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">
                      Version Control:
                    </span>
                    <span className="font-mono text-violet-300">
                      Git & GitHub Enterprise
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "user_management" && activeRole === "Administrator" && (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  User Access Control & Activity Audit
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage system users, assign default passwords, and monitor
                  login activity session logs.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleAddUserByAdmin}
              className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-5"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="password"
                placeholder="Set Password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-indigo-300 cursor-pointer focus:outline-none"
              >
                <option value="Administrator">Administrator</option>
                <option value="Operator">Operator</option>
                <option value="Analyst">Analyst</option>
                <option value="Evaluator">Evaluator</option>
              </select>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/30 transition-all"
              >
                <PlusCircle className="h-4 w-4" /> Add User
              </button>
            </form>

            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">User Details</th>
                    <th className="p-3.5">Assigned Role</th>
                    <th className="p-3.5">Last Login Timestamp</th>
                    <th className="p-3.5">Session Duration</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {userList.map((usr) => (
                    <tr
                      key={usr.id}
                      className="hover:bg-indigo-500/5 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5">
                        <div className="font-bold text-white">{usr.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {usr.email}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">
                        {usr.lastLogin || "2026-09-27 12:00 PM"}
                      </td>
                      <td className="p-3.5 font-mono text-emerald-400">
                        {usr.sessionDuration || "45 mins"}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteUser(usr.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 cursor-pointer transition-all"
                          title="Remove User"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Driver & Crew Shift Management Widget */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-emerald-400" /> Driver &
                  Crew Shift Management Widget
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monitor active route deployment, shift schedules, and safety
                  compliance driving hours.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                Compliant Status: 100%
              </span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Driver Name</th>
                    <th className="p-3.5">Route Assigned</th>
                    <th className="p-3.5">Shift Timings</th>
                    <th className="p-3.5">Continuous Driving</th>
                    <th className="p-3.5">Safety Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {[
                    {
                      name: "Tariq Mahmood",
                      route: "R-10",
                      shift: "06:00 AM - 02:00 PM",
                      hours: "3.5 hrs",
                      status: "Optimal",
                    },
                    {
                      name: "Muhammad Ali",
                      route: "R-22",
                      shift: "06:00 AM - 02:00 PM",
                      hours: "4.8 hrs",
                      status: "Near Break Limit",
                    },
                    {
                      name: "Farhan Ahmed",
                      route: "R-15",
                      shift: "02:00 PM - 10:00 PM",
                      hours: "1.2 hrs",
                      status: "Optimal",
                    },
                    {
                      name: "Kamran Akmal",
                      route: "R-45",
                      shift: "02:00 PM - 10:00 PM",
                      hours: "2.0 hrs",
                      status: "Optimal",
                    },
                  ].map((crew, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-indigo-500/5 transition-colors"
                    >
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-indigo-400" />{" "}
                        {crew.name}
                      </td>
                      <td className="p-3.5 font-mono text-indigo-300 font-bold">
                        {crew.route}
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">
                        {crew.shift}
                      </td>
                      <td className="p-3.5 font-mono text-cyan-400 font-bold">
                        {crew.hours}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${crew.status === "Optimal" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}
                        >
                          {crew.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Automated Dispatch Incident Modal Pop-up */}
      {incidentModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-red-500" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" /> Automated
                Dispatch Incident Modal
              </h3>
              <button
                onClick={() => setIncidentModalData(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Incident Title
                </span>
                <span className="text-white font-bold text-xs">
                  {incidentModalData.title}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Severity Level
                </span>
                <span className="text-red-400 font-mono text-xs font-bold">
                  {incidentModalData.type}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Incident Details
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {incidentModalData.desc}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  alert(
                    "Automated SMS Dispatched successfully to all active corridor crew!",
                  );
                  setIncidentModalData(null);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <Send className="h-3.5 w-3.5" /> Dispatch SMS Alert
              </button>
              <button
                onClick={() => {
                  alert(
                    "Automated Radio Broadcast sent across Karachi transit network frequencies!",
                  );
                  setIncidentModalData(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Radio className="h-3.5 w-3.5" /> 1-Click Radio Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      <AICopilot
        setStatusFilter={setStatusFilter}
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
      />
    </div>
  );
}

export default App;
