import $ from 'jquery'
import velocity from 'velocity-animate'
import { greet } from './modules/greet'
import '../scss/style.scss'

console.log('load another.js')

$('body')
  .css('color', 'red')
  .append(`<p>${greet('Another')}</p>`)

velocity($('h1'), 'fadeIn', { duration: 2000, loop: true })
