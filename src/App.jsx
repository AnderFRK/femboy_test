import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SakuraRain from "./components/layout/SakuraRain";
import UserBanner from "./components/layout/UserBanner";
import Footer from "./components/layout/Footer";
import LoginModal from "./components/layout/LoginModal";
import SettingsModal from "./components/layout/SettingsModal";
import TestView from "./pages/TestView";
import About from "./pages/About";
import Battle from "./pages/Battle";
import Donate from "./pages/Donate";
import useUserIdentity from "./hooks/useUserIdentity";

export default function App() {
  const { usuario, esAnonimo, loginGoogle, cerrarSesion, actualizarNickname } = useUserIdentity();

  const [loginAbierto, setLoginAbierto] = useState(false);
  const [settingsAbierto, setSettingsAbierto] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f7c9f2] via-white to-[#e0c9f7] text-slate-800 font-sans overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none bg-[url('/background_femboy.png')] bg-cover bg-center bg-no-repeat opacity-70 mix-blend-multiply"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar onAbrirSettings={() => setSettingsAbierto(true)} />
          <main className="flex w-full flex-1 items-start justify-center px-4 pt-24 pb-12">
            <div className="relative hidden h-[80vh] flex-1 sm:block sticky top-20 pointer-events-none">
              <SakuraRain id="tsparticles-left" />
            </div>
            <div className="w-full max-w-2xl shrink-0 mx-4">
              <Routes>
                <Route path="/" element={<TestView />} />
                <Route path="/acerca" element={<About />} />
                <Route path="/batalla" element={<Battle />} />
                <Route path="/donar" element={<Donate />} />
              </Routes>
            </div>
            <div className="relative hidden h-[80vh] flex-1 sm:block sticky top-20 pointer-events-none">
              <SakuraRain id="tsparticles-right" />
            </div>
          </main>
          <Footer />
          <UserBanner esAnonimo={esAnonimo} onAbrirLogin={() => setLoginAbierto(true)} />
          <LoginModal abierto={loginAbierto} onCerrar={() => setLoginAbierto(false)} onLogin={loginGoogle} />
          <SettingsModal
            abierto={settingsAbierto}
            onCerrar={() => setSettingsAbierto(false)}
            usuario={usuario}
            esAnonimo={esAnonimo}
            onCerrarSesion={cerrarSesion}
            onActualizarNickname={actualizarNickname}
            onAbrirLogin={() => setLoginAbierto(true)}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}
