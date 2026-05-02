# Yahtzee para 2 Jugadores

Implementacion funcional del juego clasico de Yahtzee para exactamente 2 jugadores, construida con `HTML`, `CSS` y `JavaScript` sin dependencias externas.

- Estructura facil de navegar y mantener.
- Interfaz simple, limpia y funcional.

## Caracteristicas

- Partida para exactamente `2 jugadores`.
- Turnos alternados entre ambos jugadores.
- Hasta `3 lanzamientos` por turno.
- Posibilidad de conservar dados entre lanzamientos.
- `5 dados` convencionales de `6 caras` con probabilidad uniforme.
- Registro de puntaje por categoria.
- Cada categoria solo puede usarse `una vez por jugador`.
- Tabla de puntajes visible en todo momento.
- Resultado final con ganador o empate.
- Animacion visual de lanzamiento en los dados.

## Categorias implementadas

- Unos
- Doses
- Treses
- Cuatros
- Cincos
- Seises
- Tres iguales
- Cuatro iguales
- Full House
- Escalera pequena
- Escalera grande
- Yahtzee
- Chance

## Reglas de puntuacion

- Categorias numericas:
  Suman solo los dados que coinciden con el numero de la categoria.
- Tres iguales:
  Si al menos 3 dados tienen el mismo valor, suma todos los dados.
- Cuatro iguales:
  Si al menos 4 dados tienen el mismo valor, suma todos los dados.
- Full House:
  Vale `25` puntos.
- Escalera pequena:
  Vale `30` puntos.
- Escalera grande:
  Vale `40` puntos.
- Yahtzee:
  Vale `50` puntos.
- Chance:
  Suma todos los dados.
- Si la condicion no se cumple:
  El puntaje registrado es `0`.

## Tecnologias usadas

- `HTML5`
- `CSS3`
- `JavaScript` en navegador

No requiere `Node.js`, `npm` ni frameworks para ejecutarse como usuario final.

## Como ejecutar el proyecto

### Opcion 1: abrir directamente en el navegador

1. Abre el archivo [index.html](./index.html).
2. Juega directamente desde el navegador.

### Opcion 2: usar un servidor local

Esta opcion puede ser util si tu navegador aplica restricciones sobre archivos locales.

Con Python:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Como jugar

1. El jugador actual aparece en la parte superior del panel principal.
2. Presiona `Lanzar dados` para hacer el primer lanzamiento.
3. Si quieres conservar algunos dados, haz clic sobre ellos.
4. Vuelve a lanzar los dados no conservados hasta completar un maximo de 3 lanzamientos.
5. Selecciona una categoria disponible para registrar el puntaje del turno.
6. El turno pasa automaticamente al siguiente jugador.
7. La partida termina cuando ambos jugadores usan todas sus categorias.
8. El sistema muestra el puntaje total y anuncia al ganador o empate.

## Estructura del proyecto

```text
TAREA SIMULACION/
|-- index.html
|-- README.md
|-- assets/
|   `-- styles/
|       `-- main.css
`-- src/
    |-- app/
    |   `-- bootstrap.js
    |-- config/
    |   `-- categories.js
    |-- domain/
    |   |-- entities/
    |   |   `-- Player.js
    |   |-- models/
    |   |   `-- YahtzeeGame.js
    |   `-- services/
    |       |-- DiceRoller.js
    |       `-- ScoreCalculator.js
    |-- shared/
    |   `-- namespace.js
    `-- ui/
        |-- components/
        |   `-- YahtzeeUI.js
        `-- renderers/
            `-- DiceFaceRenderer.js
```

## Arquitectura

El proyecto esta organizado por responsabilidades para que cada parte tenga un objetivo claro.

### `index.html`

Define la estructura base de la pagina y carga los scripts de la aplicacion en orden.

### `assets/styles/main.css`

Contiene todos los estilos visuales:

- Layout general
- Paneles
- Tabla de puntajes
- Dados
- Animacion de lanzamiento
- Responsive basico

### `src/shared/namespace.js`

Crea un espacio comun `window.YahtzeeApp` para registrar modulos sin depender de bundlers ni imports ESModules.

### `src/config/categories.js`

Centraliza la configuracion de las categorias del juego:

- clave interna
- nombre visible
- tipo de categoria
- valor objetivo cuando aplica

### `src/domain/entities/Player.js`

Representa a un jugador y encapsula el manejo de su tarjeta de puntajes:

- crear tarjeta vacia
- reiniciar categorias
- registrar puntajes
- calcular total
- validar si termino todas sus categorias

### `src/domain/services/ScoreCalculator.js`

Servicio responsable exclusivamente de calcular los puntos de una categoria segun el estado actual de los dados.

### `src/domain/services/DiceRoller.js`

Servicio pequeno y aislado para generar valores aleatorios de dados con distribucion uniforme entre `1` y `6`.

### `src/domain/models/YahtzeeGame.js`

Es el nucleo del juego. Administra:

- jugadores
- turno actual
- dados
- cantidad de lanzamientos
- reglas de seleccion de categorias
- avance del juego
- deteccion de fin de partida
- determinacion del ganador

### `src/ui/renderers/DiceFaceRenderer.js`

Se encarga de transformar el valor numerico de un dado en su representacion visual con puntos.

### `src/ui/components/YahtzeeUI.js`

Controla la interfaz de usuario:

- lectura de elementos del DOM
- eventos de botones
- render de dados
- render de categorias
- render de puntajes
- render del resultado final
- animacion de lanzamiento

### `src/app/bootstrap.js`

Compone la aplicacion:

- crea servicios
- crea el modelo del juego
- crea la UI
- inicializa la partida cuando el DOM esta listo

## Flujo general de la aplicacion

1. `bootstrap.js` inicia la app.
2. Se cargan las categorias configuradas.
3. Se instancian `ScoreCalculator` y `DiceRoller`.
4. Se crea `YahtzeeGame` con sus dependencias.
5. Se crea `YahtzeeUI`.
6. La UI escucha eventos y renderiza el estado del juego.
7. Cada accion del usuario actualiza el modelo y luego refresca la vista.

## Principios de Clean Code y SOLID aplicados

### Responsabilidad unica

Cada clase o archivo cumple una sola funcion principal:

- `Player` administra datos del jugador.
- `ScoreCalculator` calcula puntajes.
- `DiceRoller` lanza dados.
- `YahtzeeGame` administra las reglas del juego.
- `YahtzeeUI` dibuja y coordina la interfaz.

### Separacion de responsabilidades

La logica del juego no esta mezclada con estilos ni con manipulación visual del DOM.

### Inyeccion de dependencias

`YahtzeeGame` no crea internamente el calculador de puntaje ni el lanzador de dados; los recibe desde `bootstrap.js`. Esto reduce acoplamiento y facilita cambios futuros.

### Bajo acoplamiento

La UI consume el estado del juego, pero no implementa reglas de puntuacion ni decide la logica del dominio.

### Alta cohesion

Los archivos relacionados entre si estan agrupados por capa y por rol.

### Facilidad de extension

Si en el futuro quieres:

- agregar nuevas categorias
- cambiar la forma de puntuar
- mejorar la interfaz
- reemplazar la animacion de dados

puedes hacerlo tocando archivos concretos sin reescribir toda la aplicacion.

## Posibles mejoras futuras

- Soporte para bonus de la seccion superior.
- Nombres personalizados para jugadores.
- Persistencia de partida.
- Separacion adicional en componentes UI mas pequenos.
- Tests unitarios para `ScoreCalculator` y `YahtzeeGame`.
- Empaquetado con modulos ES o bundler si el proyecto crece.

## Notas de mantenimiento

- Si deseas modificar categorias, empieza por [categories.js](./src/config/categories.js).
- Si deseas cambiar reglas de puntuacion, revisa [ScoreCalculator.js](./src/domain/services/ScoreCalculator.js).
- Si deseas cambiar turnos o flujo del juego, revisa [YahtzeeGame.js](./src/domain/models/YahtzeeGame.js).
- Si deseas cambiar la apariencia o animacion de los dados, revisa [main.css](./assets/styles/main.css) y [DiceFaceRenderer.js](./src/ui/renderers/DiceFaceRenderer.js).
- Si deseas cambiar interacciones visuales, revisa [YahtzeeUI.js](./src/ui/components/YahtzeeUI.js).

## Estado actual

El proyecto se encuentra funcional para el alcance solicitado:

- implementacion jugable
- interfaz clara
- puntajes correctos segun las reglas definidas
- estructura organizada

## Autor

Proyecto desarrollado como implementacion funcional academica del juego Yahtzee para 2 jugadores.
