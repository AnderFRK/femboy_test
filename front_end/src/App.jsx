import Navbar from './components/layout/Navbar';
import SakuraRain from './components/layout/SakuraRain';
import TestView from './pages/TestView'; 

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f7c9f2] via-white to-[#e0c9f7] text-slate-800 font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('/background_femboy.png')] bg-cover bg-center bg-no-repeat opacity-70 mix-blend-multiply"></div>
      <div className="relative z-10">
        <Navbar />
        <main className="flex w-full items-start justify-center px-4 pt-20 pb-4">          <div className="relative hidden h-[80vh] flex-1 sm:block sticky top-20 pointer-events-none">
            <SakuraRain id="tsparticles-left" />
          </div>
          <div className="w-full max-w-2xl shrink-0 mx-4">
            <TestView />
          </div>
          <div className="relative hidden h-[80vh] flex-1 sm:block sticky top-20 pointer-events-none">
            <SakuraRain id="tsparticles-right" />
          </div>
        </main>
      </div>
    </div>
  );
}