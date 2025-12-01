"use client";

import getImages from "@/app/utilities/getImages";
import {useQuery} from "@tanstack/react-query";
import {ImageHit} from "@/app/types/imageApiResponse";
import Image from "next/image";

export default function MediaReel() {
	const {data, isLoading, error} = useQuery({
		queryKey: ["images"],
		queryFn: getImages,
	});

	return (
		<div>
			{data?.hits.map((image: ImageHit) => (
				<Image
					key={image.id}
					src={image.webformatURL}
					alt={image.tags}
					width={image.webformatWidth}
					height={image.webformatHeight}
				/>
			))}
		</div>
	);
}
