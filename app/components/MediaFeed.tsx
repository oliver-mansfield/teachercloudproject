"use client";

import getImages, {perPage} from "@/app/utilities/api/getImages";
import {useInfiniteQuery} from "@tanstack/react-query";
import {ImageHit} from "@/app/types/imageApiResponse";
import FeedItem from "./FeedItem";
import FeedItemSkeleton from "./FeedItemSkeleton";
import {useEffect, useRef} from "react";

export default function MediaFeed() {
	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["images"],
		queryFn: ({pageParam = 1}) => getImages(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			// If we got fewer than perPage items, there are no more pages
			if (!lastPage || lastPage.hits.length < perPage) {
				return undefined;
			}
			return allPages.length + 1;
		},
	});

	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!hasNextPage || isFetchingNextPage) return;

		const node = loadMoreRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const firstEntry = entries[0];
				if (firstEntry.isIntersecting) {
					fetchNextPage();
				}
			},
			{
				root: null,
				rootMargin: "200px",
				threshold: 0,
			}
		);

		observer.observe(node);

		return () => {
			observer.disconnect();
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	// Flatten all pages into a single array
	const images: ImageHit[] = data?.pages.flatMap((page) => page.hits) ?? [];

	return (
		<section className="flex justify-center items-center flex-col w-full p-4 gap-8">
			{error && (
				<div className="text-red-600">
					Failed to load images. {error.message}
				</div>
			)}

			{isLoading ? (
				<>
					<FeedItemSkeleton />
					<FeedItemSkeleton />
					<FeedItemSkeleton />
				</>
			) : (
				<>
					{images.map((image: ImageHit) => (
						<FeedItem key={image.id} image={image} />
					))}
					{/* Observer element for infinite scroll */}
					<div ref={loadMoreRef} />
					{isFetchingNextPage && (
						<div className="flex flex-col items-center gap-4">
							<FeedItemSkeleton />
							<FeedItemSkeleton />
						</div>
					)}
					{!hasNextPage && images.length > 0 && (
						<div className="text-grayLight py-4">No more images to load</div>
					)}
				</>
			)}
		</section>
	);
}
