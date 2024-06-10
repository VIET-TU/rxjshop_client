import { productImgs } from "@/contains/fakeData";
import productVariantImg2 from "@/images/products/v2.jpg";
import productVariantImg3 from "@/images/products/v3.jpg";
import productVariantImg4 from "@/images/products/v4.jpg";
import productVariantImg5 from "@/images/products/v5.jpg";
import productVariantImg6 from "@/images/products/v6.jpg";
//
import productSport1 from "@/images/products/sport-1.png";
import productSport2 from "@/images/products/sport-2.png";
import productSport3 from "@/images/products/sport-3.png";
import productSport4 from "@/images/products/sport-4.png";
import productSport5 from "@/images/products/sport-5.png";
import productSport6 from "@/images/products/sport-6.png";
import productSport7 from "@/images/products/sport-7.png";
import productSport8 from "@/images/products/sport-8.png";
import { StaticImageData } from "next/image";

//

export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: StaticImageData | string;
  color?: string;
  featuredImage: StaticImageData | string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData | string;
  description: string;
  category: string;
  tags: string[];
  link: "/product-detail/";
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
  rating?: string;
  numberOfReviews?: number;
}

export interface Product2 {
  id: string;
  product_name: string;
  product_price: string;
  product_thumbs: string[];
  product_description: string;
  product_quantity: number;
  product_attributes: {
    size: string,
    color: string,
    category: string,
}
  product_slug: string;
  variantType?: "color";
  status?: "New in";
  rating?: string;
  product_ratingsAverage?: number;
}

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: "Black",
    thumbnail: productVariantImg6,
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "White",
    thumbnail: productVariantImg2,
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    thumbnail: productVariantImg3,
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    thumbnail: productVariantImg4,
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Natural",
    thumbnail: productVariantImg5,
    featuredImage: productImgs[4],
  },
];
const DEMO_VARIANT_COLORS: ProductVariant[] = [
  {
    id: 1,
    name: "Violet",
    color: "bg-violet-400",
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "Yellow",
    color: "bg-yellow-400",
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    color: "bg-orange-400",
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    color: "bg-sky-400",
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Green",
    color: "bg-green-400",
    featuredImage: productImgs[4],
  },
];

export const PRODUCTS: Product2[] = [
  {
    id: 'bb6a53e6-1265-4672-926c-075676b6fe57',
    product_name : "Rey Nylon Backpack",
    product_description: "The '80s b-ball icon returns with classic colours, crisp leather and throwback hoops flair. Channelling vintage style back onto the streets, its padded collar lets you take your game anywhere—in comfort.",
    product_slug: "dunk-low-retro-se",
    product_price: "4000",
    product_thumbs: [
        "https://rxjshop-s3-bucket.s3.ap-southeast-1.amazonaws.com/Nike%20Dunk%20Low%20Retro%20SE/dunk-low-retro-se-%281%29.png?AWSAccessKeyId=AKIAUGCNSNYC62XXGT6O&Expires=1749403019&Signature=jj6TzjjTKL1aDnAgZBPgovhTh2A%3D",
        "https://rxjshop-s3-bucket.s3.ap-southeast-1.amazonaws.com/Nike%20Dunk%20Low%20Retro%20SE/dunk-low-retro-se-%282%29.png?AWSAccessKeyId=AKIAUGCNSNYC62XXGT6O&Expires=1749403073&Signature=kA5b0LJLK250fyHIl%2Blblo9xIuE%3D",
        "https://rxjshop-s3-bucket.s3.ap-southeast-1.amazonaws.com/Nike%20Dunk%20Low%20Retro%20SE/dunk-low-retro-se-%283%29.png?AWSAccessKeyId=AKIAUGCNSNYC62XXGT6O&Expires=1749403085&Signature=5TN6pGhNIL31GanYcFF80VoQtkk%3D",
        "https://rxjshop-s3-bucket.s3.ap-southeast-1.amazonaws.com/Nike%20Dunk%20Low%20Retro%20SE/dunk-low-retro-se-%284%29.png?AWSAccessKeyId=AKIAUGCNSNYC62XXGT6O&Expires=1749403098&Signature=rOYxG7oZPPRh4RONpU%2BpcULhmB4%3D"
    ],
        : "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "New in",
    rating: "4.4",
    numberOfReviews: 98,
  },
];
