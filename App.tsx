import React, { useMemo, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WorldMap } from './components/WorldMap';
import { ItalyMap } from './components/ItalyMap';
import { generateTeamData, generateStartupData } from './services/dataService';
import { ArrowRight, Rocket, Users, Globe } from 'lucide-react';

const App: React.FC = () => {
  // Memoize data to prevent regeneration on re-renders
  const teamData = useMemo(() => generateTeamData(), []);
  const startupData = useMemo(() => generateStartupData(), []);
  
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled more than half the page height
      const halfPageHeight = document.documentElement.scrollHeight / 2;
      if (window.scrollY > halfPageHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-geeks-blue text-white overflow-hidden">
        {/* Abstract shapes/background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-geeks-red/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-geeks-red animate-pulse"></span>
              Incubatore & Acceleratore Online
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
              Siamo Startup Geeks, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                abilitatori di cambiamento
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Trasformiamo idee in imprese di successo. Unisciti alla community di founder più grande d'Italia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-geeks-red hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-900/20 transition-all transform hover:-translate-y-1">
                <Rocket size={24} />
                Lancia la tua Startup
              </button>
              <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                Scopri i percorsi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-50 p-3 rounded-full mb-4 text-geeks-blue">
                  <Users size={32} />
                </div>
                <h3 className="text-4xl font-black text-geeks-blue mb-1">40+</h3>
                <p className="text-gray-500 font-medium">Membri del Team</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 md:border-l md:border-r border-gray-100">
                <div className="bg-red-50 p-3 rounded-full mb-4 text-geeks-red">
                  <Rocket size={32} />
                </div>
                <h3 className="text-4xl font-black text-geeks-blue mb-1">1000+</h3>
                <p className="text-gray-500 font-medium">Startup Incubate</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-50 p-3 rounded-full mb-4 text-geeks-blue">
                   <Globe size={32} />
                </div>
                <h3 className="text-4xl font-black text-geeks-blue mb-1">100%</h3>
                <p className="text-gray-500 font-medium">Online & Globale</p>
              </div>
           </div>
        </div>
      </section>

      {/* World Map Section */}
      <section id="team-map" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-geeks-red font-bold text-lg tracking-wide uppercase mb-3">Il Nostro Team</h2>
            <h3 className="text-4xl md:text-5xl font-black text-geeks-blue mb-6">Dove Lavoriamo</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Siamo un team distribuito, unito dalla passione per l'innovazione. Dai fondatori Giulia e Alessio, fino ai nostri collaboratori internazionali.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <WorldMap people={teamData} />
             <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-geeks-red"></span>
                  Team Member
                </div>
                <div className="flex items-center gap-2">
                   <Users size={16} />
                   40 Persone nel mondo
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Italy Map Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              
              <div className="lg:w-1/2">
                <h2 className="text-geeks-red font-bold text-lg tracking-wide uppercase mb-3">Impatto Nazionale</h2>
                <h3 className="text-4xl md:text-5xl font-black text-geeks-blue mb-6">Un Ecosistema in Crescita</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Abbiamo supportato la nascita e la crescita di oltre 1.000 startup in tutto il territorio italiano. Il nostro incubatore online abbatte le barriere geografiche, permettendo a chiunque, ovunque si trovi, di fare impresa.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Accesso a mentor di alto livello",
                    "Network di investitori",
                    "Formazione pratica e validazione",
                    "Community esclusiva di founder"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-geeks-blue font-medium">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-geeks-blue text-xs">✓</div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 text-geeks-red font-bold hover:gap-3 transition-all">
                  Scopri le nostre storie di successo <ArrowRight size={20} />
                </button>
              </div>

              <div className="lg:w-1/2 w-full">
                 <ItalyMap startups={startupData} />
              </div>

           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-geeks-blue relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
         <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Pronto a trasformare la tua idea?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Non importa dove ti trovi, Startup Geeks è il posto giusto per iniziare.
            </p>
            <button className="bg-white text-geeks-blue hover:bg-gray-50 px-10 py-5 rounded-xl font-bold text-xl shadow-2xl transition-transform hover:scale-105">
              Candidati Ora
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="col-span-1 md:col-span-2">
             <span className="text-2xl font-black text-white block mb-4">STARTUP GEEKS</span>
             <p className="max-w-sm mb-6">
               La community di riferimento per chi vuole fare startup in Italia. Formazione, incubazione e networking per aspiranti imprenditori.
             </p>
             <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 rounded bg-gray-800 hover:bg-geeks-blue transition-colors cursor-pointer"></div>
               <div className="w-10 h-10 rounded bg-gray-800 hover:bg-geeks-blue transition-colors cursor-pointer"></div>
               <div className="w-10 h-10 rounded bg-gray-800 hover:bg-geeks-blue transition-colors cursor-pointer"></div>
             </div>
           </div>
           <div>
             <h4 className="text-white font-bold mb-4">Esplora</h4>
             <ul className="space-y-2">
               <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Incubatore</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Corsi</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-bold mb-4">Contatti</h4>
             <ul className="space-y-2">
               <li>info@startupgeeks.it</li>
               <li>Milano, Italia</li>
               <li className="text-sm mt-4">© 2024 Startup Geeks S.r.l.</li>
             </ul>
           </div>
        </div>
      </footer>

      {/* Back to Top Rocket Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-geeks-red text-white rounded-full shadow-2xl shadow-red-500/50 hover:bg-red-600 transition-all duration-500 transform ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Back to Top"
      >
        <Rocket className="-rotate-45" size={24} strokeWidth={2.5} />
      </button>

    </div>
  );
};

export default App;