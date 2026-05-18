import Navbar from './components/layout/Navbar';
import SakuraRain from './components/layout/SakuraRain';
import TestView from './pages/TestView'; 

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-900 to-black text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      <Navbar />
      <main className="flex w-full items-start justify-center px-4 py-12">
        <div className="relative hidden h-[80vh] flex-1 sm:block sticky top-20">
          <SakuraRain id="tsparticles-left" />
        </div>
    
        <div className="w-full max-w-2xl shrink-0 z-10 mx-4">
          <TestView />
        </div>
        <div className="relative hidden h-[80vh] flex-1 sm:block sticky top-20">
          <SakuraRain id="tsparticles-right" />
        </div>
      </main>
    </div>
  );
}