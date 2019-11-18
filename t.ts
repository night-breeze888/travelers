import { number, func } from "joi"

// import chalk from 'chalk';

// import * as joi from "joi";

// let a = joi.optional()
// joi.validate(123, a).then(res => {
//      console.log(res)
// }).catch(e => {
//      console.log(e)
//  })


declare global{
      namespace A {
          interface C{
               b: {
                    a:number
               }
          }
     }
}



// try {
//      a["a"]["a"]
// } catch (error) {
//      console.log(error)
// }

function name(a) {
     console.log(arguments[0])
     Object.keys(arguments)
}

name({ a: 123, b: 123 })
let a = 'aa'
     let bbbb = 'aaaa'
    console.log(bbbb,bbbb.replace(a,''),bbbb) 

// declare  namespace A {
//      interface C{
//           a:number
//      }
// }









