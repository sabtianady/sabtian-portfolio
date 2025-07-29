import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-3xl w-full">
        <Card className="rounded-2xl shadow-lg p-6 bg-white">
          <CardContent className="flex flex-col items-center text-center gap-6">
            <Image
              src="/assets/photo_1.png"
              alt="Sabtian Adiansyah"
              width={160}
              height={160}
              className="rounded-full border border-gray-200 shadow-sm"
              priority
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sabtian Adiansyah</h1>
              <p className="text-gray-600 mt-2">Sales Development Representative | Dealls</p>
            </div>
            <div className="text-gray-700 text-base leading-relaxed">
              <p>
                Saya adalah seorang SDR berpengalaman dengan spesialisasi dalam memprospek dan nurturing leads di industri B2B SaaS. Saat ini bekerja di Dealls, saya fokus menghubungkan talent terbaik dengan perusahaan impian mereka.
              </p>
              <p className="mt-4">
                Portfolio ini menyajikan beberapa proyek, pencapaian, dan pemikiran saya terkait strategi penjualan modern, pemanfaatan teknologi dalam prospekting, serta pemahaman mendalam terhadap pasar rekrutmen Indonesia.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="/assets/CV Sabtian Adiansyah.pdf" download>
                <Button variant="default" className="px-6 py-2">
                  Download CV
                </Button>
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="px-6 py-2">
                  Hubungi via WhatsApp
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Image
            src="/assets/photo_2.png"
            alt="Photo 2"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover"
          />
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-contain bg-white p-6"
          />
        </div>
      </div>
    </main>
  );
}
