

// import a form 
import development from './development'
import production from './production'

let config = development

const env = `./${process.env.NODE_ENV || 'development'}`

if (env == "production") {
    config = production
}

export default config
