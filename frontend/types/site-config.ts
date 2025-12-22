// types/site-config.ts

export type MenuItem = {
  title: string;
  description: string;
  url: string;
};

export type NavbarMenu = {
  title: string;
  menu_items: MenuItem[];
  url: string;
};

export type Navbar = {
  logo: string;
  about: NavbarMenu;
  activities: NavbarMenu;
  projects: NavbarMenu;
  lodge: NavbarMenu;
  contact: NavbarMenu;
};

export type About = {
  title: string;
  description: string;
  subitle: string[];
  image: string;
};

export type ProjectRef = {
  name: string;
  projectUrl: string;
  imageUrl: string;
};

export type ProjectsSection = {
  row1: ProjectRef[];
  row2: ProjectRef[];
};

export type Stat = {
  name: string;
  number: number;
  url: string;
};

export type Stats = {
  title: string;
  stats: Stat[];
};

export type ServiceItem = {
  id: number;
  title: string;
  videoUrl: string;
  initialGrow: number;
  finalGrow: number;
};

export type LodgeProject = {
  name: string;
  image: string;
};

export type Lodge = {
  title: string;
  description: string;
  lodge_logo: string;
};

export type Certificate = {
  id: string;
  title: string;
  logo: string;
};

export type Licenses = {
  title: string;
  certificates: Certificate[];
};

export type Contact = {
  title: string;
  address: string;
  cellphone: string;
  phone: string;
  email: string;
  instagram: string;
  whatsapp: string;
  telegram: string;
};

export type Footer = {
  title: string;
  contact: Contact;
};

export type SiteConfig = {
  title: string;
  navbar: Navbar;
  about: About;
  projects: ProjectsSection;
  stats: Stats;
  services: ServiceItem[];
  lodge: Lodge;
  lodge_projects: LodgeProject[];
  licenses: Licenses;
  footer: Footer;
};