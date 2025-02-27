export default function Home() {
    return (
    <>
      <div className="container flex flex-col h-screen">
        <div className="header__container self-end">
          <h1 id="name" className="text-white text-4xl lg:text-8xl">Matthew Brune</h1>
          <ul className="flex justify-end mt-5">
            <li className="self-end text-white hover:text-yellow-500 text-2xl lg:text-5xl"><a href="/resume">Resume</a></li>
          </ul>
        </div>
        <div className="video-embed center m-auto">
        <iframe title="Starcadian Music Video" src="https://www.youtube.com/embed/9dabg-9KOOM"
            className="w-11/12 lg:w-4/5"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    </>
    )
  }