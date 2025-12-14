import TextType from "@/components/TextType";
import {
  ShieldCheck,
  Clock3,
  Stethoscope,
  MessageSquareHeart,
  Smartphone,
  Cloud,
  TrendingUp,
} from "lucide-react";
import { NavbarDemo } from "@/components/navbar";
import Footer from "@/components/footer";

const highlightCards = [
  {
    title: "Privasi Terjamin",
    description:
      "Sebagai partner Anda, saya memegang prinsip bahwa kerahasiaan adalah nomor satu. Seluruh informasi yang Anda 'spill' di sini dijamin 100% private, tanpa ada celah. Jadi, keep calm dan ceritakan saja semuanya.",
    icon: ShieldCheck,
  },
  {
    title: "Respons Cepat",
    description:
      "Kapan pun Anda butuh, Dr. Aiko selalu siap sedia. Tengah malam sekalipun? Langsung saja chat! Di sini, tidak ada batasan jadwal atau antrean. Kebutuhan Anda akan langsung direspons.",
    icon: Clock3,
  },
  {
    title: "Ahli Kesehatan Holistik",
    description:
      "Keluhan fisik, mental, dan lifestyle akan dianalisis dengan pendekatan komprehensif. Ini demi memastikan Anda tetap seimbang dan mendapatkan solusi yang tepat sasaran.",
    icon: Stethoscope,
  },
  {
    title: "Selalu Ada yang Dengar",
    description:
      "Anda dipersilakan untuk curhat bebas dan akan mendapatkan respons yang empatik. Ini kami lakukan agar hati dan pikiran Anda bisa menjadi jauh lebih lega.",
    icon: MessageSquareHeart,
  },

];

const highlightCards2 = [
  {
    title: "Pantau & Catat",
    description:
      "Lacak kesehatan fisik dan mental harian Anda melalui aplikasi yang user-friendly",
    icon: Smartphone,
  },
  {
    title: "Analisis AI Cerdas",
    description:
      "AI kami menganalisis data fisik dan mental untuk memberikan insight holistik",
    icon: Cloud,
  },
  {
    title: "Tingkatkan Kesehatan",
    description:
      "Dapatkan rekomendasi personal untuk meningkatkan kesehatan fisik dan mental Anda",
    icon: TrendingUp,
  },
];

export default function Home() {
  return (
    <div id="beranda" className="min-h-screen overflow-x-hidden flex flex-col">
      <div className="container border mx-auto min-h-screen py-12 lg:py-16">
        <NavbarDemo />
        <div className="grid grid-cols-1 items-center gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8 text-left">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-slate-900">
              <TextType
                text={["Perkenalkan, saya Aiko.", "Anda bisa memanggil saya Dr. Aiko.", "Saya di sini, siap mendukung apa pun kebutuhan Anda."]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-left"
              />
            </div>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl">
              Sebagai seorang dokter, saya siap sedia buat support kamu dalam urusan kesehatan fisik maupun mental. Kamu bisa spill aja masalah kesehatan kamu, nanti saya kasih solusi yang best buat kamu. Selain itu, kalau butuh curhat atau sharing, saya juga siap dengerin kamu dengan sepenuh hati.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="./Konsultasi">
              <button className="rounded-full bg-[#0f244a] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#0f244a]/30 transition hover:-translate-y-0.5 hover:bg-[#132f5f]">
                Mulai Konsultasi
              </button>
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-gradient-to-b from-[#e3f0ff] to-transparent blur-3xl opacity-60" />
            <div className="sticky top-28 flex items-center justify-center">
              <img
                src="Aiko.gif"
                alt="gif DR. Aiko"
                className="h-72 w-72 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <section id="info" className="w-full bg-[#bedadc] mt-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
              Kenapa harus Aiko?
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Gabungan teknologi dan sentuhan manusia biar kamu merasa lebih aman, didengar, dan diarahkan.
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {highlightCards.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-gray-400 bg-gradient-to-b from-[#f8fbff] to-[#bedadc] p-8 
                           shadow-[0_10px_30px_rgba(14,35,90,0.06)] 
                           hover:shadow-[0_25px_70px_rgba(14,35,90,0.12)] 
                           transition-all duration-300 ease-out 
                           hover:-translate-y-1 hover:scale-[1.02] 
                           backdrop-blur-sm "
              >
                {/* Icon container with hover effect */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white text-[#0f244a] shadow-inner 
                                group-hover:bg-gradient-to-br group-hover:from-[#e0ecff] group-hover:to-[#d0e2ff] 
                                transition-colors duration-300">
                  <Icon className="h-7 flex items-center justify-center w-7 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                </div>
            
                {/* Text content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-[#0f244a] leading-snug group-hover:text-[#1a3b66] transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colort duration-300">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full mt-16 ">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Workflow</p>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0f244a]">
              Cara kerja Aiko
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3">
            {highlightCards2.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex h-full flex-col items-center gap-4 rounded-[32px] border border-gray-400 p-8 shadow-[0_30px_80px_rgba(15,36,74,0.08)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl  text-black  shadow-[0_20px_45px_rgba(99,102,241,0.35)]">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <div className="text-center flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-[#0f244a]">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
