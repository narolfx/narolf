import React from 'react';
import { ProposalData, Phase } from './types';

const formatEur = (num: number) => {
  return new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'EUR' }).format(num);
};

export const DocumentPreview = ({ data, id }: { data: ProposalData, id?: string }) => {
  const phaseTotal = (phase: Phase) => phase.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const subTotal = data.phases.reduce((sum, phase) => sum + phaseTotal(phase), 0);
  const tax = subTotal * (data.taxRate / 100);
  const grandTotal = subTotal + tax;

  return (
    <div id={id} className="w-[794px] bg-white text-black font-sans text-sm shadow-xl print:shadow-none print:w-[210mm] print:mx-auto">
      {/* Cover Page */}
      <div className="w-[794px] print:w-full min-h-[1123px] print:min-h-[250mm] p-16 print:p-0 flex flex-col justify-between border-b border-gray-200 print:border-none break-after-page">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[3rem] leading-none font-serif mb-4 uppercase text-gray-900 tracking-wide">Ofertë</h1>
            <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Propozim Financiar</p>
          </div>
          <div className="text-right max-w-[250px]">
            <p className="font-bold text-gray-900 tracking-wider uppercase text-[11px] mb-2">{data.company.name}</p>
            <p className="text-gray-500 text-[11px] mb-1">{data.company.address}</p>
            <p className="text-gray-500 text-[11px] mb-1">{data.company.phone}</p>
            <p className="text-gray-500 text-[11px]">{data.company.email}</p>
          </div>
        </div>

        <div className="my-32">
          <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mb-4">Përgatitur Për</p>
          <h2 className="text-4xl font-serif text-gray-900 mb-3">{data.client.name}</h2>
          <p className="text-xl text-gray-700 mb-4">{data.client.projectTitle}</p>
          <p className="text-gray-500 text-sm">
            {data.client.location} {data.client.area > 0 ? `• ${data.client.area} m²` : ''}
          </p>
        </div>

        <div className="flex justify-between text-[11px] text-gray-400 uppercase tracking-widest font-bold">
          <p>Data: {data.date}</p>
          <p>Nr: {data.offerNumber}</p>
        </div>
      </div>

      {/* Process & Services Definition Page(s) */}
      <div className="w-[794px] print:w-full min-h-[1123px] print:min-h-0 p-16 print:p-0 flex flex-col border-b border-gray-200 print:border-none break-after-page">
        <h3 className="text-2xl font-serif text-gray-900 mb-8 uppercase">Procesi i Projektimit<br/>dhe Shërbimet e Arkitektit</h3>
        
        <div className="grid grid-cols-1 gap-8">
          {data.processes?.map((proc, idx) => (
            <div key={proc.id} className="flex gap-6 break-inside-avoid">
              <div className="text-3xl font-serif text-gray-300 mt-1">{proc.number}</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 tracking-wide uppercase text-[11px]">
                  {proc.title} {proc.duration && <span className="text-gray-400 font-normal normal-case ml-2">— {proc.duration}</span>}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{proc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competencies Page */}
      <div className="w-[794px] print:w-full min-h-[1123px] print:min-h-0 p-16 print:p-0 flex flex-col border-b border-gray-200 print:border-none break-after-page">
        <h3 className="text-2xl font-serif text-gray-900 mb-6 uppercase">Kompetencat e Projektuesit</h3>
        <p className="mb-12 leading-relaxed text-gray-600 whitespace-pre-wrap">{data.competencies?.intro}</p>

        <div className="grid grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-[11px]">Arkitekti projektues është përgjegjës për:</h4>
            <ul className="space-y-4">
              {data.competencies?.responsible?.filter(Boolean).map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-600 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-[11px]">Arkitekti nuk është automatikisht përgjegjës për:</h4>
            <ul className="space-y-4">
              {data.competencies?.notResponsible?.filter(Boolean).map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-red-500 font-bold">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Details & Pricing Page */}
      <div className="w-[794px] print:w-full min-h-[1123px] print:min-h-0 p-16 print:p-0 flex flex-col border-b border-gray-200 print:border-none break-after-page">
        <h3 className="text-2xl font-serif text-gray-900 mb-6 uppercase">Përshkrimi i Shërbimeve & Kostot</h3>
        {data.introText && <p className="mb-12 leading-relaxed text-gray-600 whitespace-pre-wrap">{data.introText}</p>}

        <div className="flex-1 w-full">
          {data.phases.map(phase => (
            <div key={phase.id} className="mb-10 break-inside-avoid">
              <h4 className="font-bold border-b border-gray-900 pb-2 mb-3 uppercase tracking-wider text-[11px] text-gray-900">{phase.title}</h4>
              {phase.description && <p className="text-gray-500 text-sm mb-4 leading-relaxed">{phase.description}</p>}
              
              <table className="w-full text-left mb-3 border-collapse">
                <thead>
                  <tr className="text-[9px] text-gray-400 uppercase tracking-wider border-b border-gray-200">
                    <th className="py-2 font-bold w-[45%]">Përshkrimi</th>
                    <th className="py-2 font-bold">Sasia</th>
                    <th className="py-2 font-bold">Njësia</th>
                    <th className="py-2 font-bold text-right">Çmimi/Njësi</th>
                    <th className="py-2 font-bold text-right">Totali</th>
                  </tr>
                </thead>
                <tbody>
                  {phase.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 pr-4 text-gray-700 text-[13px]">{item.description}</td>
                      <td className="py-3 text-gray-500 text-[13px]">{item.quantity}</td>
                      <td className="py-3 text-gray-500 text-[13px]">{item.unit}</td>
                      <td className="py-3 text-right text-gray-500 text-[13px]">{formatEur(item.unitPrice)}</td>
                      <td className="py-3 text-right text-gray-900 font-medium text-[13px]">{formatEur(item.quantity * item.unitPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-2">
                Nëntotali Faza: <span className="text-gray-900 ml-2">{formatEur(phaseTotal(phase))}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t-2 border-gray-900 break-inside-avoid">
          <div className="flex justify-end mb-2 text-gray-500 text-sm">
            <span className="w-48 text-right uppercase tracking-wider text-[11px] font-bold">Nëntotali:</span>
            <span className="w-32 text-right font-medium text-gray-900">{formatEur(subTotal)}</span>
          </div>
          {data.taxRate > 0 && (
            <div className="flex justify-end mb-4 text-gray-500 text-sm">
              <span className="w-48 text-right uppercase tracking-wider text-[11px] font-bold">TVSH ({data.taxRate}%):</span>
              <span className="w-32 text-right font-medium text-gray-900">{formatEur(tax)}</span>
            </div>
          )}
          <div className="flex justify-end text-lg mt-4 pt-4 border-t border-gray-200">
            <span className="w-48 text-right font-serif text-gray-900">Totali:</span>
            <span className="w-32 text-right font-bold text-gray-900">{formatEur(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Terms Page */}
      <div className="w-[794px] print:w-full min-h-[1123px] print:min-h-0 p-16 print:p-0 flex flex-col justify-between print:border-none break-after-page">
        <div>
          <h3 className="text-2xl font-serif text-gray-900 mb-8">Kushtet e Marrëveshjes</h3>
          <div className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
            {data.terms}
          </div>
        </div>

        <div className="flex justify-between mt-32 pt-16 border-t border-gray-200">
          <div className="w-64 text-center">
            <div className="h-16 border-b border-gray-900 mb-4"></div>
            <p className="font-bold text-gray-900 text-[11px] uppercase tracking-wider">{data.company.name}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Përfaqësuesi i Studios</p>
          </div>
          <div className="w-64 text-center">
            <div className="h-16 border-b border-gray-900 mb-4"></div>
            <p className="font-bold text-gray-900 text-[11px] uppercase tracking-wider">{data.client.name}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Porositësi / Klienti</p>
          </div>
        </div>
      </div>
    </div>
  );
};
