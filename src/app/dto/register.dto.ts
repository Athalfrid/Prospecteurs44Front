export interface InformationsPersonnellesDTO {
  nom: string;
  prenom: string;
  dateNaissance: string; // ISO string
  ville: string;
  codePostal: string;
  telephone?: string;
}

export interface User {
  userId: number;
  userPseudo: string;
  email: string;
  password?: string;
  role: string;
  userParrain?: User;
  filleuls?: User[];
  dateInscription: string;
  informationsPersonnelles: InformationsPersonnellesDTO;
}

export interface RegisterDTO {
  pseudo: string;
  email: string;
  password: string;
  isParrained: boolean;
  emailParrain?: string;
  informationsPersonnelles: InformationsPersonnellesDTO;
}

