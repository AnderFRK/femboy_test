import { Heart, Coffee, ShieldCheck, ExternalLink } from 'lucide-react';

const PAYPAL_ME = "https://paypal.me/VicHV21";

export default function DonationSection() {
  return (
    <div
      id="donar"
      className="w-full max-w-2xl mx-auto rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl text-center scroll-mt-24 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 shadow-sm relative group cursor-default">
        <div className="absolute inset-0 rounded-full bg-pink-300 opacity-20 group-hover:animate-ping transition-all"></div>
        <Heart className="h-10 w-10 text-pink-500 fill-pink-500 animate-pulse" />
      </div>

      <h2 className="mb-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
        Apoya este <span className="text-pink-500">Proyecto</span>
      </h2>

      <p className="text-slate-600 text-lg font-medium mb-2">
        Este test es <strong className="text-slate-900">100% gratuito</strong> y
        siempre lo será.
      </p>
      
      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-8">
        <span>Si te gustó la experiencia, puedes invitarnos un café</span>
        <Coffee className="h-4 w-4 text-[#c2dafd] fill-[#c2dafd]" />
      </div>

      <a
        href={PAYPAL_ME}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f7c9f2] px-10 py-4 font-bold text-lg text-slate-800 shadow-md transition-all hover:bg-[#c2dafd] hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <Heart className="h-5 w-5 text-pink-500" />
        Donar con PayPal
        <ExternalLink className="h-4 w-4 text-slate-600 ml-1 opacity-70" />
      </a>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border-2 border-slate-100 w-fit mx-auto shadow-sm">
        <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
        <p>
          Redirige a PayPal — tú eliges el monto. No almacenamos ningún dato de pago.
        </p>
      </div>
      
    </div>
  );
}