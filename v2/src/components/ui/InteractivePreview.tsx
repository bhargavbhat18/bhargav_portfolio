"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Activity, Server, Database } from "lucide-react";

export default function InteractivePreview() {
  const [activeTab, setActiveTab] = useState<"logs" | "telemetry">("telemetry");
  const [logs, setLogs] = useState<string[]>([
    "System status: ONLINE",
    "Database connected: mysql://vitaguard-cluster:3306/db_prod",
    "Auth initialized: Spring Security JWT filter active",
    "Server listening on port :8080"
  ]);
  const [heartRate, setHeartRate] = useState<number[]>(Array(20).fill(70));
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Simulated log printing
  useEffect(() => {
    const actions = [
      { type: "API", msg: "GET /api/v1/patients/active?limit=10 200 OK - 24ms" },
      { type: "DB", msg: "Query: SELECT * FROM patient p JOIN record r WHERE p.id = r.p_id" },
      { type: "AUTH", msg: "Token validation check successful for admin_user@vitaguard.org" },
      { type: "API", msg: "POST /api/v1/telemetry/heartrate 201 CREATED - 45ms" },
      { type: "SYS", msg: "Heap memory check: 242MB active, garbage collection idle" },
      { type: "DB", msg: "Connection pool active: 4 / 20 connections in use" }
    ];

    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev.slice(-15),
        `[${timestamp}] [${randomAction.type}] ${randomAction.msg}`
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Scroll logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Simulated heart rate change
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const next = Math.max(60, Math.min(100, prev[prev.length - 1] + (Math.random() * 10 - 5)));
        return [...prev.slice(1), Math.round(next)];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Compute SVG ECG path coordinates
  const currentHeartRate = heartRate[heartRate.length - 1];
  const points = heartRate.map((val, idx) => {
    const x = idx * 18;
    // Map heart rate 60-100 to y coordinates 30-110 in standard 140px high canvas
    const y = 110 - ((val - 60) * 80) / 40;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full bg-[#0D0D11] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[280px]">
      {/* Window Header */}
      <div className="bg-[#13131A] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <button 
            onClick={() => setActiveTab("telemetry")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "telemetry" 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Activity size={10} /> Live Telemetry
          </button>
          <button 
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === "logs" 
                ? "bg-accent/10 text-accent border border-accent/20" 
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Terminal size={10} /> System Logs
          </button>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Screen Body */}
      <div className="flex-1 p-4 relative overflow-hidden font-mono text-[11px] text-white/80">
        {activeTab === "telemetry" ? (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                <Server size={12} className="text-primary animate-pulse" /> Patient Monitor Node-14
              </span>
              <span className="text-xl font-bold font-heading text-primary animate-pulse flex items-center gap-1">
                {currentHeartRate} <span className="text-xs font-normal text-white/40">BPM</span>
              </span>
            </div>
            
            {/* Live ECG Chart Drawing */}
            <div className="flex-1 relative mt-2 flex items-center">
              <svg className="w-full h-[100px] overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines background */}
                <line x1="0" y1="25" x2="100%" y2="25" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <line x1="0" y1="50" x2="100%" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <line x1="0" y1="75" x2="100%" y2="75" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                
                {/* Glowing ECG pulse path */}
                <polyline
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2.5"
                  points={points}
                  className="shadow-lg shadow-primary"
                />
              </svg>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-white/30 border-t border-white/5 pt-2">
              <span className="flex items-center gap-1"><Database size={10} className="text-accent" /> MySQL Pool Status: OK</span>
              <span>REST WebSockets: active</span>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto flex flex-col gap-1 pr-1 custom-scrollbar">
            {logs.map((log, index) => {
              // Highlight log classifications
              let color = "text-white/60";
              if (log.includes("[API]")) color = "text-primary";
              if (log.includes("[DB]")) color = "text-purple-400";
              if (log.includes("[AUTH]")) color = "text-green-400";
              if (log.includes("[SYS]")) color = "text-yellow-400";

              return (
                <div key={index} className={`leading-relaxed break-all ${color}`}>
                  {log}
                </div>
              );
            })}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
