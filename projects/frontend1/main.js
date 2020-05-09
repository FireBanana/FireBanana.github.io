document.addEventListener('DOMContentLoaded', run)
let isDark = false;

function run(e){

}

function themeClicked(){
   let elem = document.getElementsByClassName('selector')[0]

   if(!isDark){
    elem.classList.add('toggle')
    document.documentElement.style.setProperty('--backgroundColor', 'hsl(230, 17%, 14%)')
    document.documentElement.style.setProperty('--splashColor', 'hsl(232, 19%, 15%)')
    document.documentElement.style.setProperty('--cardColor', 'hsl(228, 28%, 20%)')
    document.documentElement.style.setProperty('--switchBackground', 'linear-gradient(to right, hsl(210, 78%, 56%), hsl(146, 68%, 55%))')
    document.documentElement.style.setProperty('--textColor', 'hsl(228, 34%, 66%)')
   }
   else{
    elem.classList.remove('toggle')
    document.documentElement.style.setProperty('--backgroundColor', 'white')
    document.documentElement.style.setProperty('--splashColor', 'hsl(225, 100%, 98%)')
    document.documentElement.style.setProperty('--cardColor', 'hsl(227, 47%, 96%)')
    document.documentElement.style.setProperty('--switchBackground', 'hsl(230, 22%, 74%)')
    document.documentElement.style.setProperty('--textColor', 'black')
   }

   isDark = !isDark
}