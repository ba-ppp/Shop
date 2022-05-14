export interface IToken {
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
}

export interface ProductSuggestion {
  anh: string;
  gia: number;
  id: string;
  ten: string;
}
export interface Product {
  id: string;
  ten: string;
  loai: ProductType[];
}

export interface ProductType {
  id: string;
  ten: string;
  products: ProductItem[];
}
export interface ProductItem {
  id: string;
  ten: string;
  gia: number[];
  anh: string[];
  mau: string[];
  moTa?: string;
  isFavorite?: boolean;
}

export interface ProductScreen {
  congNghe: string;
  doPhanGiai: string;
  rong: string;
  doSang: string;
  matKinh: string;
}

export interface ProductCamera {
  sau: string;
  denFlash: string;
  truoc: string;
}

export interface ProductSystem {
  os: string;
  ram: string;
  rom: string;
}

export interface ProductConnection {
  mang: string;
  sim: string;
  wifi: string;
  bluetooh: string;
  congSac: string;
  khac: string;
}

export interface ProductBattery {
  dungLuong: string;
  loai: string;
  tocDoSac: string;
  congNghe: string;
}

export interface ProductDetail {
  manHinh: ProductScreen;
  camera: ProductCamera;
  system: ProductSystem;
  ketNoi: ProductConnection;
  pin: ProductBattery;
}

export interface Accessories {
  id: string;
  ten: string;
  gia: number;
  anh: string;
}
