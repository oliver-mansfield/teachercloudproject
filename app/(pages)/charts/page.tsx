import CategoryChart from "@/app/components/CategoryChart";

export default function ChartsPage() {
	return (
		<>
			<div className="border-b border-grayLightest mb-16 bg-white">
				<h1 className="text-2xl p-6 sm:p-8">Charts</h1>
			</div>
			<CategoryChart />
		</>
	);
}
