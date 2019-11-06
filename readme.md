# Gympoint Project
> Challenge 02 - goStack 9.0

A simple project about how we use Node to create an struct using MVC concept and many packages too.

## Steps

#### Resolve dependencies

```powershell
yarn
```

#### Create a container

Create a container on Docker (first, make sure the Docker is active):

```powershell
docker run --name gymdb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```

The command above it's an example how you can create a container, in my case, I created with a simple password and enforced the port and version of the postGres

#### Check the containers

Now, if all went well, execute the command below to see the container:
```powershell
docker ps
```

#### Append the migration to db
```powershell
yarn sequelize db:migrate:all
```

## Testing

Below, have the example of use in Insomnia

### Session
> Method POST Create Session
###### This method is used to create a session with passing access credentials.
```sh
curl --request POST \
  --url http://localhost:3333/sessions \
  --header 'content-type: application/json' \
  --data '{
	"email": "admin@gympoint.com",
	"password" : "123456"
}'
```

### Student
> Method POST Create Student
```sh
curl --request POST \
  --url http://localhost:3333/students \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxMjgzOTE4LCJleHAiOjE1NzE4ODg3MTh9.Q15rR2rPPqecQcNIiQxaajAD3Lap0nf4S7-T8sZQjyU' \
  --header 'content-type: application/json' \
  --data '{
	"name": "Ciro Bizelli",
	"email": "bzll926@gmail.com",
	"age": 28,
	"weight": 187,
	"height": 104
}'
```


> Method PUT Update Student
```sh
curl --request PUT \
  --url http://localhost:3333/students \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcxMjgzOTE4LCJleHAiOjE1NzE4ODg3MTh9.Q15rR2rPPqecQcNIiQxaajAD3Lap0nf4S7-T8sZQjyU' \
  --header 'content-type: application/json' \
  --data '{
	"email": "bzll926@gmail.com",
	"height": 113
}'
```
