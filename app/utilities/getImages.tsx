import {ImageApiResponse} from "../types/imageApiResponse";

export default async function getImages(): Promise<ImageApiResponse | null> {
	const url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=flowers&image_type=photo&pretty=true`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(
				`Network response was not ok: ${response.status} ${response.statusText}`
			);
		}
		const data = await response.json();
		return data as ImageApiResponse;
	} catch (error) {
		console.error("Failed to fetch images:", error);
		return null;
	}
}
