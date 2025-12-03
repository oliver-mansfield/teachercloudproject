import Image from "next/image";
import {ImageHit} from "../../types/imageApiResponse";
import {useEffect, useState} from "react";
import {XIcon, Loader2, EyeIcon, HeartIcon} from "lucide-react";

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

	const handleReturnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
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
			<div
				className="max-w-[600px] w-full rounded-lg bg-white cursor-pointer hover:shadow-md transition-all duration-100 hover:translate-y-[-2px] border border-grayLightest"
				onClick={handleClick}
				role="button"
				tabIndex={0}
				onKeyDown={handleReturnKeyDown}
				aria-label={`Open image posted by ${image.user}`}
			>
				<div className="p-4 flex items-center gap-4">
					{image.userImageURL ? (
						<Image
							src={image.userImageURL}
							alt={image.user}
							width={32}
							height={32}
							className="rounded-full"
						/>
					) : (
						<div className="w-8 h-8 rounded-full bg-grayLightest flex items-center justify-center text-xs font-semibold text-grayMid">
							?
						</div>
					)}
					<p className="text-lg font-bold">{image.user}</p>
				</div>
				<Image
					src={image.webformatURL}
					alt={image.tags}
					width={image.webformatWidth}
					height={image.webformatHeight}
					className="w-full"
					objectFit="contain"
				/>
				<div className="flex items-end justify-end gap-8 text-sm text-grayLight p-4">
					<p className="flex items-center gap-2">
						<EyeIcon className="w-4 h-4" />
						{image.views}
					</p>
					<p className="flex items-center gap-2">
						<HeartIcon className="w-4 h-4" />
						{image.likes}
					</p>
				</div>
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-60"
					role="dialog"
					aria-modal="true"
					aria-label={`Full-screen image posted by ${image.user}`}
				>
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
						className="absolute top-4 right-4 text-white text-2xl  border rounded-full p-2 bg-white transition-all duration-100 cursor-pointer hover:bg-grayLightest"
						aria-label="Close full-screen image"
					>
						<XIcon className="w-6 h-6 text-black" />
					</button>
				</div>
			)}
		</>
	);
}
