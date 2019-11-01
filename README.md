## Idræts-booking-system

### Beskrivelse
Dette er et bookingsystem til forskellige idrætsforeninger, for at undgå forvirring om, hvem der har hvilken hal. Mange foreninger bruger de samme faciliteter, men de snakker ikke sammen, og der kan derfor opstå forvirring om, hvem der har hvilken hal, og hvornår de har den. Denne platform skal gøre dette lettere for foreningerne. Her kan alle coaches i de forskellige foreninger lave brugere til deres elever. Når en elev oprettes, tilknyttes elevens tilmeldte sportsgrene. Når coachen vil oprette en træningssession, vælges en hal/arena/bane og et hold. Coachen kan kun oprette sessionen, hvis lokalet faktisk egner sig til den valgte sportsgren (en svømmehal kan eks. ikke bookes til et fodboldhold), hvis lokalet er ledig og hvis der er plads nok. Derudover kan en coach også kun oprette sessioner for de hold, som coachen faktisk underviser. Når coachen har tilknyttet et givent hold til en træningssession, vil den kunne ses for de elever, der er tilknyttet det hold. Vi tager udgangspunkt i én fiktiv forening, men platformen ville sagtens kunne bruges af en virkelig forening. 
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
    - Træneren kan tilføje en session og lokalet vil derefter blive vist som booket og optaget.
    - Vi laver en function kaldet newSession(), hvor vi vil kunne tilføje sessioner
        - Brugeren der er logget ind bliver hentet fra local storage
    - Vi opstiller et tomt array, hvor vi pusher coachens respektive sportsgrene ind igennem et for loop.
    - Vi looper igennem alle brugere og pusher dem til “users”
    - Vi laver en tom variabel kaldet currentSport. Vi looper herefter igennem hvilke ting der er krydset af i vores HTML dokument og pusher dem til den tomme currentSport.
    - Vi opstiller en boolean variabel “sportsMatchCoach” der som udgangspunkt er false. 
    - Herefter looper vi igennem coachSports for at finde ud af om den stemmer med currentSport. Hvis dette er tilfældet redefinerer vi vores sportMatchCoach til “true”, hvis ikke dette er tilfældet og den er false udløses alerten “Du underviser ikke dette hold”.
    - Vi gør præcist det samme blot for facilitySport, hvor vi sammenligner den valgte sportsgren med faciliteten og antal users der er tilmeldt sportsgrenen. Hvis dette ikke matcher kommer der en alert der viser antal elever på holdet i forhold til kapaciteten på faciliteten.
    - Til sidst, hvis alt stemmer, oprettes en ny instance af klassen session (se fil Session.js), som tager coachens username, de tilmeldte brugere og valgte sport, som parametre.

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