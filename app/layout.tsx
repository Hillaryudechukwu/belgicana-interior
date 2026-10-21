import { LocaleProvider } from '@/components/LocaleProvider';
import { getLocale } from '@/lib/server-locale';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Experience';
import './globals.css';
const englishMetadata:Metadata={title:{default:'Belgicana Interior | Beautiful Spaces. Real Budgets.',template:'%s | Belgicana Interior'},description:'Thoughtful, budget-conscious interior design, space planning and styling for homes, businesses and community spaces. Based near Luton.',openGraph:{title:'Belgicana Interior',description:'Beautiful spaces. Real budgets. Better wellbeing.',type:'website'},robots:{index:true,follow:true}};
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  if (locale === 'en') return englishMetadata;
  return { ...englishMetadata, title: { default: 'Belgicana Interior | Espaços bonitos. Orçamentos reais.', template: '%s | Belgicana Interior' }, description: 'Design de interiores cuidado e atento ao orçamento, planeamento e decoração para casas, empresas e espaços comunitários. Perto de Luton.', openGraph: { title: 'Belgicana Interior', description: 'Espaços bonitos. Orçamentos reais. Mais bem-estar.', type: 'website', locale: 'pt_PT' } };
}
export default async function RootLayout({children}:{children:React.ReactNode}) {
  const locale = await getLocale();
  return (
    <html lang={locale === 'pt' ? 'pt-PT' : 'en'}>
      {/* Browser extensions can inject attributes such as data-testim-* before hydration. */}
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale}>
        <Header/>
        <main id="main-content">{children}</main>
        <Footer/>
        </LocaleProvider>
      </body>
    </html>
  );
}
