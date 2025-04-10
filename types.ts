export type Ksb = {
  id: string;  
  type: any;
  code: number; 
  description: string;
  updated_at: string;
  theme: string;
  is_complete: string;
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
    is_complete: string;
    
  }
  
  import "./node_modules/nuxt-auth-utils/dist/runtime/types/session.d.ts"; 

  declare module "./node_modules/nuxt-auth-utils/dist/runtime/types/session.d.ts" {
    interface User {
      role?: string;
      name?:string;
    }
  }