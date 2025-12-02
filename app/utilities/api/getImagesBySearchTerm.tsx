import {ImageApiResponse} from "../../types/imageApiResponse";

const perPage = 10;
export {perPage};

export default async function getImages(
	page: number = 1,
	searchTerm: string = "flowers"
): Promise<ImageApiResponse> {
	const trimmedSearchTerm = searchTerm.trim() || "flowers";
	const url = `https://pixabay.com/api/?key=53488091-2cda2553e8b8491e3fa2e0826&q=${trimmedSearchTerm}&image_type=photo&pretty=true&page=${page}&per_page=${perPage}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(
			`Network response was not ok: ${response.status} ${response.statusText}`
		);
	}

	const data = (await response.json()) as ImageApiResponse;
	return data;
}
