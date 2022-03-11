import { Product } from "models/utils.model";
import { v4 } from "uuid";

export const ProductMock: Product[] = [
  {
    id: v4(),
    name: "Iphone SE",
    img: "asset/images/iphone.jpg",
    price: 1000000,
    count: 3,
    memory: "64GB",
    screen: "4.7 inch",
    colors: ["red", "purple"],
    chip: "A11 Bionic",
    os: "iOS 11",
    network: "4G",
    battery: "Non-removable Li-Po 4100 mAh battery",
    main_camera: "12 MP",
    selfie_camera: "7 MP",
    decription: 'Visit ten places on our planet that are undergoing the biggest changes today.'
  },
];
