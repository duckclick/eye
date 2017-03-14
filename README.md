# Eye

## Dev extension

1) open Chrome and go to chrome://chrome/extensions/
2) enable "Developer mode"
3) click "Load unpacked extension"
4) select "./extension" directory

## Serve assets locally over HTTP

```sh
yarn install
yarn run build
python -m SimpleHTTPServer 7272
```

## Serve assets locally over HTTPS

```sh
yarn install
yarn run build
yarn start
```

`https://localhost:7272/dist/duckclick.eye.js`

## Build an image with docker

```sh
docker build -t eye .
```

## Run a docker container

```sh
docker run --rm -t -p 7272:7272 -e "WING_HOST=http://localhost:7273" eye
```

## Extension icons

Duck by ProSymbols from the Noun Project
https://thenounproject.com/prosymbols/collection/baby-and-kids-icons-set/?i=590683
