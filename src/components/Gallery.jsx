import { useState, useEffect } from 'react';
import axios from 'axios';
import GalleryModal from './GalleryModal';

const FALLBACK_GALLERY = [
    {
        id: 1,
        title: 'Kegiatan Belajar & Tahfidz Al-Qur’an Sore Hari',
        description: 'Pembinaan rutin hafalan Al-Qur’an dan bimbingan belajar akademik bagi anak-anak asuh di asrama Candimulyo.',
        image_url: `${import.meta.env.BASE_URL}img/hero-bg.jpg`
    },
    {
        id: 2,
        title: 'Penyaluran Beasiswa Pendidikan & Perlengkapan Sekolah',
        description: 'Pembagian seragam, sepatu, dan buku tulis untuk menunjang semangat belajar santri tingkat SD, SMP, dan SMA.',
        image_url: `${import.meta.env.BASE_URL}img/hero-bg.jpg`
    },
    {
        id: 3,
        title: 'Doa Bersama & Santunan Rutin Anak Yatim Dhuafa',
        description: 'Majelis doa bersama anak yatim untuk mendoakan keberkahan, kesehatan, dan kelapangan rezeki para donatur.',
        image_url: `${import.meta.env.BASE_URL}img/hero-bg.jpg`
    },
];

export default function Gallery() {
    const [gallery, setGallery] = useState(FALLBACK_GALLERY);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
                const response = await axios.get(`${baseUrl}/landing/gallery`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setGallery(response.data);
                }
            } catch {
                // Keep fallback gallery if backend API is not reachable
            }
        };

        fetchGallery();
    }, []);

    return (
        <section id="gallery" className="py-16 lg:py-24 bg-surface border-b border-slate-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Dokumentasi Lembaga
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 mt-1">
                        Aktivitas & Kegiatan Santri Asuh
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                        Dokumentasi kegiatan pembinaan karakter, pendidikan, dan penyaluran amanah donatur di Panti Asuhan As-Sholihin.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {gallery.slice(0, 6).map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="card-surface overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-primary/40"
                        >
                            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                <span className="text-xs font-semibold text-primary mt-4 inline-block">
                                    Lihat Dokumentasi →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <GalleryModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    item={selectedItem}
                />
            </div>
        </section>
    );
}
