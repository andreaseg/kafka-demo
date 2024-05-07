# Backend tjeneste for å lese fra Kafka

Dette er et eksempel på en simpel backend-tjeneste som leser fra Kafka.

Tjenesten leverer et dashboard på http://localhost:8080 som viser alle meldinger den har mottatt.
Tjenesten har ingen form for permanent lagring, så ved omstart så vil alle meldinger forsvinne.
Dashboardet er satt opp slik at dette vil automatisk fornyes med meldinger lagret i backend-tjenesten.