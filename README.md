# Tasks

## Run an application using Docker
```bash
# Clone the repository
git clone git@github.com:erotourtes/React-App-2.git && cd React-App-2

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

## Testing
### Nest integration tests
```bash
# Setup test database
docker compose --file ./docker-compose.test.yml up --build

npm run test:e2e --prefix backend
```

### React unit tests
```bash
npm test --prefix frontend
```

## Storybook
```bash
npm run storybook --prefix frontend
```
