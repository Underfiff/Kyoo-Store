export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  status: "TERSEDIA" | "HABIS";
};



  