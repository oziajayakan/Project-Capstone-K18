import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Bars3Icon,
    XMarkIcon,
    CheckBadgeIcon,
    UserCircleIcon,
    HeartIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Navbar({ onDonateClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: isHome ? '#hero' : '/' },
        { name: 'Program Donasi', href: isHome ? '#programs' : '/#programs' },
        { name: 'Orang Tua Asuh', href: isHome ? '#foster' : '/#foster' },
        { name: 'Transparansi Kas', href: isHome ? '#transparency' : '/#transparency' },
        { name: 'Galeri', href: isHome ? '#gallery' : '/#gallery' },
        { name: 'Kontak', href: isHome ? '#contact' : '/#contact' },
    ];

    return (
        <header className="sticky top-0 w-full z-50">
            {/* Top Compliance Micro-Bar */}
            <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <CheckBadgeIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-medium text-white">Yayasan Assholihin Candimulyo Jombang</span>
                        <span className="hidden md:inline text-slate-500">|</span>
                        <span className="hidden md:inline text-slate-400">
                            Terdaftar Resmi Kemenkumham RI & Dinas Sosial Kab. Jombang
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-slate-400">
                            QRIS NMID: <strong className="text-slate-200 font-mono">ID1026507480998</strong>
                        </span>
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                        >
                            <PhoneIcon className="w-3.5 h-3.5" />
                            <span>Layanan Donatur</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav
                className={clsx(
                    'w-full transition-all duration-200 border-b',
                    scrolled
                        ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-sm py-3'
                        : 'bg-white border-slate-100 py-4'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Brand Identity */}
                    <Link to="/" className="flex items-center gap-3.5 group">
                        <img
                            src={`${import.meta.env.BASE_URL}img/logo.png`}
                            alt="Logo Yayasan Assholihin"
                            className="h-11 w-11 rounded-lg object-contain border border-slate-200/60 p-0.5 bg-white shadow-sm"
                        />
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">
                                Panti Asuhan As-Sholihin
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                                LKSA Candimulyo — Jombang
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/portal-donatur"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                            <UserCircleIcon className="w-5 h-5 text-slate-500" />
                            <span>Akun Donatur</span>
                        </Link>
                        <button
                            onClick={() => onDonateClick && onDonateClick()}
                            className="btn-primary"
                        >
                            <HeartIcon className="w-4 h-4 stroke-[2.2]" />
                            <span>Tunaikan Donasi</span>
                        </button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                            <Link
                                to="/portal-donatur"
                                onClick={() => setIsOpen(false)}
                                className="btn-outline w-full justify-center"
                            >
                                <UserCircleIcon className="w-5 h-5" />
                                <span>Akun & Riwayat Donatur</span>
                            </Link>
                            <button
                                className="btn-primary w-full justify-center"
                                onClick={() => {
                                    setIsOpen(false);
                                    if (onDonateClick) onDonateClick();
                                }}
                            >
                                <HeartIcon className="w-4 h-4" />
                                <span>Tunaikan Donasi Sekarang</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
