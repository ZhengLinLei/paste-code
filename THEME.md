You can edit your own theme colors with [Theme Creator](https://zhenglinlei.github.io/paste-code/#XQAAAQCrAwAAAAAAAAAtiIH4IScciVCIxgJWk5pn8596LKbqdN2BjR/xEcSv2jNtePyciIDY6oe8zI6yhK2pYd45keVTbHGeG70/7e0Nu+KankB4R01bhyGEk4KN2fsL7vdepc+kBZJ6gfE6yPTSHG8wuaB6LAukddsWIgeUQ3bghXjcleN2HNR0M1zVgCkwOAcdIQCl2eqaaBBj8lJ75dwlZfwJPLuIcTbqv9r1YLaWruhsYb0espZCJLbNQAnyqRd9scyz/XuRNC1+fgBodWF5TrkHg7K/vvPz4uXdfZ9HkohYVLvGL7ZKM4BlxEAGnruWUWVr3bu2T/+ikvvPX5Au13qYrutL9dkUy419z62DHwWSal8utz+iFWwyVrmWDo3DiFS4xX+wNVHctJqOnjeVUsb6Z+ezLX3N9acY9wh5bP51FB72Depm2AN7laakVz3npFollBhkHnfRFdqThGmaliCuwGgf0vRtauGKMyEUOAdyFaFvdqSGY47F7Jb2gk/LomWQ5F0fulDKfBOxQLnIDFYlx663EugRCKIaYB3/dGl6RybzZ0/04aKU6JgbYP/m5OXq)


```js
/*
    Edit the JSON below
*/
let SS = 
`
{
     "--theme-bg-color": "#294936",
     "--theme-primary-color": "#212922",
     "--theme-secondary-color": "#294936",
     "--theme-color-muted": "#5B8266",
     "--theme-text-color": "#fff",
     "--theme-extra-color": "#000",
     "--theme-border-color": "rgba(174, 246, 199, 1)",
     "--theme-caret-color": "#cc99cd",
     "--theme-alert-color": "rgba(255, 255, 255, 0.8)",
     "--theme-cristal-color": "rgba(0, 0, 0, 0.3)",
     "--theme-footer-color": "rgba(255, 255, 255, 0.8)",
     "class": "night"
}
`;

/*
    Inner code to import colors
*/

let parse = JSON.parse(SS);
    
for(let i in parse) {
    document.body.style.setProperty(i, parse[i]);
}

document.body.removeAttribute('class');
document.body.classList.add(parse.class);

// Now run "run 0"
// Now run "theme export"


```