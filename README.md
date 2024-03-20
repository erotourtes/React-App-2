# Tasks
> [!NOTE]
> I noticed that the free hosting service might not save history or it takes a while to show up.
> I rely on database events, and I guess it doesn't have much time and resources to process.
> Therefore, using [Docker](#run-an-application-using-docker) is recommended.

## Run an application using Docker
```bash
# Clone the repository
git clone git@github.com:erotourtes/React-App.git && cd React-App

docker compose up --build
```
Open [http://localhost:8080/React-App/](http://localhost:8080/React-App/) in your browser.

## Installation
```bash
git clone git@github.com:erotourtes/React-App.git && cd React-App

npm install
```

## Development mode
```bash
# Setup database
docker compose up --build db

# Build shared packages first
npx turbo run build --filter="@packages/types" && npm start
```
