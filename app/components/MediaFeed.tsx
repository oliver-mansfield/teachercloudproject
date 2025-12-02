"use client";

import getImages, {perPage} from "@/app/utilities/api/getImagesBySearchTerm";
import {useInfiniteQuery} from "@tanstack/react-query";
import {ImageHit} from "@/app/types/imageApiResponse";
import FeedItem from "./FeedItem";
import FeedItemSkeleton from "./FeedItemSkeleton";
import {useEffect, useRef, useState} from "react";

export default function MediaFeed() {
	const [searchTerm, setSearchTerm] = useState("flowers"); // active term used in query
	const [inputValue, setInputValue] = useState("flowers"); // controlled input value

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["images", searchTerm],
		queryFn: ({pageParam = 1}) => getImages(pageParam, searchTerm),
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

	const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSearchTerm(inputValue);
	};

	return (
		<section className="flex justify-center items-center flex-col w-full p-4 gap-8">
			<form
				onSubmit={handleSearchSubmit}
				className="w-full max-w-[600px] flex flex-col gap-2 sm:flex-row sm:items-end"
			>
				<div className="flex-1">
					<label
						className="font-medium mb-2 block"
						htmlFor="feed-search"
						aria-label="Search images"
					>
						Search for images
					</label>
					<input
						id="feed-search"
						type="search"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						placeholder="Try 'cats', 'mountains', 'sunset'"
						className="w-full rounded-md border border-grayLightest px-3 py-2  focus:outline-none focus:ring-2 focus:ring-uiPrimary focus:border-uiPrimary bg-white h-12 shadow"
						aria-label="Search input"
					/>
				</div>
				<button
					type="submit"
					className="mt-2 sm:mt-6 rounded-md bg-uiPrimary px-4 py-2  text-white hover:bg-uiPrimaryDark transition-colors h-12"
					aria-label="Search button"
				>
					Search
				</button>
			</form>

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
