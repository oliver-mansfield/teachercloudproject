"use client";

import getImages from "@/app/utilities/getImages";
import {useQuery} from "@tanstack/react-query";
import {ImageHit} from "@/app/types/imageApiResponse";
import FeedItem from "./FeedItem";

export default function MediaFeed() {
	const {data, isLoading, error} = useQuery({
		queryKey: ["images"],
		queryFn: getImages,
	});

	if (isLoading) {
		return <div>Loading images...</div>;
	}

	if (error) {
		return <div>Failed to load images. {error.message}</div>;
	}

	return (
		<div className="flex justify-center items-center flex-col w-full p-4 gap-4">
			{data?.hits.map((image: ImageHit) => (
				<FeedItem key={image.id} image={image} />
			))}
		</div>
	);
}
