import { fromEvent, concat, of } from "rxjs"
import { switchMap, share, map } from "rxjs/operators"
import { ajax } from "rxjs/ajax"

const app = document.querySelector("#app")

//create buttons
;[1, 2, 3, 4, 5]
  .map(i => {
    const button = document.createElement("button")
    button.innerText = i

    return button
  })
  .forEach(button => {
    app.appendChild(button)
  })

//create text
const input = document.createElement("input")
input.type = "text"
input.id = "character"
app.appendChild(input)

const click = fromEvent(document.querySelectorAll("button"), "click").pipe(
  share()
)

const createUrlById = id =>
  `https://starwars.egghead.training/people/${id}?delay=1000`

const character = click.pipe(
  switchMap(event => {
    const url = createUrlById(event.target.innerText)

    return concat(
      of({ name: "Loading..." }),
      ajax(url).pipe(map(ajaxResponse => ajaxResponse.response))
    )
  })
)

character.subscribe(response => {
  input.value = response.name
})
