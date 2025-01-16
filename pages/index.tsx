export default function Home() {
    return (
    <>
      <div className="container h-screen w-5/6">
        <h1 id="name" className="text-6xl md:text-8xl w-auto text-white">Matthew Brune</h1>
        <div className="video-embed center m-auto ">
        <iframe title="Starcadian Music Video" src="https://www.youtube.com/embed/9dabg-9KOOM"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    </>
    )
  }