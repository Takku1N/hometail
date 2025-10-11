export interface MyProfileResponse{
  userData: UserInterface | null
  isLogin: boolean
}

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  role: RoleInterface;
  status: boolean;
  createdAt?: string; // DateTime in ISO string
  updatedAt?: string;
  user_profile?: UserProfileInterface | null;
  owned_pets?: PetInterface[];
  requestsSent?: RequestInterface[];
}

export interface UserProfileInterface {
  user_id: number;
  user: UserInterface;
  first_name: string;
  last_name: string;
  phone_number: string;
  facebook: string;
  image_url?: string | null;
}

export interface PetInterface {
  id: number;
  owner_id: number;
  owner: UserInterface;
  profile: PetProfileInterface;
  requests?: RequestInterface[];
}

export interface PetProfileInterface {
  pet_id: number;
  pet: PetInterface;
  name: string;
  age: number;
  gender: string;
  description: string;
  breed: string;
  location: string;
  vaccinated: boolean;
  neutered: boolean;
  medical_note?: string | null;
  species: PetTypeInterface;
  adopted: boolean;
  image_url: string;
}

export interface RequestInterface {
  id: number;
  requester_id: number;
  requester: UserInterface;
  pet_id: number;
  pet: PetInterface;
  status: RequestStatusInterface;
  createdAt: string;
  updatedAt: string;
}

// Enums
export type RoleInterface = "User" | "Admin";
export type RequestStatusInterface = "Pending" | "Approved" | "Rejected";
export type PetTypeInterface =
  | "Dog"
  | "Cat"
  | "Bird"
  | "Hamster"
  | "Lizard"
  | "Rabbit";
