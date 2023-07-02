import Image from "next/image";

export default function Page() {
    return (

        <>

            {/* title */}
            <h1 className="text-4xl mt-8 mb-4 font-light uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
                About Meal Planner:
            </h1>

            <p className="text-lg mb-4">
                The Meal Planner app is a two-student team project developed as part of our Web Development II course. The goal was to create an application that helps users plan their meals, track their nutritional intake, and make informed dietary choices.
            </p>

            <div className="flex-1 mt-8 flex justify-center z-10">
                <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white z-20">
                    <Image
                        src="/img/meal-prep-3.jpg"
                        alt="Meal Prep"
                        width={64}
                        height={64}
                        layout="responsive"
                    />
                </div>
            </div>

            {/* content */}
            <div className="flex flex-col md:flex-row gap-2 mt-[-72px] z-30">

                {/*Tech stack*/}
                <div className="w-full md:w-1/2 rounded-2xl pt-16 p-8 my-8 bg-blue-50 bg-gradient-to-b from-blue-100 to-blue-50">
                    <h2 className="text-xl uppercase mb-8 py-2 text-center text-blue-500 bg-white rounded-full">Technology Stack</h2>
                    <div className="mb-6">
                        <ul>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">React</p>
                                <p>The app's frontend was developed using React, a popular JavaScript library for
                                    building user interfaces. React allowed for the efficient creation of reusable UI
                                    components and facilitated the app's interactive and dynamic nature.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Next.js</p>
                                <p>A popular React framework, for server-side rendering and efficient client-side
                                    navigation. Next.js enhances the app's performance by pre-rendering pages and
                                    optimizing the delivery of static assets. It also provides built-in routing and API
                                    routes, making it easier to build dynamic web applications.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">MongoDB</p>
                                <p>The app utilizes MongoDB, a NoSQL database, to store user information, meal plans,
                                    and nutritional data. MongoDB's flexible document-based structure provided
                                    scalability and ease of data manipulation.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Edamam API</p>
                                <p>The Meal Planner app integrates the Edamam API to access a rich database of food and
                                    nutritional data, enabling the retrieval of nutritional information and helping in
                                    the creation of diverse meal plans.</p>
                            </li>

                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Tailwind CSS</p>
                                <p>The Meal Planner app leverages Tailwind CSS, a utility-first CSS framework, for its
                                    styling needs. Tailwind CSS offers a comprehensive set of pre-built utility classes
                                    that enable rapid development and customization of the app's user interface. This
                                    promotes a more efficient and maintainable CSS workflow by eliminating the need for
                                    writing custom CSS styles from scratch.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Chart.js</p>
                                <p>A powerful JavaScript library used for visualizing data in the form of graphs and
                                    charts. It provided a flexible and customizable solution for displaying our
                                    nutritional information and tracking users' dietary patterns.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Features */}
                <div className="w-full md:w-1/2 rounded-2xl pt-16 p-8 my-8 bg-blue-50 bg-gradient-to-b from-blue-100 to-blue-50">
                    <h2 className="text-xl uppercase mb-8 py-2 text-center text-blue-500 border-b border-blue-100 bg-white rounded-full">Features</h2>
                    <div className="mb-6">
                        <ul>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Smart Search</p>
                                <p>Users can search for food products and view their nutritional information, including
                                    calories, proteins, carbs, and fat.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Drag & Drop</p>
                                <p>Users can drag and drop selected food products into their chosen meal slots, allowing
                                    for easy meal planning and organization.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Date Selection</p>
                                <p>Users can select a date for each meal, providing an organized overview of their meal
                                    plan over time.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Meal Saving</p>
                                <p>Users can save their meal plans, which are stored securely in the app's database.
                                    Saved meals can be accessed and modified later.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Nutritional Tracking</p>
                                <p>The app calculates the total nutritional information for each meal, including the
                                    overall calorie count and macronutrient distribution.</p>
                            </li>
                            <li className="mb-8">
                                <p className="font-semibold text-blue-500">Graph Visualization</p>
                                <p>The app generates visual graphs and charts to display users' nutritional intake,
                                    allowing for easy tracking and analysis.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
