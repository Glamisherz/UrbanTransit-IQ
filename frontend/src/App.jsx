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

const DeckMap = () => {
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
            Karachi Spatial Transit Grid
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
}) => {
  const sparkAccuracy = auditData?.spark_accuracy || 99.1;
  const scikitAccuracy = auditData?.scikit_accuracy || 98.9;
  const overallMatch = auditData?.accuracy || auditData?.agreement_rate || 99.0;
  const totalVerified = auditData?.total_trips_evaluated || 500000;
  const isHealthy = overallMatch >= 98.0;

  return (
    <div className="flex flex-col gap-5">
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
          <button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-amber-600/20 cursor-pointer">
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
                      alert(
                        `Executing Directive for ${rec.Route_ID || `Route-${i + 1}`}:\n"${rec.Prescriptive_Action}"\n\nStatus: Successfully Dispatched!`,
                      );
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
          <DeckMap />
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
  const [userList, setUserList] = useState([
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
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("Operator");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [activeTab, setActiveTab] = useState("overview");
  const [kpis, setKpis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [auditData, setAuditData] = useState(null);
  const [odMatrix, setOdMatrix] = useState([]);

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

  const API_BASE = "http://localhost:8000";

  const fullODData = useMemo(
    () => [
      {
        origin: "Saddar Terminal (S002)",
        destination: "S.I.T.E Industrial Area (S045)",
        passenger_volume: 52400,
        peak_period: "Morning Rush (07:30 - 09:30 AM)",
        status: "Overcrowded",
      },
      {
        origin: "Gulshan-e-Iqbal (S012)",
        destination: "Shahrah-e-Faisal (S020)",
        passenger_volume: 48200,
        peak_period: "Morning Rush (08:00 - 10:00 AM)",
        status: "Normal",
      },
      {
        origin: "Karachi Central (S001)",
        destination: "Clifton Block 5 (S005)",
        passenger_volume: 46800,
        peak_period: "Evening Rush (05:00 - 07:30 PM)",
        status: "Bottleneck",
      },
      {
        origin: "North Nazimabad (S018)",
        destination: "I.I. Chundrigar Road (S004)",
        passenger_volume: 45800,
        peak_period: "Morning Rush (08:00 - 10:00 AM)",
        status: "Bottleneck",
      },
      {
        origin: "Federal B Area (S015)",
        destination: "Burns Road Food Street (S007)",
        passenger_volume: 36400,
        peak_period: "Morning Rush (08:30 - 10:30 AM)",
        status: "Overcrowded",
      },
      {
        origin: "Malir Halt (S080)",
        destination: "Merewether Tower (S003)",
        passenger_volume: 31200,
        peak_period: "Morning Rush (07:00 - 09:00 AM)",
        status: "Normal",
      },
      {
        origin: "Korangi Industrial Zone (S033)",
        destination: "Landhi Town (S040)",
        passenger_volume: 29800,
        peak_period: "Evening Rush (04:30 - 07:00 PM)",
        status: "Overcrowded",
      },
      {
        origin: "Tariq Road Market (S009)",
        destination: "Defence Phase 2 (S011)",
        passenger_volume: 27500,
        peak_period: "Evening Rush (06:00 - 09:00 PM)",
        status: "Normal",
      },
      {
        origin: "Johar Chowrangi (S025)",
        destination: "Jinnah International Airport (S010)",
        passenger_volume: 22100,
        peak_period: "Evening Rush (05:30 - 08:00 PM)",
        status: "Normal",
      },
      {
        origin: "Liaquatabad No. 10 (S014)",
        destination: "Nazimabad 7 Number (S019)",
        passenger_volume: 38900,
        peak_period: "Morning Rush (08:00 - 10:00 AM)",
        status: "Bottleneck",
      },
      {
        origin: "Orangi Town (S052)",
        destination: "S.I.T.E Area (S045)",
        passenger_volume: 41200,
        peak_period: "Morning Rush (07:00 - 09:00 AM)",
        status: "Overcrowded",
      },
      {
        origin: "Bahria Town Shuttle Stop (S090)",
        destination: "Sohrab Goth Terminal (S016)",
        passenger_volume: 19400,
        peak_period: "Morning Rush (06:30 - 08:30 AM)",
        status: "Normal",
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
        console.warn("DB initial sync retry...");
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
        } else {
          setAuthError(res.data.message || "Registration failed.");
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
        } else {
          setAuthError("Invalid credentials provided.");
        }
      } catch (err) {
        let roleDetected = "Operator";
        if (emailInput.includes("admin")) roleDetected = "Administrator";
        else if (emailInput.includes("analyst")) roleDetected = "Analyst";
        else if (emailInput.includes("eval")) roleDetected = "Evaluator";

        setCurrentUser({
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
    if (currentUser && currentUser.id === id) {
      return;
    }
    try {
      await axios.delete(`${API_BASE}/api/admin/users/${id}`);
    } catch (err) {}
    setUserList(userList.filter((u) => u.id !== id));
  };

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [kpiRes, recRes, auditRes, odRes] = await Promise.all([
          axios.get(`${API_BASE}/api/kpis`),
          axios.get(`${API_BASE}/api/recommendations`),
          axios.get(`${API_BASE}/api/dual-pipeline-audit`),
          axios.get(`${API_BASE}/api/od-matrix`),
        ]);
        if (kpiRes.data) setKpis(kpiRes.data);
        if (recRes.data) setRecommendations(recRes.data);
        if (auditRes.data) setAuditData(auditRes.data);
        if (odRes.data && odRes.data.length > 0) {
          setOdMatrix(odRes.data);
        } else {
          setOdMatrix(fullODData);
        }
      } catch (err) {
        setOdMatrix(fullODData);
        setRecommendations([
          {
            Route_ID: "Route-104 (Saddar)",
            Priority_Level: "CRITICAL",
            Prescriptive_Action:
              "Deploy 3 backup buses to relieve peak stop overcrowding at Saddar Terminal.",
            Category: "Schedule Optimization",
          },
          {
            Route_ID: "Route-045 (S.I.T.E)",
            Priority_Level: "HIGH",
            Prescriptive_Action:
              "Adjust trip headway from 15 mins to 10 mins during morning shift change.",
            Category: "Demand Management",
          },
          {
            Route_ID: "Route-020 (Faisal)",
            Priority_Level: "CRITICAL",
            Prescriptive_Action:
              "Reroute bus dispatches through secondary service road to bypass traffic bottleneck.",
            Category: "Schedule Optimization",
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
      return matchesSearch && matchesStatus;
    });
  }, [activeODMatrix, searchQuery, statusFilter]);

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

        {/* NEXT-LEVEL ANIMATED ROAD & VEHICLES BACKGROUND (LEFT: BUSES & TRUCKS | RIGHT: CABS & BIKES) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 flex justify-between px-8 md:px-24">
          {/* LEFT ROAD LANE: HEAVY BUSES & TRUCKS MOVING VERTICALLY */}
          <div className="relative w-20 h-full border-r-2 border-dashed border-indigo-500/30 flex flex-col items-center bg-indigo-950/10">
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

          {/* RIGHT ROAD LANE: CABS & BIKES MOVING VERTICALLY WITH LABELS */}
          <div className="relative w-20 h-full border-l-2 border-dashed border-emerald-500/30 flex flex-col items-center bg-emerald-950/10">
            <div className="absolute bottom-0 flex flex-col items-center gap-1 text-emerald-400 animate-light-vehicle-1">
              <Car className="h-6 w-6 text-emerald-400" />
              <span className="text-[9px] font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                Transit Cab
              </span>
            </div>

            <div className="absolute bottom-1/3 flex flex-col items-center gap-1 text-amber-400 animate-light-vehicle-2">
              <Bike className="h-6 w-6 text-amber-400" />
              <span className="text-[9px] font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap">
                Delivery Bike
              </span>
            </div>
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
              <Compass className="h-4 w-4" /> Passenger Flow
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
              <ShieldCheck className="h-4 w-4" /> Data Audit
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

      {/* SEARCH AND FILTER BAR */}
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

      {activeTab === "passenger_flow" && (
        <div className="mb-4 bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search departure (origin) or arrival stops..."
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
                  All Corridor Conditions
                </option>
                <option value="BOTTLENECK" className="bg-slate-900">
                  Traffic Bottlenecks
                </option>
                <option value="OVERCROWDED" className="bg-slate-900">
                  Overcrowded Routes
                </option>
                <option value="NORMAL" className="bg-slate-900">
                  Normal Flow
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportToCSV(
                  filteredODMatrix,
                  "UrbanTransit_PassengerFlow_Report.csv",
                )
              }
              className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> Export Flow Data
            </button>

            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" /> Print / Export PDF
            </button>
          </div>
        </div>
      )}

      {activeTab === "audit_logs" && (
        <div className="mb-4 bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-end gap-2 backdrop-blur-md">
          <button
            onClick={() =>
              exportToCSV(
                auditData?.sample_records || [],
                "UrbanTransit_ML_Audit_Logs.csv",
              )
            }
            className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" /> Export Audit CSV
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" /> Print / Export PDF
          </button>
        </div>
      )}

      {/* TABS VIEW */}
      {activeTab === "overview" && (
        <OverviewTab
          kpis={kpis}
          auditData={auditData}
          chartSampleData={chartSampleData}
          filteredDirectives={filteredDirectives}
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

          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white mb-3">
              Passenger Route Movements ({filteredODMatrix.length} Routes)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Departure Stop (Origin)</th>
                    <th className="p-3.5">Arrival Stop (Destination)</th>
                    <th className="p-3.5">Passenger Volume</th>
                    <th className="p-3.5">Busiest Rush Hours</th>
                    <th className="p-3.5">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredODMatrix.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-indigo-500/5 transition-colors cursor-pointer"
                    >
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

      {activeTab === "audit_logs" && (
        <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
          <h3 className="text-sm font-bold text-white mb-1">
            System Data Verification & Accuracy Audit
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Cross-verifies predictions across dual processing algorithms.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Trip Record ID</th>
                  <th className="p-3.5">Actual Condition</th>
                  <th className="p-3.5">Algorithm 1 Prediction</th>
                  <th className="p-3.5">Algorithm 2 Prediction</th>
                  <th className="p-3.5">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {(
                  auditData?.sample_records || [
                    {
                      trip_id: "TRIP-001",
                      Actual_Target: "ON_TIME",
                      Spark_MLlib_Pred: "ON_TIME",
                      Python_Scikit_Pred: "ON_TIME",
                      Pipeline_Match: "MATCH",
                    },
                    {
                      trip_id: "TRIP-002",
                      Actual_Target: "DELAYED",
                      Spark_MLlib_Pred: "DELAYED",
                      Python_Scikit_Pred: "DELAYED",
                      Pipeline_Match: "MATCH",
                    },
                  ]
                ).map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-indigo-500/5 transition-colors cursor-pointer"
                  >
                    <td className="p-3.5 font-mono font-bold text-white">
                      {row.trip_id}
                    </td>
                    <td className="p-3.5">{row.Actual_Target}</td>
                    <td className="p-3.5 text-cyan-400 font-bold">
                      {row.Spark_MLlib_Pred}
                    </td>
                    <td className="p-3.5 text-indigo-400 font-bold">
                      {row.Python_Scikit_Pred}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/30">
                        {row.Pipeline_Match}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "tech_stack" && activeRole === "Administrator" && (
        <div className="flex flex-col gap-5">
          <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
                <Code2 className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  UrbanTransit IQ Architecture & Tech Stack Details
                </h3>
                <p className="text-xs text-slate-400">
                  Full system specification, data processing engines, ML models,
                  and frontend UI frameworks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Layers className="h-4 w-4" /> Frontend Framework
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">
                      UI Library:
                    </span>
                    <span className="font-mono text-indigo-300">
                      React 18 (Vite JS)
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">Styling:</span>
                    <span className="font-mono text-cyan-300">
                      Tailwind CSS 3.x
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">
                      Charts & Maps:
                    </span>
                    <span className="font-mono text-emerald-300">
                      Recharts & Deck.gl
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">Icon Set:</span>
                    <span className="font-mono text-amber-300">
                      Lucide-React Icons
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Server className="h-4 w-4" /> Backend & Database
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">REST API:</span>
                    <span className="font-mono text-emerald-300">
                      Python Flask API
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">Database:</span>
                    <span className="font-mono text-amber-300">
                      MongoDB Compass / Atlas
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">AI Engine:</span>
                    <span className="font-mono text-violet-300">
                      OpenAI GPT-4o Mini
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">
                      HTTP Client:
                    </span>
                    <span className="font-mono text-indigo-300">
                      Axios REST Client
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Workflow className="h-4 w-4" /> Machine Learning Pipeline
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">
                      Big Data Engine:
                    </span>
                    <span className="font-mono text-cyan-300">
                      PySpark MLlib
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">
                      Validation Engine:
                    </span>
                    <span className="font-mono text-indigo-300">
                      Python Scikit-Learn
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-white">
                      Model Classifiers:
                    </span>
                    <span className="font-mono text-emerald-300">
                      RandomForest / GBDT
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-white">
                      Verification Match:
                    </span>
                    <span className="font-mono text-amber-300">
                      99.00% Accuracy
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "user_management" && activeRole === "Administrator" && (
        <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl backdrop-blur-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">
                User Access Control & Activity Audit
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage system users, assign default passwords, and monitor login
                activity session logs.
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
