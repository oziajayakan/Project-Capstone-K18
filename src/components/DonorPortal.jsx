import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DonationModal from './DonationModal';
import {
    UserCircleIcon,
    CreditCardIcon,
    Cog6ToothIcon,
    ClockIcon,
    CheckBadgeIcon,
    PlusIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const DEFAULT_PROFILE = {
    fullName: 'Muhammad Fauzi',
    displayName: 'Hamba Allah',
    email: 'fauzi@assholihin-jombang.or.id',
    whatsapp: '081234567890',
    birthDate: '2003-08-14',
    address: 'Candimulyo, Kec. Jombang, Kabupaten Jombang, Jawa Timur',
    alwaysAnonymous: true,
    waReceiptNotification: true,
    monthlyLpjEmail: true,
};

const DEFAULT_BANKS = [
    {
        id: 1,
        bankName: 'Bank Syariah Indonesia (BSI)',
        accountNumber: '7148899231',
        accountHolder: 'Muhammad Fauzi',
        isPrimary: true,
        purpose: 'Autodebit Kafalah & Rekening Pengembalian (Refund)'
    }
];

const SAMPLE_HISTORY = [
    {
        id: 'ORD-20261031-091',
        date: '31 Okt 2026',
        program: 'Beasiswa SPP & Pendidikan Santri Yatim',
        amount: 250000,
        method: 'QRIS Nasional',
        status: 'Berhasil (Settlement)'
    },
    {
        id: 'ORD-20261015-044',
        date: '15 Okt 2026',
        program: 'Pemenuhan Pangan & Gizi Asrama',
        amount: 100000,
        method: 'BSI Virtual Account',
        status: 'Berhasil (Settlement)'
    },
    {
        id: 'ORD-20261001-012',
        date: '01 Okt 2026',
        program: 'Sedekah Subuh & Operasional Panti',
        amount: 50000,
        method: 'QRIS Nasional',
        status: 'Berhasil (Settlement)'
    }
];

export default function DonorPortal() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isDonateOpen, setIsDonateOpen] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('assholihin_donor_profile');
        return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    });

    const [banks, setBanks] = useState(() => {
        const saved = localStorage.getItem('assholihin_donor_banks');
        return saved ? JSON.parse(saved) : DEFAULT_BANKS;
    });

    const [newBank, setNewBank] = useState({
        bankName: 'Bank Syariah Indonesia (BSI)',
        accountNumber: '',
        accountHolder: ''
    });

    useEffect(() => {
        localStorage.setItem('assholihin_donor_profile', JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem('assholihin_donor_banks', JSON.stringify(banks));
    }, [banks]);

    const handleProfileSave = (e) => {
        e.preventDefault();
        localStorage.setItem('assholihin_donor_profile', JSON.stringify(profile));
        setSavedMessage('Data profil dan pengaturan berhasil disimpan.');
        setTimeout(() => setSavedMessage(''), 3500);
    };

    const handleAddBank = (e) => {
        e.preventDefault();
        if (!newBank.accountNumber || !newBank.accountHolder) return;
        const entry = {
            id: Date.now(),
            bankName: newBank.bankName,
            accountNumber: newBank.accountNumber,
            accountHolder: newBank.accountHolder,
            isPrimary: banks.length === 0,
            purpose: 'Rekening Terdaftar Donatur'
        };
        setBanks([...banks, entry]);
        setNewBank({ bankName: 'Bank Syariah Indonesia (BSI)', accountNumber: '', accountHolder: '' });
    };

    const handleRemoveBank = (id) => {
        setBanks(banks.filter((b) => b.id !== id));
    };

    const formatIDR = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    };

    const navTabs = [
        { id: 'profile', label: 'Data Profil & Identitas', icon: UserCircleIcon },
        { id: 'banks', label: 'No. Rekening Tersimpan', icon: CreditCardIcon },
        { id: 'settings', label: 'Pengaturan Web & Privasi', icon: Cog6ToothIcon },
        { id: 'history', label: 'Riwayat & E-Kwitansi', icon: ClockIcon },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-surface">
            <Navbar onDonateClick={() => setIsDonateOpen(true)} />

            <main className="flex-1 py-10 lg:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top User Banner */}
                    <div className="card-surface p-6 sm:p-8 mb-8 bg-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-primary text-white font-heading font-bold text-xl flex items-center justify-center shrink-0">
                                    {profile.fullName ? profile.fullName.substring(0, 2).toUpperCase() : 'DF'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                                            {profile.fullName}
                                        </h1>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            <CheckBadgeIcon className="w-3.5 h-3.5" />
                                            <span>Donatur Terdaftar</span>
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                        Tampilan Publik:{' '}
                                        <strong className="text-slate-700">
                                            {profile.alwaysAnonymous ? 'Hamba Allah (Mode Anonim Aktif)' : profile.fullName}
                                        </strong>{' '}
                                        • WhatsApp: {profile.whatsapp}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-right">
                                    <span className="text-[11px] text-slate-500 block">Akumulasi Donasi Tercatat</span>
                                    <strong className="text-base font-bold text-primary tabular-nums">
                                        Rp 400.000
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsDonateOpen(true)}
                                    className="btn-primary"
                                >
                                    + Salurkan Donasi Baru
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Workspace Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Sidebar Menu (3 Cols) */}
                        <div className="lg:col-span-3 card-surface p-3 space-y-1 bg-white">
                            {navTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors text-left ${
                                            isActive
                                                ? 'bg-primary text-white'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 shrink-0" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content Panel (9 Cols) */}
                        <div className="lg:col-span-9 card-surface p-6 sm:p-8 bg-white">
                            {savedMessage && (
                                <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2">
                                    <ShieldCheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>{savedMessage}</span>
                                </div>
                            )}

                            {/* TAB 1: DATA PROFIL */}
                            {activeTab === 'profile' && (
                                <form onSubmit={handleProfileSave} className="space-y-6">
                                    <div className="border-b border-slate-100 pb-4">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            Data Profil & Identitas Donatur
                                        </h2>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Informasi ini digunakan untuk pengisian otomatis saat checkout donasi dan penerbitan E-Kwitansi resmi.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Nama Lengkap (Sesuai KTP)
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={profile.fullName}
                                                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Nama Alias di Papan Transparansi Publik
                                            </label>
                                            <input
                                                type="text"
                                                value={profile.displayName}
                                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                                placeholder="Contoh: Hamba Allah"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Nomor WhatsApp Aktif (Penerima E-Kwitansi)
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={profile.whatsapp}
                                                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Alamat Email Resmi
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Tanggal Lahir (Untuk Jadwal Doa Milad Santri)
                                            </label>
                                            <input
                                                type="date"
                                                value={profile.birthDate}
                                                onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                                                Alamat Domisili
                                            </label>
                                            <input
                                                type="text"
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <button type="submit" className="btn-primary">
                                            Simpan Perubahan Profil
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* TAB 2: NOMOR REKENING TERSIMPAN */}
                            {activeTab === 'banks' && (
                                <div className="space-y-6">
                                    <div className="border-b border-slate-100 pb-4">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            Data Rekening Bank & Metode Pembayaran Donatur
                                        </h2>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Digunakan untuk pencocokan mutasi transfer manual, pengingat Kafalah Orang Tua Asuh bulanan, serta rekening tujuan sah apabila terjadi pengajuan pengembalian kelebihan transfer (refund).
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {banks.map((b) => (
                                            <div
                                                key={b.id}
                                                className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50"
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-slate-900">{b.bankName}</span>
                                                        {b.isPrimary && (
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                                                Rekening Utama
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm font-mono font-semibold text-slate-700 mt-1">
                                                        No. Rek: {b.accountNumber} — a.n. {b.accountHolder}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{b.purpose}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveBank(b.id)}
                                                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 self-start sm:self-center"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                    <span>Hapus</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Bank Form */}
                                    <form onSubmit={handleAddBank} className="pt-6 border-t border-slate-100 space-y-4">
                                        <h3 className="text-sm font-bold text-slate-900">
                                            + Tambah Nomor Rekening Baru
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                                    Nama Bank
                                                </label>
                                                <select
                                                    value={newBank.bankName}
                                                    onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900"
                                                >
                                                    <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
                                                    <option value="Bank Central Asia (BCA)">Bank Central Asia (BCA)</option>
                                                    <option value="Bank Mandiri">Bank Mandiri</option>
                                                    <option value="Bank Rakyat Indonesia (BRI)">Bank Rakyat Indonesia (BRI)</option>
                                                    <option value="Bank Negara Indonesia (BNI)">Bank Negara Indonesia (BNI)</option>
                                                    <option value="Bank Jatim / Lainnya">Bank Jatim / Lainnya</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                                    Nomor Rekening
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={newBank.accountNumber}
                                                    onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })}
                                                    placeholder="Contoh: 7148899231"
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 font-mono"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                                    Nama Pemilik Rekening
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={newBank.accountHolder}
                                                    onChange={(e) => setNewBank({ ...newBank, accountHolder: e.target.value })}
                                                    placeholder="Sesuai buku tabungan"
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-outline">
                                            <PlusIcon className="w-4 h-4" />
                                            <span>Simpan Rekening</span>
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* TAB 3: PENGATURAN WEB & PRIVASI */}
                            {activeTab === 'settings' && (
                                <form onSubmit={handleProfileSave} className="space-y-6">
                                    <div className="border-b border-slate-100 pb-4">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            Pengaturan Akun Web & Privasi Donatur
                                        </h2>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Atur bagaimana identitas Anda ditampilkan pada portal transparansi publik dan bagaimana laporan dikirimkan.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50/60">
                                            <div>
                                                <span className="text-sm font-bold text-slate-900 block">
                                                    Selalu Samarkan Nama Saya (Mode Hamba Allah Default)
                                                </span>
                                                <span className="text-xs text-slate-500 mt-0.5 block">
                                                    Setiap kali Anda berdonasi, nama Anda di papan transparansi publik otomatis ditulis sebagai &ldquo;Hamba Allah&rdquo;.
                                                </span>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={profile.alwaysAnonymous}
                                                onChange={(e) => setProfile({ ...profile, alwaysAnonymous: e.target.checked })}
                                                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                            />
                                        </label>

                                        <label className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50/60">
                                            <div>
                                                <span className="text-sm font-bold text-slate-900 block">
                                                    Kirim E-Kwitansi & Doa Santri Otomatis via WhatsApp
                                                </span>
                                                <span className="text-xs text-slate-500 mt-0.5 block">
                                                    Terima bukti pembayaran sah ber-QR Code beberapa detik setelah pembayaran QRIS / Virtual Account terverifikasi.
                                                </span>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={profile.waReceiptNotification}
                                                onChange={(e) => setProfile({ ...profile, waReceiptNotification: e.target.checked })}
                                                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                            />
                                        </label>

                                        <label className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50/60">
                                            <div>
                                                <span className="text-sm font-bold text-slate-900 block">
                                                    Berlangganan Laporan Keuangan Bulanan (E-LPJ PDF)
                                                </span>
                                                <span className="text-xs text-slate-500 mt-0.5 block">
                                                    Kirimkan rekapitulasi pemasukan dan bukti nota belanja operasional panti setiap awal bulan ke email saya.
                                                </span>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={profile.monthlyLpjEmail}
                                                onChange={(e) => setProfile({ ...profile, monthlyLpjEmail: e.target.checked })}
                                                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                            />
                                        </label>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                        <button type="submit" className="btn-primary">
                                            Simpan Pengaturan Privasi
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* TAB 4: RIWAYAT DONASI & E-KWITANSI */}
                            {activeTab === 'history' && (
                                <div className="space-y-6">
                                    <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                Riwayat Donasi & Unduh E-Kwitansi Resmi
                                            </h2>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Daftar kontribusi Anda yang telah tercatat di Buku Kas Panti Asuhan As-Sholihin.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    <th className="py-3 pr-4">No. Referensi</th>
                                                    <th className="py-3 px-4">Tanggal</th>
                                                    <th className="py-3 px-4">Program Akad</th>
                                                    <th className="py-3 px-4">Nominal</th>
                                                    <th className="py-3 px-4">Metode</th>
                                                    <th className="py-3 pl-4 text-right">E-Kwitansi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                                                {SAMPLE_HISTORY.map((item) => (
                                                    <tr key={item.id} className="hover:bg-slate-50/70">
                                                        <td className="py-3.5 pr-4 font-mono font-semibold text-slate-800">
                                                            {item.id}
                                                        </td>
                                                        <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                                                        <td className="py-3.5 px-4 font-medium text-slate-900">{item.program}</td>
                                                        <td className="py-3.5 px-4 font-bold text-primary tabular-nums">
                                                            {formatIDR(item.amount)}
                                                        </td>
                                                        <td className="py-3.5 px-4 text-slate-600">{item.method}</td>
                                                        <td className="py-3.5 pl-4 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    alert(`Mengunduh E-Kwitansi Resmi #${item.id} a.n. ${profile.fullName}`)
                                                                }
                                                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                                            >
                                                                <ArrowDownTrayIcon className="w-4 h-4" />
                                                                <span>Unduh PDF</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <DonationModal isOpen={isDonateOpen} setIsOpen={setIsDonateOpen} />
        </div>
    );
}

