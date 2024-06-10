import http from "@/utils/http";
import {
  CreateProductReponse,
  GetProductReponse,
  GetProductsResponse,
  ProductFilter,
} from "../../../../types/product.type";
import { HEADER } from "@/utils/constants";

export const getProducts = (query?: ProductFilter) =>
  http.get<GetProductsResponse>(
    `products${query?.limit ? `limit=${query?.limit}` : ""}${
      query?.page ? `&page=${query?.page}` : ""
    }`
  );
export const getOneProduct = (id: string) =>
  http.get<GetProductReponse>(`products/${id}`);

export const createProduct = (formData: FormData) =>
  http.post<CreateProductReponse>("/products", formData, {
    headers: {
      // Bỏ 'Content-Type': 'application/json' để trình duyệt tự động xử lý Content-Type và boundary
      Authorization: `Bearer ${localStorage.getItem(HEADER.AC_TOKEN)}`,
      "x-client-id": localStorage.getItem(HEADER.CLIENT_ID),
      "Content-Type": "multipart/form-data",
    },
  });
