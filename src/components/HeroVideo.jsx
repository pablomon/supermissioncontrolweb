/**
 * La grabación real, donde antes había una recreación interactiva.
 *
 * **`MissionControlDemo` sigue en el repo y sin usar, a propósito.** Reproducía la
 * rejilla con HTML y funcionaba, pero es una recreación: enseña lo que decimos que
 * pasa, no lo que pasa. En un producto cuya única duda razonable es «¿esto de verdad
 * funciona en mi Mac?», una maqueta responde con la misma voz que la promesa.
 *
 * Sin controles y en bucle: nadie pulsa «play» para averiguar qué hace un producto que
 * todavía no entiende. Sin sonido, porque no hay nada que oír y porque un vídeo que
 * suena solo se cierra antes de verse.
 *
 * `playsInline` no es para iPhone —esto es una app de Mac— sino porque sin él Safari
 * en móvil se lo lleva a pantalla completa: quien abre la web desde el teléfono para
 * mirarla y comprar luego en el Mac se encontraría el reproductor tapándolo todo.
 */
export default function HeroVideo() {
  return (
    <figure className="overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10">
      <video
        className="block w-full"
        // El póster evita el rectángulo negro mientras carga, que en lo primero que se
        // ve de la página parece un fallo y no una espera.
        poster="/demo/demo-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Closing windows from Mission Control with Super Mission Control"
      >
        <source src="/demo/demo.webm" type="video/webm" />
        <source src="/demo/demo.mp4" type="video/mp4" />
      </video>
    </figure>
  )
}
