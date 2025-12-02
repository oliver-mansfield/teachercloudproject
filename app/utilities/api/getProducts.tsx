import {ProductsResponse} from "@/app/types/productsApiResponse";

export default async function getProducts(): Promise<ProductsResponse> {
	const url = "https://dummyjson.com/products";

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(
			`Network response was not ok: ${response.status} ${response.statusText}`
		);
	}

	const data = (await response.json()) as ProductsResponse;
	return data;
}
