export default async function getImages() {
	const url = `https://pixabay.com/api/?key=53488091-2cda2553e8b8491e3fa2e0826&q=yellow+flowers&image_type=photo&pretty=true`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}
