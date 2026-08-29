/**
 * El reproductor que usan los dos vídeos de la página.
 *
 * **Uno y no dos copias.** El del héroe y el del force quit siguen las mismas reglas
 * —bucle, sin sonido, sin controles, con póster— y tenerlas escritas dos veces es
 * garantizar que un día se contradigan.
 *
 * Sin controles y en bucle: nadie pulsa «play» para averiguar qué hace un producto que
 * todavía no entiende. Sin sonido, porque no hay nada que oír y porque un vídeo que
 * suena solo se cierra antes de verse.
 *
 * `playsInline` no es para iPhone —esto es una app de Mac— sino porque sin él Safari en
 * móvil se lo lleva a pantalla completa: quien abre la web desde el teléfono para
 * mirarla y comprar luego en el Mac se encontraría el reproductor tapándolo todo.
 */
export default function DemoVideo({ webm, mp4, poster, label, className = '' }) {
  return (
    <figure className={`overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10 ${className}`}>
      <video
        className="block w-full"
        // El póster evita el rectángulo negro mientras carga, que parece un fallo y no
        // una espera.
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </figure>
  )
}
