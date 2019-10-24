


let fs = require('fs');
let yaml = require('js-yaml');
let apis = fs.readdirSync('./server/apis');

// console.log(apis)

let conf = global.config.swagger
// {
//     swagger: '2.0',
//     info: {
//         title: '投票系统接口文档',
//         description: '投票系统',
//         version: '1.0.0'
//     },
//     host: '127.0.0.1:3000',
//     basePath: '/v1',
//     schemes: ['http', 'https'],
//     produces: ['application/json'],
//     paths: {}
// }

for (let i = 0; i < apis.length; i++) {

    if (~apis[i].indexOf('.js')) {
        apis[i] = apis[i].split('.')[0]
        let api_path = require(`../apis/${apis[i]}`)

        for (let j in api_path) {

            if(typeof conf.paths[`/${apis[i]}${api_path[j].path}`] != 'object')  conf.paths[`/${apis[i]}${api_path[j].path}`]= {}
            
            conf.paths[`/${apis[i]}${api_path[j].path}`][`${api_path[j].method}`] = {
                summary: api_path[j].summary,
                description: api_path[j].description,
                tags: [api_path[j].tags],
                parameters: api_path[j].parameters,
                responses:api_path[j].responses
            }

        }

    }
}

try {
    //   var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
    // var doc = yaml.safeLoad(fs.readFileSync('./swagger/swagger.yaml', 'utf8'));

    fs.writeFileSync('./swagger/swagger.yaml', yaml.dump(conf), 'utf8');

} catch (e) {
    console.log(e);
}




