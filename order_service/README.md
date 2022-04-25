dotenv - to provide configuration for prod, dev, testing environment
nodemon - restart server.js whenever the files are change
mongoose - mongodb orm

services - to have business logic (BL), database interactions
routes - to have routes/path to controller
controllers - to have logic specific to request/response (http),
              use services for BL


.env file content

```
IP_ADDRESS=0.0.0.0
PORT=8080
MONGO_SERVER=
MONGO_DATABASE=
MONGO_USERNAME=
MONGO_PASSWORD=
RABBIT_MQ_URL=amqps://username:password@lionfish.rmq.cloudamqp.com/yourqueue
REDIS_HOST=xyx.ap-southeast-1-1.ec2.cloud.redislabs.com:16952
REDIS_PASSWORD=password
REDIS_USERNAME=admin
```

## Points to take care

```

1. POST/PUT - creation/updation purpose - validate input parameters
                    Joi / express validator  [npm install joi]
                    must be done at controller level

1.1 With controllers, use proper error handling 
    1. if the restaurent_id not found, it should return 404 error 
    2. if the restaurent_id present, 200 ok with json 
    3. if any server error, return 5xx  [middleware, differ for a while]
    4. if the parameter from client is not valid one, [400 bad request]

2. Models 
        Restaurent model 
            explore yourself
        Menu model 
            _id - default in mongo db
            name/title 
            price
            category : veg/non-veg 
            cusion: north/south
            restaurent_id

        either can be separate collection or sub documents
        Mongoose relations populate func



3. Swagger for testing purpose

4. For Microservices, the code base should be indepenent
    each project should be indepenently modified, distributed, deployed

projects
    restaurents 
        package.json
        app 
            ...

    order
        package.json
        app 
            ....
    
    reviews
        package.json 
        app
            ....
```

```
Reviews
    reviews
    ratings 
        calculation 

    need restarent_id [post method]
    
    Inter process communication 
        Micro Service to Micro Services

        REST API call to restuarent service from review service 
            check restuarent exist or not

        RabbitMQ

```

# RabbitMQ

https://www.cloudamqp.com/

```
npm install amqplib
```


# Swagger

Swagger API documentation tool, useful for testing, validation etc


demo editor here https://editor.swagger.io/


```
npm i swagger-ui-express
npm install --save yamljs

npm install mocha
npm install chai
npm install sinon


```

refer app/index.js file and yaml file example

in browser,

http://localhost:8080/api-docs

# Model examples only

## Restaurant

```
Restaurant model
     _id : ObjectId 
     name :string
     city: string
     state: string,
     cusine: string,
     avg_rating: number
     total_reviews: number
     locations: [10,2,45.67]
     created_at: datetime
     updated_at: datetime
```

```
Menu model [either sub-documents or separate collection up to you]
       _id : ObjectId 
       name :string
       category: string [veg|non-veg]
       price: number
       restaurant_id
        created_at: datetime
        updated_at: datetime
```

# Customer Service
```
    customer model

        _id
        email
        full_name 
        hashed_password
        created_at: datetime
        updated_at: datetime
```

## review model

```

reviews

    model 
        _id : ObjectId 
        restaurant_id: ObjectId
        customer_id: ObjectId
        description : string 
        rating: number
        created_at: datetime
        updated_at: datetime
```


## Order Service /PostgreSQL/MongoDB
```
    model 
        _id/id 
        customer_id
        restaurant_id
        amount: number,
        items: JSON String or Nested Array of Object
        created_at: datetime
        updated_at: datetime

```

```
items is sub collection or json array

items : [
    {menu_id, restaurant_id, qty, price}
]


where as amount is sum of each item qty * price by node.js
```


# review service

```
.post(/reviews) { 
    .....
    ....
    
}
.put
.delete

review.service.js 

    create_review: (......) => {
        ....
        ..
        this.calculate_avg_rating(restuarent_id)
    }
    update_review: (......) => {
        ....
        ..
        this.calculate_avg_rating(restuarent_id)
    }
    
    delete_review: (......) => {
        ....
        ..
        this.calculate_avg_rating(restuarent_id)
    }
    
    calculate_avg_rating: (restuarent_id) => {
        use mongo db to calculate avg and total count of reviews based restuarent_id [aggregate query]

        after avg rating and total reviews,

        publish the  avg rating and total reviews on rabbit mq
    }
```

## On Restaurant side service

the susbcriber  can run indepedent, use service to update restaurant data


## Redis Cache

```
https://www.npmjs.com/package/redis

for free redis cluster

https://redis.com/try-free/

API to use cache in Restaurant service

implement an API with GET method

GET /restaurants/complete/<<restid>>


Use Set via node.js 

the key is Restaurant id, value result json /not valid json here(beware)

 SET "4343223423423423" "{restaurent: {}, reviews:[...], menus: [...]}"


 DEL "4343223423423423"


 GET "4343223423423423"

```


# PM2

open command as administrator

```
npm install pm2 -g
```

create ecosystem.config.js

```
pm2 start ecosystem.config.js
```

susbcribe-review is one of the service mentioned in ecosystem.config.js

```
 pm2 restart susbcribe-review
```


https://pm2.keymetrics.io/docs/usage/process-management/

For Logs refer https://pm2.keymetrics.io/docs/usage/log-management/

