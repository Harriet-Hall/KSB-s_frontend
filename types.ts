export type Ksb = {
  id: string;  
  type: string;
  code: number; 
  description: string;
  updated_at: string;
  theme: string;
  }

  export interface KsbRequestData {
    code: number;
    description: string;
    theme: string;
  }
  