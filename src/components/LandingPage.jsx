import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Programs from './Programs';
import Stats from './Stats';
import Gallery from './Gallery';
import Contact from './Contact';
import Footer from './Footer';
import DonationModal from './DonationModal';

function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialDonation, setInitialDonation] = useState(null);

    const handleOpenDonate = (presetData = null) => {
        if (presetData && (presetData.amount || presetData.program)) {
            setInitialDonation(presetData);
        } else {
            setInitialDonation(null);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">
            <Navbar onDonateClick={() => handleOpenDonate()} />

            <main className="flex-1">
                <Hero onDonateClick={(data) => handleOpenDonate(data)} />

                <Programs onSelectProgram={(data) => handleOpenDonate(data)} />

                <Stats />

                <Gallery />

                <Contact />
            </main>

            <Footer />

            <DonationModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                initialData={initialDonation}
            />
        </div>
    );
}

export default LandingPage;
