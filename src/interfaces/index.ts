export type Avatar = {
  file: string;
  url: string;
};

export interface UploadResult {
  info: {
    secure_url: string;
    public_id: string;
  };
}

export interface LoginForm {
  uid: string;
  email: string;
  password: string;
}

export interface AppUser {
  avatar?: Avatar | null;
  uid?: string;
  email: string | null;
  username?: string;
  description?: string;
  name?: string;
  surname?: string;
  address?: string;
  age?: number | string | null;
}
export interface Event {
  uid: string;
  image: Avatar;
  title: string;
  description: string;
  location: {
    lat: number;
    lon: number;
  };
  dateinfo: {
    date: Date | null;
    start: string;
    end: string;
  };
}
export interface Registerform {
  email: string;
  password: string;
  username: string;
}
export interface LocationState {
  lat: number | null;
  lon: number | null;
  setLocation: (lat: number, lon: number) => void;
  resetLocation: () => void;
  setInitialized: (initialized: boolean) => void;
  initialized: boolean;
}
