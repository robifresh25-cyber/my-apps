import React, { useState } from 'react';
import { Cpu, HardDrive, MemoryStick, Zap, Fan, Monitor, CircuitBoard } from 'lucide-react';
import { ASSET_PATHS } from '../data/hardwareData';
import { HardwareComponentId } from '../types/game';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon: React.ReactNode;
  fallbackLabel: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIcon,
  fallbackLabel,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-900/90 text-slate-300 border border-slate-700/70 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-2 text-amber-400">{fallbackIcon}</div>
        <span className="text-xs font-medium text-slate-300">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

interface HardwareIllustrationProps {
  id: HardwareComponentId;
  className?: string;
}

export const HardwareIllustration: React.FC<HardwareIllustrationProps> = ({
  id,
  className = 'w-full h-44',
}) => {
  if (id === 'cpu') {
    return (
      <ResilientImage
        src={ASSET_PATHS.cpuChip}
        alt="Ilustrasi prosesor CPU desktop"
        className={`object-cover rounded-lg border border-slate-700/80 ${className}`}
        fallbackIcon={<Cpu className="w-10 h-10" />}
        fallbackLabel="CPU Processor"
      />
    );
  }

  if (id === 'motherboard') {
    return (
      <ResilientImage
        src={ASSET_PATHS.motherboardTop}
        alt="Ilustrasi motherboard ATX"
        className={`object-cover rounded-lg border border-slate-700/80 ${className}`}
        fallbackIcon={<CircuitBoard className="w-10 h-10" />}
        fallbackLabel="Motherboard ATX"
      />
    );
  }

  if (id === 'vga') {
    return (
      <ResilientImage
        src={ASSET_PATHS.vgaGpu}
        alt="Ilustrasi kartu grafis VGA GPU"
        className={`object-cover rounded-lg border border-slate-700/80 ${className}`}
        fallbackIcon={<Monitor className="w-10 h-10" />}
        fallbackLabel="Kartu Grafis VGA"
      />
    );
  }

  if (id === 'ram') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-[#0F172A] border border-slate-700/80 p-4 ${className}`}
        role="img"
        aria-label="Ilustrasi modul memori RAM"
      >
        <svg viewBox="0 0 320 140" className="w-full h-full max-w-[280px]">
          <rect x="14" y="34" width="292" height="68" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
          <rect x="18" y="38" width="284" height="14" rx="2" fill="#1E293B" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect
              key={i}
              x={28 + i * 34}
              y="55"
              width="24"
              height="32"
              rx="2"
              fill="#0F172A"
              stroke="#475569"
              strokeWidth="1.5"
            />
          ))}
          <rect x="20" y="102" width="132" height="10" fill="#F59E0B" rx="1" />
          <rect x="166" y="102" width="134" height="10" fill="#F59E0B" rx="1" />
          <circle cx="159" cy="107" r="4" fill="#0F172A" />
          <circle cx="19" cy="68" r="3" fill="#94A3B8" />
          <circle cx="301" cy="68" r="3" fill="#94A3B8" />
        </svg>
      </div>
    );
  }

  if (id === 'hdd') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-[#0F172A] border border-slate-700/80 p-4 ${className}`}
        role="img"
        aria-label="Ilustrasi Hard Disk Drive HDD"
      >
        <svg viewBox="0 0 260 170" className="w-full h-full max-w-[230px]">
          <rect x="40" y="12" width="180" height="146" rx="10" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
          <rect x="48" y="20" width="164" height="130" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <circle cx="128" cy="74" r="44" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="128" cy="74" r="34" fill="#475569" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="128" cy="74" r="11" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <path d="M174 118 L142 82" stroke="#E2E8F0" strokeWidth="5" strokeLinecap="round" />
          <circle cx="176" cy="120" r="10" fill="#64748B" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="78" y="140" width="60" height="6" rx="1" fill="#F59E0B" />
          <circle cx="56" cy="28" r="3" fill="#94A3B8" />
          <circle cx="204" cy="28" r="3" fill="#94A3B8" />
          <circle cx="56" cy="142" r="3" fill="#94A3B8" />
          <circle cx="204" cy="142" r="3" fill="#94A3B8" />
        </svg>
      </div>
    );
  }

  if (id === 'ssd') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-[#0F172A] border border-slate-700/80 p-4 ${className}`}
        role="img"
        aria-label="Ilustrasi Solid State Drive SSD"
      >
        <svg viewBox="0 0 320 150" className="w-full h-full max-w-[270px]">
          <rect x="24" y="34" width="272" height="74" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <rect x="24" y="54" width="16" height="34" fill="#F59E0B" rx="1" />
          <rect x="24" y="68" width="16" height="4" fill="#0F172A" />
          <rect x="52" y="48" width="52" height="46" rx="3" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
          <rect x="116" y="48" width="52" height="46" rx="3" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
          <rect x="180" y="48" width="44" height="46" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="236" y="52" width="44" height="38" rx="3" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="290" cy="71" r="5" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
          <path d="M58 118 H262" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
    );
  }

  if (id === 'psu') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-[#0F172A] border border-slate-700/80 p-4 ${className}`}
        role="img"
        aria-label="Ilustrasi Power Supply Unit PSU"
      >
        <svg viewBox="0 0 280 160" className="w-full h-full max-w-[240px]">
          <rect x="26" y="22" width="168" height="116" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="110" cy="80" r="42" fill="#0F172A" stroke="#475569" strokeWidth="2" />
          <circle cx="110" cy="80" r="14" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="110"
              y1="80"
              x2={110 + Math.cos((deg * Math.PI) / 180) * 38}
              y2={80 + Math.sin((deg * Math.PI) / 180) * 38}
              stroke="#475569"
              strokeWidth="3"
            />
          ))}
          <path d="M194 56 C225 56, 232 38, 252 38" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M194 78 C228 78, 234 78, 256 78" stroke="#EF4444" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M194 100 C225 100, 232 120, 252 120" stroke="#38BDF8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="248" y="30" width="14" height="16" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="250" y="70" width="14" height="16" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="248" y="112" width="14" height="16" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  // Cooler fallback / component
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[#0F172A] border border-slate-700/80 p-4 ${className}`}
      role="img"
      aria-label="Ilustrasi Kipas Pendingin CPU"
    >
      <svg viewBox="0 0 220 150" className="w-full h-full max-w-[200px]">
        <rect x="48" y="20" width="124" height="110" rx="10" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        <circle cx="110" cy="75" r="42" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="110" cy="75" r="13" fill="#334155" stroke="#CBD5E1" strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            d={`M110 75 Q${110 + Math.cos(((deg + 25) * Math.PI) / 180) * 32} ${
              75 + Math.sin(((deg + 25) * Math.PI) / 180) * 32
            } ${110 + Math.cos((deg * Math.PI) / 180) * 38} ${
              75 + Math.sin((deg * Math.PI) / 180) * 38
            }`}
            stroke="#94A3B8"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
};

export function getComponentIcon(id: HardwareComponentId) {
  switch (id) {
    case 'cpu':
      return <Cpu className="w-5 h-5" />;
    case 'ram':
      return <MemoryStick className="w-5 h-5" />;
    case 'motherboard':
      return <CircuitBoard className="w-5 h-5" />;
    case 'hdd':
    case 'ssd':
      return <HardDrive className="w-5 h-5" />;
    case 'psu':
      return <Zap className="w-5 h-5" />;
    case 'vga':
      return <Monitor className="w-5 h-5" />;
    case 'cooler':
      return <Fan className="w-5 h-5" />;
  }
}
