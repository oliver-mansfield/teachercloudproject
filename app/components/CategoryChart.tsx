"use client";

import {useQuery} from "@tanstack/react-query";
import getProducts from "@/app/utilities/api/getProducts";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import {Bar, Doughnut} from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export default function CategoryChart() {
	const {data, isLoading, error} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-grayLight">Loading chart data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-grayLight">Failed to load chart data.</div>
			</div>
		);
	}

	// Count products by category
	const categoryCounts: Record<string, number> = {};
	data?.products.forEach((product) => {
		categoryCounts[product.category] =
			(categoryCounts[product.category] || 0) + 1;
	});

	const categories = Object.keys(categoryCounts);
	const counts = Object.values(categoryCounts);

	const backgroundColors = [
		"rgba(24, 160, 251, 0.8)", // uiPrimary
		"rgba(17, 118, 187, 0.8)", // uiPrimaryDark
		"rgba(230, 245, 255, 0.8)", // uiPrimaryLight
		"rgba(255, 182, 143, 0.8)", // brand
		"rgba(255, 233, 221, 0.8)", // brandLight
	];

	const chartData = {
		labels: categories,
		datasets: [
			{
				label: "Number of Products",
				data: counts,
				backgroundColor: backgroundColors.slice(0, categories.length),
				borderColor: backgroundColors
					.slice(0, categories.length)
					.map((color) => color.replace("0.8", "1")),
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Products by Category",
			},
		},
	};

	return (
		<div className="w-full p-6">
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-2">Products by Category</h2>
				<p className="text-grayLight">
					Total products: {data?.products.length || 0}
				</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white rounded-lg border border-grayLightest p-6">
					<h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
					<Bar data={chartData} options={options} />
				</div>
				<div className="bg-white rounded-lg border border-grayLightest p-6">
					<h3 className="text-lg font-semibold mb-4">Doughnut Chart</h3>
					<Doughnut data={chartData} options={options} />
				</div>
			</div>
		</div>
	);
}
