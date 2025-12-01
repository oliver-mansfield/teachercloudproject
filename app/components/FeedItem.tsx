import Image from "next/image";
import {ImageHit} from "../types/imageApiResponse";
import {useEffect, useState} from "react";
import {XIcon, Loader2} from "lucide-react";

interface FeedItemProps {
	image: ImageHit;
}

export default function FeedItem({image}: FeedItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isModalImageLoading, setIsModalImageLoading] = useState(false);

	const handleClick = () => {
		setIsOpen(true);
		setIsModalImageLoading(true);
	};

	const handleEscapeKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEscapeKey);
		return () => {
			window.removeEventListener("keydown", handleEscapeKey);
		};
	}, []);

	return (
		<>
			<div className="max-w-[600px] w-full border border-grayLightest rounded p-4 bg-white">
				<div>
					<p className="text-lg font-bold">{image.user}</p>
					<p>1st December 2025</p>
				</div>
				<Image
					src={image.webformatURL}
					alt={image.tags}
					width={image.webformatWidth}
					height={image.webformatHeight}
					className="w-full rounded border border-grayLightest cursor-pointer"
					objectFit="cover"
					onClick={handleClick}
				/>
				<div className="flex items-end justify-end gap-2">
					<p>{image.views} views</p>
					<p>{image.likes} likes</p>
				</div>
			</div>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					{isModalImageLoading && (
						<div className="absolute inset-0 flex justify-center items-center">
							<Loader2 className="w-12 h-12 text-white animate-spin" />
						</div>
					)}
					<Image
						src={image.largeImageURL}
						alt={image.tags}
						width={image.imageWidth}
						height={image.imageHeight}
						className="max-w-full max-h-full object-contain"
						onLoad={() => setIsModalImageLoading(false)}
					/>
					<button
						onClick={() => setIsOpen(false)}
						className="absolute top-4 right-4 text-white text-2xl"
					>
						<XIcon className="w-6 h-6 text-white" />
					</button>
				</div>
			)}
		</>
	);
}
