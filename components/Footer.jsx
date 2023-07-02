const Footer = () => {
    return (
        <footer className="bg-blue-950 text-white pt-6 mt-32">

            {/* Top Part */}
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Fake Contact */}
                    <div>
                        <h4 className="font-light text-lg text-blue-500 mb-3 uppercase">Contact</h4>
                        <p className="font-semibold uppercase">John Abbott College</p>
                        <p>21 275 Lakeshore Road</p>
                        <p>Sainte-Anne-de-Bellevue, QC, H9X 3L9</p>
                        <p>(514) 457-5036</p>
                    </div>

                    {/* Fake Newsletter */}
                    <div>
                        <h4 className="font-light text-lg text-blue-500 mb-3 uppercase">Newsletter</h4>
                        <p>Stay updated on the latest developments and special offers!</p>
                        <input type="email" placeholder="Email Address" className="mt-3 mr-3 p-2 rounded cursor-not-allowed" disabled />
                        <button className="bg-gray-500 text-gray-400 mt-3 px-4 py-2 rounded cursor-not-allowed" disabled>Subscribe</button>
                    </div>

                </div>


            </div>

            {/* Bottom Part */}
            <div className="bg-blue-900 text-blue-500 text-center mt-6 p-4">
                <p>{new Date().getFullYear()}. FSD07. Group 1.</p>
            </div>

        </footer>
    )
}

export default Footer;
