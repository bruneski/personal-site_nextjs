import React, {Component} from 'react';
import Image from 'next/image'


class Navigation extends Component<{}> {
    render() {
        return (
            <>
                <nav id="nav--main" className="flex flex-col w-full h-full items-center">
                    <div className="h-[50px] w-[50px] lg:h-[150px] lg:w-[150px] relative ">
                        <Image
                            src={`/IMG_1670.jpg`}
                            alt="headshot of person"
                            layout="fill" // required
                            objectFit="cover" // change to suit your needs
                            className="rounded-full m-5 lg:m-0 lg:p-5 lg:pt-8" // just an example
                        />
                    </div>
                    <ul className="flex w-full flex-col pt-10">
                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5"><a className="w-full text-center" href="/">Home</a></li>
                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5"><a className="w-full text-center" href="/resume">Resume</a></li>

                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5"><a className="w-full text-center" href="/about">About</a></li>
                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5"><a className="w-full text-center" href="/work">Work</a></li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navigation;