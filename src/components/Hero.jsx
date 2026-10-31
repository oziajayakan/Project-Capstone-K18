import { useState } from 'react';
import {
    ShieldCheckIcon,
    LockClosedIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    QrCodeIcon
} from '@heroicons/react/24/outline';

const QUICK_NOMINALS = [
    { label: 'Rp 25.000', value: 25000 },
    { label: 'Rp 50.000', value: 50000, popular: true },
    { label: 'Rp 100.000', value: 100000 },
    { label: 'Rp 250.000', value: 250000 },
];

const DONATION_TABS = [
    { id: 'santunan', label: 'Santunan Yatim' },
    { id: 'pendidikan', label: 'Beasiswa & SPP' },
    { id: 'pangan', label: 'Pangan & Gizi' },
    { id: 'zakat', label: 'Zakat / Infaq' },
];

export default function Hero({ onDonateClick }) {
    const [activeTab, setActiveTab] = useState('santunan');
    const [selectedAmount, setSelectedAmount] = useState(50000);
    const [customAmount, setCustomAmount] = useState('');

    const handleQuickDonate = () => {
        const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
        if (onDonateClick) {
            onDonateClick({
                amount: finalAmount,
                program: DONATION_TABS.find(t => t.id === activeTab)?.label || 'Santunan Yatim'
            });
        }
    };

    const formatIDR = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };

    return (
        <section id="hero" className="relative bg-mint border-b border-slate-200/80 py-12 lg:py-20 overflow-hidden">
            {/* Subtle Architectural Grid Accent */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    
                    {/* Left Column: Institutional Message & Trust Metrics (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/5 border border-emerald-800/15 text-primary text-xs font-semibold">
                            <ShieldCheckIcon className="w-4 h-4 text-primary shrink-0" />
                            <span>Lembaga Kesejahteraan Sosial Anak (LKSA) Terakreditasi</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                            Memuliakan Anak Yatim,{' '}
                            <span className="text-primary">Menjaga Amanah Umat</span> Secara Transparan.
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                            Yayasan Assholihin Candimulyo Jombang membina dan menyantuni anak-anak yatim piatu serta dhuafa melalui pendidikan formal, pembinaan tahfidz Al-Qur&apos;an, dan pemenuhan gizi harian dengan pelaporan kas yang terbuka dan terverifikasi.
                        </p>

                        {/* Hadith Editorial Quote */}
                        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-card max-w-xl">
                            <p className="text-sm text-slate-700 italic leading-relaxed">
                                &ldquo;Aku dan orang yang menanggung (mengasuh) anak yatim berada di surga seperti dua jari ini (jari telunjuk dan jari tengah).&rdquo;
                            </p>
                            <p className="text-xs font-semibold text-slate-500 mt-1.5">
                                — HR. Bukhari No. 5304
                            </p>
                        </div>

                        {/* Institutional Highlights */}
                        <div className="pt-2 grid grid-cols-3 gap-4 max-w-lg border-t border-slate-200/70">
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">100%</div>
                                <div className="text-xs text-slate-500 mt-0.5">Tercatat di Buku Kas</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">QRIS & VA</div>
                                <div className="text-xs text-slate-500 mt-0.5">Verifikasi Otomatis</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">E-Kwitansi</div>
                                <div className="text-xs text-slate-500 mt-0.5">Terkirim via WhatsApp</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clean Interactive Quick Donation Card (5 Cols) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-elevated p-6 sm:p-7">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                        Layanan Donasi Instan
                                    </span>
                                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                                        Salurkan Kebaikan Hari Ini
                                    </h2>
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                                    <QrCodeIcon className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Program Category Pills */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-lg mb-5">
                                {DONATION_TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-2 px-2 rounded-md text-xs font-semibold transition-all text-center truncate ${
                                            activeTab === tab.id
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Preset Nominal Grid */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-600 mb-2">
                                    Pilih Nominal Donasi
                                </label>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {QUICK_NOMINALS.map((item) => {
                                        const isSelected = !customAmount && selectedAmount === item.value;
                                        return (
                                            <button
                                                key={item.value}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedAmount(item.value);
                                                    setCustomAmount('');
                                                }}
                                                className={`relative py-2.5 px-3 rounded-lg border text-sm font-semibold tabular-nums transition-all text-left flex items-center justify-between ${
                                                    isSelected
                                                        ? 'border-primary bg-primary-light/60 text-primary ring-1 ring-primary'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                                {item.popular && (
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                                        Populer
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Custom Nominal Input */}
                            <div className="mb-5">
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                    Atau Masukkan Nominal Lainnya
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-sm font-bold text-slate-400">
                                        Rp
                                    </span>
                                    <input
                                        type="number"
                                        min="10000"
                                        step="5000"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="Contoh: 150000"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 tabular-nums"
                                    />
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                                    <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>
                                        Total dipilih:{' '}
                                        <strong className="text-slate-800 tabular-nums">
                                            {formatIDR(customAmount ? parseInt(customAmount, 10) : selectedAmount)}
                                        </strong>{' '}
                                        — Mendukung opsi anonim (Hamba Allah)
                                    </span>
                                </p>
                            </div>

                            {/* Submit CTA */}
                            <button
                                type="button"
                                onClick={handleQuickDonate}
                                className="w-full py-3 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                <span>Lanjutkan Pembayaran Donasi</span>
                                <ArrowRightIcon className="w-4 h-4" />
                            </button>

                            {/* Payment Gateway Compliance Footer inside Widget */}
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                <span className="inline-flex items-center gap-1">
                                    <LockClosedIcon className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Enkripsi SSL 256-Bit</span>
                                </span>
                                <span>QRIS • Virtual Account • E-Wallet</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
