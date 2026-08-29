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
 * **Termina con el último fotograma congelado segundo y medio.** En bucle y sin esa
 * pausa, el salto al principio se lee como parte del movimiento y no se distingue
 * dónde acaba: quien mira no sabe si ha visto la secuencia entera o ha entrado a la
 * mitad. Congelar cuesta cero en VP9 —un cuadro quieto no ocupa— y da el respiro que
 * marca el final.
 *
 * `playsInline` no es para iPhone —esto es una app de Mac— sino porque sin él Safari
 * en móvil se lo lleva a pantalla completa: quien abre la web desde el teléfono para
 * mirarla y comprar luego en el Mac se encontraría el reproductor tapándolo todo.
 */
// **Importados y no puestos en `public/`.** Con una ruta fija, sustituir el vídeo deja
// el nombre igual y el navegador —y la caché de delante— siguen sirviendo el anterior:
// se despliega, todo responde 200, y lo que se ve es el de antes. Importándolos, Vite
// les pone un hash del contenido en el nombre, así que cada versión estrena URL y no
// hay caché que valga. Es el mismo modo de fallo silencioso que ya costó cinco commits
// con el despliegue.
import demoWebm from '../assets/demo.webm'
import demoMp4 from '../assets/demo.mp4'
import demoPoster from '../assets/demo-poster.jpg'

export default function HeroVideo() {
  return (
    <figure className="overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10">
      <video
        className="block w-full"
        // El póster evita el rectángulo negro mientras carga, que en lo primero que se
        // ve de la página parece un fallo y no una espera.
        poster={demoPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Closing windows from Mission Control with Super Mission Control"
      >
        <source src={demoWebm} type="video/webm" />
        <source src={demoMp4} type="video/mp4" />
      </video>
    </figure>
  )
}
