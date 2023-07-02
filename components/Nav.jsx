'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

    //const isUserLoggedIn = false;

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        (async () => {
        const res = await getProviders();
        setProviders(res);
        })();
    }, []);

    return (
        <nav className="bg-blue-950 p-1">
            <div className="flex items-center justify-between">

                {/* TITLE */}
                <div className="flex items-center text-lg font-bold px-4 py-2">
                    <Link className="flex items-center" href="/">

                            <Image
                                src="/img/logo.png"
                                alt="Meal Planner Logo"
                                width={50}
                                height={50}
                            />
                            <span className="ml-2 text-2xl ">Meal Planner</span>

                    </Link>
                </div>

                {/* NAVIGATION */}
                {/* {isUserLoggedIn ? ( */}
                { session?.user ? (
                    <ul className="flex items-center">
                        <li className="px-4 py-2 text-sm text-white">[ {session.user.role} : {session.user.email}]</li>
                        <li className="px-4 py-2"><Link href={"/plan"}>Plan</Link></li>
                        <li className="px-4 py-2"><Link href={"/history"}>History</Link></li>
                        <li className="px-4 py-2"><Link href={"/about"}>About</Link></li>
                        {/*<li className="px-4 py-2"><Link href={"/logout"}>Logout</Link></li>*/}
                        <button type='button' onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} className='text-blue-500 hover:underline px-4 py-2'>
                            Sign Out
                        </button>
                    </ul>
                ) : (

                    <ul className="flex items-center">
                        <li className="px-4 py-2"><Link href={"/about"}>About</Link></li>
                        {/*<li className="px-4 py-2"><Link href={"/login"}>Login</Link></li>*/}
                        {/*<li className="px-4 py-2"><Link href={"/register"}>Register</Link></li>*/}
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='text-blue-500 hover:underline px-4 py-2'
                                >
                                    Sign In
                                </button>
              ))}

                    </ul>

                )}
                {/* <ul className="flex items-center">
                    <li className="px-4 py-2"><Link href={"/plan"}>Plan</Link></li>
                    <li className="px-4 py-2"><Link href={"/history"}>History</Link></li>
                    <li className="px-4 py-2"><Link href={"/about"}>About</Link></li>
                    <li className="px-4 py-2"><Link href={"/admin"}>Admin</Link></li>
                    <li className="px-4 py-2"><Link href={"/login"}>Login</Link></li>
                    <li className="px-4 py-2"><Link href={"/logout"}>Logout</Link></li>
                    <li className="px-4 py-2"><Link href={"/register"}>Register</Link></li>
                </ul> */}

            </div>
        </nav>
    )
}

export default Nav;
