
FROM ethereum/client-go:stable

RUN mkdir -p /usr/share/workdir/geth

WORKDIR /usr/share/workdir/geth

COPY . .

RUN rm -r ./data/geth

RUN geth --datadir data init genesis.json

