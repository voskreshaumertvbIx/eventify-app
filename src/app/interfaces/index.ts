type Avatar = {
  file: string;
  url: string;
};

export interface AppUser {  
  email: string;
  username?: string;
  description?: string;
  avatar?: Avatar;
}
export interface LoginForm {
  email:string,
  password:string
}