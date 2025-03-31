export type Ksb = {
  id: string;  
  type: string;
  code: number; 
  description: string;
  updated_at: string;
  theme: string;
  isModified?: boolean;
  }

  export interface KsbPostRequestData {
    code: number;
    description: string;
    theme: string;
  }
  
  export interface KsbUpdateRequestData {
    type: string
    code: number;
    description: string;
  }
  