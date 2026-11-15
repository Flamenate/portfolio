export function Browser() {
  return (
    <section className="h-full">
      <iframe
        className="h-full w-full"
        src="https://github.com/Flamenate"
        //TODO: change this example to something pertinent
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>
  )
}
