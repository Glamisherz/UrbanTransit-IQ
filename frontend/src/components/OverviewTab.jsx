import React from "react";
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
  filteredDirectives,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* LEFT COLUMN: LIVE FLEET & MAP (4 COLS) */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        {/* WIDGET 1: REAL-TIME SYSTEM & FLEET DISPATCH STATUS */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
              <Server className="h-4 w-4 text-indigo-400" /> Active Fleet &
              System Status
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-mono border border-emerald-500/20 flex items-center gap-1">
              <Radio className="h-3 w-3 animate-pulse" /> Live Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <p className="text-slate-400 text-[11px] flex items-center gap-1">
                <Bus className="h-3.5 w-3.5 text-indigo-400" /> Active
                Dispatched Buses
              </p>
              <p className="text-sm font-bold text-white font-mono mt-1">
                142 / 160{" "}
                <span className="text-[10px] text-emerald-400 font-normal">
                  On Route
                </span>
              </p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
              <p className="text-slate-400 text-[11px] flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Data
                Accuracy
              </p>
              <p className="text-sm font-bold text-emerald-400 font-mono mt-1">
                {auditData ? `${auditData.agreement_rate}%` : "99.00%"} Verified
              </p>
            </div>
          </div>

          {/* ROUTE HEALTH DISTRIBUTION PROGRESS BAR */}
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-300 mb-1.5">
              <span>Overall Route Health</span>
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

        {/* WIDGET 2: LIVE 3D MAP */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex-1 flex flex-col min-h-[380px]">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-white">
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" /> Live 3D City Route
              Network Map
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Karachi Sector Map
            </span>
          </div>
          <div className="w-full flex-1 rounded-xl overflow-hidden relative min-h-[320px]">
            <DeckMap key="overview-map-live" />
          </div>
        </div>

        {/* WIDGET 3: LIVE COMMUTER INCIDENT & ALERTS FEED */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-xl">
          <h3 className="text-xs font-bold text-white mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" /> Live Transit
              Incident Alerts
            </span>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
              3 Active
            </span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950/80 border-l-2 border-red-500 rounded-r-xl flex items-start gap-2">
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

            <div className="p-2.5 bg-slate-950/80 border-l-2 border-amber-500 rounded-r-xl flex items-start gap-2">
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

            <div className="p-2.5 bg-slate-950/80 border-l-2 border-emerald-500 rounded-r-xl flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-[11px]">
                  Gulshan Route (R012) Relief Dispatched
                </p>
                <p className="text-[10px] text-slate-400">
                  2 Extra buses added to clear peak morning crowd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: KPIS, CHARTS, ESG & DIRECTIVES (8 COLS) */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        {/* TOP SUMMARY KPIS (USER-FRIENDLY TERMS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl relative group">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Total Tracked Trips{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Total completed and live bus journeys today."
              />
            </span>
            <div className="text-2xl font-extrabold text-white mt-1">
              {kpis ? kpis.total_trips?.toLocaleString() : "500,000"}
            </div>
            <span className="text-[10px] text-slate-500">
              Across all active city routes
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              On-Time Bus Punctuality{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Percentage of buses arriving within 3 minutes of scheduled time."
              />
            </span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">
              {kpis ? `${kpis.on_time_performance_pct}%` : "88.5%"}
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold">
              +2.4% better than yesterday
            </span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Average Route Delay{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Average extra time passengers spend waiting due to traffic."
              />
            </span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">
              {kpis ? `${kpis.avg_delay_minutes} min` : "17.74 min"}
            </div>
            <span className="text-[10px] text-amber-500">Peak hour impact</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Bus Crowd Load{" "}
              <HelpCircle
                className="h-3 w-3 text-slate-500 cursor-pointer"
                title="Average bus capacity utilization during peak hours."
              />
            </span>
            <div className="text-2xl font-extrabold text-cyan-400 mt-1">
              78.2%{" "}
              <span className="text-xs font-normal text-slate-400">
                Capacity
              </span>
            </div>
            <span className="text-[10px] text-cyan-500">
              Moderate crowd level
            </span>
          </div>
        </div>

        {/* ENVIRONMENTAL & FINANCIAL IMPACT SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                CO₂ Carbon Saved Today
              </p>
              <p className="text-lg font-extrabold text-emerald-400 mt-0.5">
                14.2 Tons
              </p>
              <p className="text-[10px] text-slate-500">
                Via transit usage vs cars
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Est. Daily Ticket Revenue
              </p>
              <p className="text-lg font-extrabold text-indigo-300 mt-0.5">
                Rs. 1,850,000
              </p>
              <p className="text-[10px] text-slate-500">
                500,000 riders collected
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Commuter Time Saved
              </p>
              <p className="text-lg font-extrabold text-amber-400 mt-0.5">
                3,420 Hours
              </p>
              <p className="text-[10px] text-slate-500">
                Via priority bus lanes
              </p>
            </div>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
            <h3 className="text-xs font-bold text-white mb-2">
              Hourly Passenger Rush & Demand
            </h3>
            <div className="w-full h-[220px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={100}
                minHeight={200}
              >
                <AreaChart data={chartSampleData}>
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.25}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
            <h3 className="text-xs font-bold text-white mb-2">
              Expected Delay Trends During Peak Hours
            </h3>
            <div className="w-full h-[220px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={100}
                minHeight={200}
              >
                <LineChart data={chartSampleData}>
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="delay"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", r: 4 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECOMMENDED OPERATOR ACTIONS TABLE WITH EXECUTE BUTTON */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl">
          <h3 className="text-xs font-bold text-white mb-3">
            Recommended Operator Actions ({filteredDirectives.length}{" "}
            Directives)
          </h3>
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
                {filteredDirectives.length > 0 ? (
                  filteredDirectives.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-800/30">
                      <td className="p-2.5 font-bold text-white">
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
                      No active directives match the current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
