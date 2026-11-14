export function Browser() {
  return (
    <section className="h-full">
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/Te2I2muO-4c?si=rFTRl845snviqPkM"
        //TODO: change this example to something pertinent
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>
  )
}
