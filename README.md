# Kafka Demo
Dette er en komplett (lokal) demo av køteknologien Kafka. Demoen viser livssyklusen til en melding samt hvordan sette opp Kafka med diverse teknologier.


## Komponenter
Demoen består av tre komponenter som håndterer hele livsløpet til en melding.

### Webapp
Webappen tilbyr et typisk frontend brukergrensesnitt som er i stand til å sende meldinger på Kafka. 

For mer informasjon se [README](./webapp/README.md)

### Kafka
Infrastruktur for å håndtere Kafka-meldinger

For mer informasjon se [README](./kafka/README.md)

### Backend
En simpel backend-tjeneste som kan motta meldinger fra Kafka

For mer informasjon se [README](./backend/README.md)

## Påkrevde installasjoner for å bruke demoen
* Java 11  
* docker  
* npm  
* gradle