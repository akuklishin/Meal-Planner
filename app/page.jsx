import Image from "next/image";

export default function Home() {
    return (
        <>

            <div className="text-center mb-24">
                <p className="text-3xl my-2">Plan meals, track nutrition.</p>
                <h1 className="text-7xl my-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">Meal Planner</h1>
            </div>

            <div className="container mx-auto my-16 flex flex-col md:flex-row items-center">

                <div className="flex-1 mb-8 md:mb-0">
                    <Image
                        className="rounded-lg"
                        src="/img/meal-prep-2.jpg"
                        alt="Meal Prep"
                        width={480}
                        height={480}
                    />
                </div>

                <div className="flex-1 mx-8 py-8 text-xl text-left">
                    First, <span className="font-semibold text-blue-500">plan your meals</span> by finding food products with smart search.
                </div>

            </div>

            <div className="container mx-auto my-16 flex flex-col md:flex-row items-center">

                <div className="flex-1 mb-8 md:mb-0">
                    <Image
                        className="rounded-lg"
                        src="/img/meal-prep-1.jpg"
                        alt="Meal Prep"
                        width={480}
                        height={480}/>
                </div>

                <div className="flex-1 mx-8 py-8 text-xl text-left">
                    Then, <span className="font-semibold text-blue-500">track your nutrition history</span> with detailed stats and charts.
                </div>

            </div>

        </>
    )
}
