import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <svg viewBox="0 0 320 250" width="300" height="234" aria-hidden="true" data-om-id="2bd033b5:33">
        <defs data-om-id="2bd033b5:34"><linearGradient id="fgFlame" x1="0" y1="0" x2="0" y2="1" data-om-id="2bd033b5:35"><stop offset="0%" stopColor="#FB7B3A" data-om-id="2bd033b5:36"></stop><stop offset="100%" stopColor="#D9480F" data-om-id="2bd033b5:37"></stop></linearGradient></defs>
        <ellipse cx="160" cy="240" rx="108" ry="11" fill="#0F172A" opacity="0.05" data-om-id="2bd033b5:38"></ellipse>
        <ellipse cx="160" cy="230" rx="122" ry="15" fill="none" stroke="#FBD3B8" strokeWidth="1.5" stroke-dasharray="3 5" data-om-id="2bd033b5:39"></ellipse>

        {/* <!-- back flaps (opened outward) --> */}
        <path d="M80 140 L160 102 L142 76 L62 114 Z" fill="#FFD7B5" stroke="#EA580C" strokeWidth="2" stroke-linejoin="round" data-om-id="2bd033b5:40"></path>
        <path d="M160 102 L240 140 L258 114 L178 76 Z" fill="#FFC796" stroke="#EA580C" strokeWidth="2" stroke-linejoin="round" data-om-id="2bd033b5:41"></path>

        {/* <!-- interior --> */}
        <path d="M80 140 L160 102 L240 140 L160 178 Z" fill="#F2C7A3" data-om-id="2bd033b5:42"></path>

        {/* <!-- confused flame mascot rising from inside (Catch logo style) --> */}
        <g transform="translate(160 140)" data-om-id="2bd033b5:43">
          <g transform="translate(-12 18) scale(5) translate(-10 -15)" fill="#ea580c">
                <path d="M12 2C12 2 8 6 8 11C8 14 10 16 10 16C10 16 9 14 10 12C10 12 14 16 13 20C13 20 18 16 18 11C18 6 12 2 12 2Z"></path>
                <path d="M11.5 22C9 22 7 20 7 17.5C7 16 8.5 13 8.5 13C8.5 13 7.5 15 8.5 17.5C8.5 17.5 12 21 15.5 18C15.5 18 14 22 11.5 22Z" opacity="0.4"></path>
          </g>
          {/* <!-- dizzy eyes (x_x) --> */}
          <g stroke="#7A2E0A" transform="translate(0 -5)" strokeWidth="2.8" stroke-linecap="round" data-om-id="2bd033b5:46">
            <path d="M-17 -12 l7 7 M-10 -12 l-7 7" data-om-id="2bd033b5:47"></path>
            <path d="M12 -12 l7 7 M19 -12 l-7 7" data-om-id="2bd033b5:48"></path>
          </g>
          {/* <!-- worried mouth --> */}
          <path d="M-6 9 Q1 4 8 9" fill="none" transform="translate(0 -10)" stroke="#7A2E0A" strokeWidth="2.8" stroke-linecap="round" data-om-id="2bd033b5:49"></path>
        </g>

        {/* <!-- front faces --> */}
        <path d="M80 140 L160 178 L160 238 L80 200 Z" fill="#FFF5EB" stroke="#EA580C" strokeWidth="2" stroke-linejoin="round" data-om-id="2bd033b5:50"></path>
        <path d="M240 140 L160 178 L160 238 L240 200 Z" fill="#FFEAD3" stroke="#EA580C" strokeWidth="2" stroke-linejoin="round" data-om-id="2bd033b5:51"></path>
        {/* <!-- front flaps folded down --> */}
       <path d="M80 140 L160 178 L138 194 L58 156 Z" fill="#FFE0C4" stroke="#EA580C" stroke-width="2" stroke-linejoin="round"></path>
       <path d="M240 140 L160 178 L182 194 L262 156 Z" fill="#FFD3AE" stroke="#EA580C" stroke-width="2" stroke-linejoin="round"></path>

        {/* <!-- floating question marks --> */}
        <text x="58" y="72" font-size="26" font-weight="800" fill="#FBA76A" font-family="Manrope,sans-serif" data-om-id="2bd033b5:54">?</text>
        <text x="240" y="58" font-size="34" font-weight="800" fill="#EA580C" font-family="Manrope,sans-serif" data-om-id="2bd033b5:55">?</text>
        <text x="262" y="118" font-size="20" font-weight="800" fill="#FBA76A" font-family="Manrope,sans-serif" data-om-id="2bd033b5:56">?</text>
        <circle cx="44" cy="150" r="2.5" fill="#EA580C" data-om-id="2bd033b5:57"></circle>
        <circle cx="284" cy="182" r="2.5" fill="#FBA76A" data-om-id="2bd033b5:58"></circle>
      </svg>
     
      <h2 className="text-6xl font-extrabold text-slate-200 mt-6">404</h2>
      <h3 className="text-2xl font-bold text-slate-900 mt-4">
        Ой! Сторінку не знайдено
      </h3>
      <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
        Схоже, ця знижка вже закінчилася, була видалена автором або посилання вказано з помилкою.
      </p>
      
      <Link 
        href="/" 
        className="mt-8 bg-orange-600 text-white hover:bg-orange-700 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
      >
        Повернутися на головну
      </Link>
    </div>
  );
}