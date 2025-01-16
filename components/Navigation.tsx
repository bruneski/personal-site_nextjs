import React, {Component} from 'react';
import Image from 'next/image'


class Navigation extends Component<{}> {
    render() {
        return (
            <>
                <nav id="nav--main" className="flex flex-col w-full items-center">
                    <Image src={`/IMG_8509.jpg`} alt={"headshot of person"} className="rounded-full pt-5" width="80" height="80" />
                    <ul className="flex w-full flex-col mt-10">
                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5"><a href="/">Home</a></li>
                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5"><a href="/about">About</a></li>
                        <li className="text-xl font-bold w-full flex hover:bg-highlight justify-center py-5">Work</li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navigation;