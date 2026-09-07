import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { defaultData } from './data';
import { ProposalData, Phase, LineItem } from './types';
import { DocumentPreview } from './DocumentPreview';
import { Plus, Trash2, Download, Building2, UserCircle, Briefcase, FileText } from 'lucide-react';

const TextInput = ({ label, value, onChange, type = 'text', textarea = false }: any) => (
  <div className="mb-6">
    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</label>
    {textarea ? (
      <textarea 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm min-h-[100px] resize-y text-gray-800"
      />
    ) : (
      <input 
        type={type}
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors bg-transparent text-sm text-gray-800"
      />
    )}
  </div>
);

export default function App() {
  const [data, setData] = useState<ProposalData>(() => {
    const saved = localStorage.getItem('proposalBuilderData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        let loadedTerms = parsed.terms || defaultData.terms;
        if (loadedTerms.includes('PROCESI I PROJEKTIMIT DHE SHËRBIMET')) {
          loadedTerms = defaultData.terms;
        }

        return {
          ...defaultData,
          ...parsed,
          company: { ...defaultData.company, ...parsed.company },
          client: { ...defaultData.client, ...parsed.client },
          processes: parsed.processes || defaultData.processes,
          competencies: parsed.competencies || defaultData.competencies,
          phases: parsed.phases || defaultData.phases,
          terms: loadedTerms
        };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  const [activeTab, setActiveTab] = useState<'studio' | 'client' | 'process' | 'competencies' | 'services' | 'terms'>('studio');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    localStorage.setItem('proposalBuilderData', JSON.stringify(data));
  }, [data]);

  const handleDownload = () => {
    setIsGenerating(true);
    const element = document.getElementById('pdf-document');
    if (!element) {
      setIsGenerating(false);
      return;
    }

    const opt = {
      margin: 0,
      filename: `Oferte_${data.client.projectTitle.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: ['css'], avoid: '.break-inside-avoid' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false);
    }).catch((err: any) => {
      console.error(err);
      setIsGenerating(false);
      alert('Ndodhi një gabim gjatë gjenerimit të PDF.');
    });
  };

  const updateCompany = (field: string, value: string) => setData(d => ({ ...d, company: { ...d.company, [field]: value } }));
  const updateClient = (field: string, value: any) => setData(d => ({ ...d, client: { ...d.client, [field]: value } }));

  const updateProcess = (id: string, field: keyof typeof data.processes[0], value: string) => {
    setData(d => ({
      ...d,
      processes: d.processes.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const updateCompetencies = (field: keyof typeof data.competencies, value: any) => {
    setData(d => ({
      ...d,
      competencies: { ...d.competencies, [field]: value }
    }));
  };

  const addProcess = () => {
    setData(d => ({
      ...d,
      processes: [...(d.processes || []), { id: `proc${Date.now()}`, number: String((d.processes?.length || 0) + 1).padStart(2, '0'), title: 'Fazë e re', duration: '', description: '' }]
    }));
  };

  const deleteProcess = (id: string) => {
    setData(d => ({
      ...d,
      processes: d.processes.filter(p => p.id !== id)
    }));
  };

  const updateCompetencyItem = (field: 'responsible' | 'notResponsible', index: number, value: string) => {
    setData(d => {
      const arr = [...(d.competencies[field] || [])];
      arr[index] = value;
      return { ...d, competencies: { ...d.competencies, [field]: arr } };
    });
  };

  const deleteCompetencyItem = (field: 'responsible' | 'notResponsible', index: number) => {
    setData(d => {
      const arr = [...(d.competencies[field] || [])];
      arr.splice(index, 1);
      return { ...d, competencies: { ...d.competencies, [field]: arr } };
    });
  };

  const addCompetencyItem = (field: 'responsible' | 'notResponsible') => {
    setData(d => ({
      ...d,
      competencies: { ...d.competencies, [field]: [...(d.competencies[field] || []), 'Përgjegjësi e re'] }
    }));
  };

  const addPhase = () => {
    setData(d => ({
      ...d,
      phases: [...d.phases, { id: `p${Date.now()}`, title: 'Faza e Re', description: '', items: [] }]
    }));
  };

  const deletePhase = (phaseId: string) => {
    setData(d => ({ ...d, phases: d.phases.filter(p => p.id !== phaseId) }));
  };

  const updatePhase = (phaseId: string, field: keyof Phase, value: string) => {
    setData(d => ({
      ...d,
      phases: d.phases.map(p => p.id === phaseId ? { ...p, [field]: value } : p)
    }));
  };

  const addItem = (phaseId: string) => {
    setData(d => ({
      ...d,
      phases: d.phases.map(p => p.id === phaseId ? {
        ...p,
        items: [...p.items, { id: `i${Date.now()}`, description: 'Shërbim i ri', quantity: 1, unit: 'm²', unitPrice: 0 }]
      } : p)
    }));
  };

  const updateItem = (phaseId: string, itemId: string, field: keyof LineItem, value: any) => {
    setData(d => ({
      ...d,
      phases: d.phases.map(p => p.id === phaseId ? {
        ...p,
        items: p.items.map(i => i.id === itemId ? { ...i, [field]: value } : i)
      } : p)
    }));
  };

  const deleteItem = (phaseId: string, itemId: string) => {
    setData(d => ({
      ...d,
      phases: d.phases.map(p => p.id === phaseId ? {
        ...p,
        items: p.items.filter(i => i.id !== itemId)
      } : p)
    }));
  };

  const tabs = [
    { id: 'studio', label: 'Studio & Info', icon: Building2 },
    { id: 'client', label: 'Klienti & Projekti', icon: UserCircle },
    { id: 'process', label: 'Procesi', icon: FileText },
    { id: 'competencies', label: 'Kompetencat', icon: FileText },
    { id: 'services', label: 'Faturimi & Shërbimet', icon: Briefcase },
    { id: 'terms', label: 'Kushtet & TVSH', icon: FileText }
  ] as const;

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden print:h-auto print:overflow-visible">
      {/* Header */}
      <header className="bg-black text-white px-4 md:px-6 py-4 flex justify-between items-center z-10 shrink-0 print:hidden flex-wrap gap-4">
        <div className="font-bold tracking-[0.2em] uppercase text-[11px]">Ofertë Pro</div>
        
        {/* Mobile View Toggle */}
        <div className="flex bg-gray-800 rounded-md p-1 lg:hidden">
          <button
            onClick={() => setMobileView('editor')}
            className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors ${mobileView === 'editor' ? 'bg-white text-black' : 'text-gray-400'}`}
          >
            Edituesi
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors ${mobileView === 'preview' ? 'bg-white text-black' : 'text-gray-400'}`}
          >
            Parapamja
          </button>
        </div>

        <button 
          onClick={handleDownload}
          disabled={isGenerating} 
          className="bg-white text-black px-4 md:px-6 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Download size={16} />
          <span className="hidden sm:inline">{isGenerating ? 'Po gjeneron...' : 'Shkarko PDF'}</span>
          <span className="sm:hidden">{isGenerating ? '...' : 'PDF'}</span>
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden print:overflow-visible relative">
        
        {/* Editor Pane */}
        <div className={`w-full lg:w-[450px] shrink-0 h-full overflow-y-auto bg-white border-r border-gray-200 flex-col print:hidden ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-100 shrink-0 scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-[80px] py-4 flex flex-col items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="p-8 flex-1 overflow-y-auto">
            {activeTab === 'studio' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-serif mb-8 text-gray-900">Të Dhënat e Studios</h2>
                <TextInput label="Emri i Studios" value={data.company.name} onChange={(v: string) => updateCompany('name', v)} />
                <TextInput label="Adresa" value={data.company.address} onChange={(v: string) => updateCompany('address', v)} />
                <TextInput label="Numri i Telefonit" value={data.company.phone} onChange={(v: string) => updateCompany('phone', v)} />
                <TextInput label="Email Adresa" value={data.company.email} onChange={(v: string) => updateCompany('email', v)} />
                
                <h2 className="text-xl font-serif mb-8 mt-12 text-gray-900">Detajet e Ofertës</h2>
                <TextInput label="Numri i Ofertës" value={data.offerNumber} onChange={(v: string) => setData(d => ({...d, offerNumber: v}))} />
                <TextInput label="Data" value={data.date} onChange={(v: string) => setData(d => ({...d, date: v}))} />
              </div>
            )}

            {activeTab === 'client' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-serif mb-8 text-gray-900">Detajet e Klientit</h2>
                <TextInput label="Emri i Klientit / Porositësit" value={data.client.name} onChange={(v: string) => updateClient('name', v)} />
                
                <h2 className="text-xl font-serif mb-8 mt-12 text-gray-900">Detajet e Projektit</h2>
                <TextInput label="Titulli i Projektit" value={data.client.projectTitle} onChange={(v: string) => updateClient('projectTitle', v)} />
                <TextInput label="Lokacioni" value={data.client.location} onChange={(v: string) => updateClient('location', v)} />
                <TextInput label="Sipërfaqja (m²)" type="number" value={data.client.area} onChange={(v: string) => updateClient('area', Number(v) || 0)} />
              </div>
            )}

            {activeTab === 'process' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-serif mb-8 text-gray-900">Procesi i Projektimit</h2>
                
                {data.processes?.map((proc, index) => (
                  <div key={proc.id} className="mb-8 bg-gray-50 p-4 border border-gray-200 relative group">
                    <button onClick={() => deleteProcess(proc.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:pr-8 pr-6">
                      <div className="w-full sm:w-16">
                        <TextInput label="Numri" value={proc.number} onChange={(v: string) => updateProcess(proc.id, 'number', v)} />
                      </div>
                      <div className="flex-1">
                        <TextInput label="Titulli i Fazës" value={proc.title} onChange={(v: string) => updateProcess(proc.id, 'title', v)} />
                      </div>
                    </div>
                    <TextInput label="Kohëzgjatja (Opsionale)" value={proc.duration} onChange={(v: string) => updateProcess(proc.id, 'duration', v)} />
                    <TextInput label="Përshkrimi" value={proc.description} onChange={(v: string) => updateProcess(proc.id, 'description', v)} textarea />
                  </div>
                ))}
                
                <button 
                  onClick={addProcess}
                  className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Shto një hap procesi
                </button>
              </div>
            )}

            {activeTab === 'competencies' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-serif mb-8 text-gray-900">Kompetencat e Projektuesit</h2>
                <TextInput label="Teksti Hyrës" value={data.competencies?.intro || ''} onChange={(v: string) => updateCompetencies('intro', v)} textarea />
                
                <div className="mb-8">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Përgjegjësitë</label>
                  {data.competencies?.responsible?.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      <input 
                        value={item} 
                        onChange={e => updateCompetencyItem('responsible', index, e.target.value)}
                        className="flex-1 border-b border-gray-200 py-2 focus:outline-none focus:border-black text-sm bg-transparent"
                      />
                      <button onClick={() => deleteCompetencyItem('responsible', index)} className="text-gray-300 hover:text-red-500 p-2">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addCompetencyItem('responsible')} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-gray-500">
                    <Plus size={12} /> Shto Përgjegjësi
                  </button>
                </div>

                <div className="mb-8">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Nuk mban Përgjegjësi</label>
                  {data.competencies?.notResponsible?.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      <input 
                        value={item} 
                        onChange={e => updateCompetencyItem('notResponsible', index, e.target.value)}
                        className="flex-1 border-b border-gray-200 py-2 focus:outline-none focus:border-black text-sm bg-transparent"
                      />
                      <button onClick={() => deleteCompetencyItem('notResponsible', index)} className="text-gray-300 hover:text-red-500 p-2">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addCompetencyItem('notResponsible')} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-gray-500">
                    <Plus size={12} /> Shto Përjashtim
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-serif mb-6 text-gray-900">Shërbimet & Çmimet</h2>
                <TextInput label="Teksti Hyrës (Opsional)" value={data.introText} onChange={(v: string) => setData(d => ({...d, introText: v}))} textarea />
                
                {data.phases.map((phase, pIndex) => (
                  <div key={phase.id} className="bg-gray-50 border border-gray-200 p-6 mb-8 relative group">
                    <button onClick={() => deletePhase(phase.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    
                    <TextInput label="Titulli i Fazës" value={phase.title} onChange={(v: string) => updatePhase(phase.id, 'title', v)} />
                    <TextInput label="Përshkrimi" value={phase.description} onChange={(v: string) => updatePhase(phase.id, 'description', v)} textarea />
                    
                    <div className="mt-8">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Zërat e Faturimit</label>
                      {phase.items.map((item, iIndex) => (
                        <div key={item.id} className="grid grid-cols-12 gap-x-3 gap-y-4 mb-4 items-center bg-white p-4 border border-gray-100 shadow-sm relative">
                          <div className="col-span-12 pr-6">
                            <input 
                              placeholder="Përshkrimi i zërit" 
                              value={item.description} 
                              onChange={e => updateItem(phase.id, item.id, 'description', e.target.value)}
                              className="w-full border-b border-gray-200 py-1 text-sm focus:outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Sasia</label>
                            <input 
                              type="number"
                              value={item.quantity} 
                              onChange={e => updateItem(phase.id, item.id, 'quantity', Number(e.target.value) || 0)}
                              className="w-full border-b border-gray-200 py-1 text-sm focus:outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Njësia</label>
                            <input 
                              value={item.unit} 
                              onChange={e => updateItem(phase.id, item.id, 'unit', e.target.value)}
                              className="w-full border-b border-gray-200 py-1 text-sm focus:outline-none focus:border-black"
                            />
                          </div>
                          <div className="col-span-4">
                            <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Çmimi</label>
                            <input 
                              type="number"
                              value={item.unitPrice} 
                              onChange={e => updateItem(phase.id, item.id, 'unitPrice', Number(e.target.value) || 0)}
                              className="w-full border-b border-gray-200 py-1 text-sm focus:outline-none focus:border-black"
                            />
                          </div>
                          <div className="absolute top-4 right-4 flex justify-end">
                            <button onClick={() => deleteItem(phase.id, item.id)} className="text-gray-300 hover:text-red-500">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => addItem(phase.id)}
                        className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-gray-500"
                      >
                        <Plus size={12} /> Shto një Zë
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={addPhase}
                  className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Shto një Fazë të re
                </button>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-xl font-serif mb-8 text-gray-900">Kushtet e Marrëveshjes</h2>
                <TextInput label="Përqindja e TVSH (%)" type="number" value={data.taxRate} onChange={(v: string) => setData(d => ({...d, taxRate: Number(v) || 0}))} />
                <TextInput label="Kushtet e Kontratës" value={data.terms} onChange={(v: string) => setData(d => ({...d, terms: v}))} textarea />
              </div>
            )}
          </div>
        </div>

        {/* Preview Pane */}
        <div className={`flex-1 bg-gray-100 overflow-y-auto flex justify-center py-4 lg:py-12 relative print:bg-white print:p-0 print:overflow-visible print:block ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="absolute top-4 right-6 text-xs text-gray-400 font-bold tracking-widest uppercase hidden lg:block print:hidden">
            Parapamja Live
          </div>
          <div className="transform origin-top scale-[0.45] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] 2xl:scale-[0.9] transition-transform pb-[200px] print:transform-none print:pb-0 print:w-full print:flex print:justify-center">
            <DocumentPreview data={data} id="pdf-document" />
          </div>
        </div>
      </div>
    </div>
  );
}

