const PAYPAL_ME = "https://paypal.me/VicHV21";

export default function DonationSection() {
  return (
    <div
      id="donar"
      className="w-full max-w-2xl rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl text-center scroll-mt-24"
    >
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-4xl shadow-sm">
        💖
      </div>

      <h2 className="mb-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
        Apoya este <span className="text-pink-500">Proyecto</span>
      </h2>

      <p className="text-slate-600 text-lg font-medium mb-2">
        Este test es <strong className="text-slate-900">100% gratuito</strong> y
        siempre lo será. 🌸
      </p>
      <p className="text-slate-500 text-sm mb-8">
        Si te gustó la experiencia y quieres apoyar a los desarrolladores,
        puedes invitarnos un café ☕
      </p>

      <a
        href={PAYPAL_ME}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-xl bg-[#f7c9f2] px-12 py-4 font-bold text-lg text-slate-800 shadow-md transition-all hover:bg-[#c2dafd] hover:-translate-y-1 cursor-pointer"
      >
        Donar con PayPal
      </a>

      <p className="mt-6 text-xs text-slate-400">
        🔒 Redirige a PayPal — tú eliges el monto. No almacenamos ningún dato de pago.
      </p>
    </div>
  );
}
