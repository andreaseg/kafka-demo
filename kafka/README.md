# Script for lokal Kafka instans
Confluent tilbyr en implementajson av Kafka, _confluent local_, som kan kjøres lokalt. `confluent.sh`
er et wrapper-script som håndterer oppsett og installasjon av dette.

Kafka dashboard er tilgjengelig på http://localhost:9021

For mer informasjon om bruk av confluent local se [lenke](https://docs.confluent.io/confluent-cli/current/command-reference/local/index.html#confluent-local).

## Krav
### Docker
Docker må være installert på systemet for at Confluent Local skal fungere.

### Java 11
Confluent krever Java 11, på mac kan dette enkelt installeres med brew
```sh
brew install java11 
````

## Bruk
Kafka kan startes med å kjøre 
```sh
./confluent.sh local services start
````
og stoppes ved å kjøre 
```sh
./confluent.sh local services stop
````
