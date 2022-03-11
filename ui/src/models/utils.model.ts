export interface IToken {
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
}

export interface Product {
    id: string;
    name: string;
    img: string;
    price: number;
    count: number;
    memory: string;
    screen: string;
    colors: string[];
    chip: string;
    os: string;
    network: string;
    battery: string;
    main_camera: string;
    selfie_camera: string;
    decription: string;
}