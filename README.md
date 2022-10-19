# Bienvenido a mi Training CDK

# 1) cambiar el account-id
    cdk.json/content/account-id

# 2) cambiar el profile en package.json

# 3) npm i && npm i -d


## Lista de Comandos

* `npm run deploy`                  despliega la aplicacion
* `npm run deployLambda`            despliega solo los lambdas
* `npm run destroy`                 elimina la aplicacion , sin remover datos sencibles "s3,dynamoDB-table etc"
* `cdk diff`                        compara antiguo stack con el actual

## ejemplo 

* `npm run build -- -c env=test`    despliega la aplicacion con el sufijo test. 
nota: variable "env" obligatoria
 
