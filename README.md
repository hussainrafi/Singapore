## Idræts-booking-system

### Beskrivelse
Dette er et bookingsystem til forskellige idrætsforeninger, for at undgå forvirring om, hvem der har hvilken hal. Mange foreninger bruger de samme faciliteter, men de snakker ikke sammen, og der kan derfor opstå forvirring om, hvem der har hvilken hal og hvornår de har det. De store arenaer kan de også have store arrangementer i længere tid, der gør, at foreninger ikke kan træne som normalt, og skal derfor finde en anden hal at træne i. Denne platform skal gøre dette lettere for foreningerne. Her kan alle undervisere i de forskellige foreninger lave en bruger, hvor de kan oprette et hold, der kan meldes på de forskellige haller i en given arena eller anden træningsfacilitet. Vi tager udgangspunkt i én arena, men platformen ville sagtens kunne udvides, så alle træningshaller i Danmark ville blive vist. Man vælger blot en arena i starten af siden. Hvis der så ikke var plads i ens lokale arena, så ville foreningerne kunne se, hvor der var nogen andre ledige haller. Når underviseren har lavet en bruger, vil han/hun skulle vælge sit hold og hvilket tidsrum, som de vil træne i, og vælger derefter hvilken hal han/hun kunne tænke sig. Da det er mange forskellige foreninger, der kan lave en bruger på vores platform, skal de også bruge forskelligt udstyr til den sportsgren de nu dyrker, f.eks. håndbolde, gymnastikredskaber, hockeystave mv. Om den given hal har de rette redskaber, vil blive vist når man skal booke en hal. Derudover vil der også blive vist kapacitet, så underviseren ved hvor mange elever, der er plads til. Når underviseren har tilknyttet et givent hold til en træningssession, vil den blive vist på gymnastens side, der er tilknyttet samme hold. Gymnaster/forældre vil også kunne lave en bruger, hvor de vælger de hold, som de er tilknyttet. Når de logger ind, vil de kun kunne se deres egne træningssessioner, hvor de kan se dato, tid og hvor de skal træne den pågældende uge. 
#### Aktører
- Trænere
- Elever

#### Trænere
- Skal have tilknyttet et navn og et efternavn
- Skal have administrator login
- Skal kunne oprette et nyt hold
- Skal kunne annullere et hold
- Skal kunne slette en elev fra en træningssession
- Skal kunne se antal personer på sit/sine hold
- Skal kunne se ledige lokaler med plads til sit hold
- Skal være tilknyttet en sportsgren og et tilhørende niveau
- Skal kunne tilføje og slette en elev fra en sportsgren

#### Elever
- Skal have tilknyttet et navn og et efternavn
- Skal have elev login
- Skal kunne afmelde sig fra et hold
- Skal være tilknyttet en eller flere sportsgrene og tilhørende niveau
- Skal kunne slette sin bruger

#### Funktioner
- login() <br>
Logger brugeren ind. Eksekveres når der trykkes på “Login” på forsiden, og fungerer på følgende måde:
   - Henter det indtastede brugernavn og adgangskode.
   - Looper igennem alle registrerede brugere, og sammenligner det indtastede brugernavn og adgangskode, med hver bruger. 
        - hvis der er ikke er et match, alertes der: "Brugernavn eller adgangskode findes ikke"
   - Når der er et match, checkes der om brugeren er en elev eller en coach med administratorrettigheder. Brugeren viderestilles efter dette, til enten elev- eller coachforsiden.
   - Objektet for den bruger, som er logget ind, gemmes i localStorage under nøglen “loggedIn”

- logOut() <br>
Logger brugeren ud. Eksekveres når der trykkes på “Log ud”, og fungerer på følgende måde:
    - Sletter det objekt som er gemt i localStorage under nøglen “loggedIn” 

- newUser() <br>
Opretter en ny bruger. Eksekveres når der trykkes på “Opret” på undersiden “Opret ny bruger. Fungerer på følgende måde:
    - Det indtastede data bliver hentet.
        - brugernavnet bliver sammenlignet med alle gemte brugere, og alerter “Dette brugernavn er allerede i brug”, hvis der er et match.
    - Checker om den nye bruger skal være en elev eller en coach
    - Checker hvilket hold den nye bruger skal tilmeldes
    - Opretter et unikt coach- eller elev-id (afhængigt af brugertypen) og opretter en ny coach/elev, med de indtastede værdier og det unikke id nummer, som alt sammen gemmes i et objekt.
    - Det nye objekt tilføjes til brugerlisten, og listen gemmes påny i localStorage under nøglen “User”.
 
- newSession()
 
- checkSession()
    - Eleven/træner skal kunne se en samlet oversigt over personlig bookinger.

- studentRemoveSession()
    - Eleven afmelder kun sig selv fra en session.
    
- editSession()
    - Træneren skal kunne ændre holdlister, niveau og sportsgrene på bookinger.

- removeSession()
    - Træner sletter en session.

- deleteUser()
    - Fjerner en bruger fra en træningssession

- showAvailability()
    - Lokalets status bliver vist (optaget = rød / ledigt = grøn).

### UML
![UML](/pictures/UML.png)