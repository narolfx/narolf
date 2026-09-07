export interface CompanyDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface ClientDetails {
  name: string;
  projectTitle: string;
  location: string;
  area: number;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  items: LineItem[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
}

export interface Competencies {
  intro: string;
  responsible: string[];
  notResponsible: string[];
}

export interface ProposalData {
  company: CompanyDetails;
  client: ClientDetails;
  date: string;
  offerNumber: string;
  introText: string;
  phases: Phase[];
  processes: ProcessStep[];
  competencies: Competencies;
  terms: string;
  taxRate: number;
}
