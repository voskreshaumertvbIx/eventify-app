


export interface LoginForm {
  uid:string;
  email:string,
  password:string
}

export interface AppUser {  
  uid?:string;
  email: string | null;
  username?: string;
  description?: string;
  
}