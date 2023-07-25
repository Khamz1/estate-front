export type userDataType = {
    id: string;
    _id: string;
    fullName: string;
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    token: string;
    err: string | null;
  
  };