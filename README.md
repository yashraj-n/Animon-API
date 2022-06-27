<p align="center">
 <img width="100px" src="https://i.pinimg.com/originals/5c/70/34/5c70345850ac84c115e866867816d5c8.png" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">Animon-API</h2>
 <p align="center">A Simple API for getting anime details</p>
</p>

## Features

- Made in [Fastify](https://www.fastify.io/ "Fastify")
- Caches anime data for better perfomance and speed
- Automatic genrated documentation using [Fastify Swagger](https://github.com/fastify/fastify-swagger "Fastify Swagger")
- Much More...

### How This works

Animon-Api uses [Cheerio](https://www.npmjs.com/package/cheerio "Cheerio") to scrape data from [GoGoAnime](https://ww1.gogoanime2.org/). It parses that data into JSON and returns it using REST API.

Also, API caches most of the data in Redis DB to make API faster

### Endpoints

##### / Route

```bash
GET /

Response:
{
	"message": "API Working!!!"
}
```

##### **/documentation** Documentation

Visit [localhost:3000/documentation](http://localhost:3000/documentation "localhost:3000/documentation") for Swagger Documentation

##### **/api/anime/data** Get Anime Data using ID

```bash
POST /api/anime/data
{
id: <Anime ID>
}

Response:
{
"error":<boolean>,
"message":<string>,
"data":	{
	"image":<string>,
	"title":<string>,
	"type":<string>,
	"desc":<string>,
	"genre":<string>
	"status": <string>,
	"othername": <string>,
	"episodes": {
	 	"name": <string>,
		"string": <string>
		}
	}
}
```

##### **/api/latest** Get Latest Anime data

```bash
GET /api/latest

Response:
{
	"error":<boolean>,
	"message":<string>,
	"data":[
		{
			"title":<string>,
			"image":<string>,
			"released":<string>,
			"id":<string>
		}

}
```

##### **/api/popular** Get Latest Popular Anime data

```bash
GET /api/popular

Response:
{
	"error":<boolean>,
	"message":<string>,
	"data":[
		{
			"title":<string>,
			"image":<string>,
			"released":<string>,
			"id":<string>
		}
	]
}
```

##### **/api/stream/** Get HLS streaming link

```bash
POST /api/stream/
{
"id":<string>,
"ep":<string>
}

Response:
{
	"error":<boolean>,
	"message":<string>,
	"data":<string>, # iframe src link
	"android":<string> # HLS Playlist link
}
```

##### **/api/search/** Get HLS streaming link

```bash
POST /api/search
{
	"search":<string>
}

Response:
{
	"error":<boolean>,
	"message":<string>,
	"data":[
		{
			"title":<string>,
			"image":<string>,
			"released":<string>,
			"id":<string>
		}
	]
}
```

### Setup

#### Requirements

Download and Install Redis DB from [here](https://redis.io/ "Redis Download Link").

Make sure you have node.js version >= 14

### Installation

Install Typescript Compiler (tsc) globally

for npm

```bash
npm i -g tsc
```

for yarn

```bash
yarn global add typescript
```

Clone the repo

```bash
git clone https://github.com/yashraj-n/Animon-API
```

Change Directory

```bash
cd Animon-API
```

Install Typescript

for npm

```bash
npm i -D typescript
```

for yarn

```bash
yarn add typescript -D
```

#### Run the server locally

Make sure you have redis server running locally

Change your Redis Credentials in /src/utils/redisDB.ts

Run `yarn start` or `npm start` to start the server locally on [port 3000](http://localhost:3000 "Animon-Api")

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
