export default function Home() {
    return (
    <>
      <div className="container flex flex-col h-screen">
        <h1 id="name" className="text-white self-end text-4xl lg:text-8xl">Matthew Brune</h1>
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