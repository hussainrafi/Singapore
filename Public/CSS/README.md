## Booking System til Idrætsforeninger

### Beskrivelse
Dette er et bookingsystem til forskellige idrætsforeninger, for at undgå forvirring om, hvem der har hvilken hal. Mange foreninger bruger de samme faciliteter, men de snakker ikke sammen, og der kan derfor opstå forvirring om, hvem der har hvilken hal, og hvornår de har den. Denne platform skal gøre dette lettere for foreningerne. Her kan alle coaches i de forskellige foreninger lave brugere til deres elever. Når en elev oprettes, tilknyttes elevens tilmeldte sportsgrene. Når coachen vil oprette en træningssession, vælges en hal/arena/bane og et hold. Coachen kan kun oprette sessionen, hvis lokalet faktisk egner sig til den valgte sportsgren (en svømmehal kan eks. ikke bookes til et fodboldhold), hvis lokalet er ledig og hvis der er plads nok. Derudover kan en coach også kun oprette sessioner for de hold, som coachen faktisk underviser. Når coachen har tilknyttet et givent hold til en træningssession, vil den kunne ses for de elever, der er tilknyttet det hold. Vi tager udgangspunkt i én fiktiv forening, men platformen ville sagtens kunne bruges af en virkelig forening. 
#### Aktører
- Trænere
- Elever

#### Coach
- Skal have tilknyttet et fornavn, efternavn, brugernavn og password
- Skal have et eller flere hold tilknyttet, som coachen underviser
- Skal have et administrator login
- Skal kunne tilføje og slette en elev
- Skal kunne oprette en ny session, hvis der er plads, tid og udstyr, til det valgte hold 
- Skal kunne redigere en session
- Skal kunne slette en session

#### Elev
- Skal have tilknyttet et fornavn, efternavn, brugernavn og password
- Skal være tilmeldt et eller flere hold
- Skal have et elev login
- Skal kunne afmelde sig fra et hold

#### Funktioner
- login() <br>
Logger brugeren ind. Eksekveres når der trykkes på “Login” på forsiden, og fungerer på følgende måde:
   - Henter det indtastede brugernavn og adgangskode.
   - Looper igennem alle registrerede brugere, og sammenligner det indtastede brugernavn og adgangskode, med hver bruger. 
        - hvis der er ikke er et match, alertes der: "Brugernavn eller adgangskode findes ikke"
   - Når der er et match, checkes der om brugeren er en elev eller en coach med administratorrettigheder. Brugeren viderestilles efter dette, til enten elev- eller coachforsiden.
   - Instansen for den bruger, som er logget ind, gemmes i localStorage under nøglen “loggedIn”

- logOut() <br>
Logger brugeren ud. Eksekveres når der trykkes på “Log ud”, og fungerer på følgende måde:
    - Sletter den instans som er gemt i localStorage under nøglen “loggedIn” 

- newUser() <br>
Opretter en ny bruger. Eksekveres når der trykkes på “Opret” på undersiden “Opret ny bruger. Fungerer på følgende måde:
    - Det indtastede data bliver hentet.
        - brugernavnet bliver sammenlignet med alle gemte brugere, og alerter “Dette brugernavn er allerede i brug”, hvis der er et match.
    - Checker om den nye bruger skal være en elev eller en coach
    - Checker hvilket hold den nye bruger skal tilmeldes
    - Opretter et unikt coach- eller elev-id (afhængigt af brugertypen) og opretter en ny coach/elev, med de indtastede værdier og det unikke id nummer, som alt sammen gemmes som en instans af Coach/Student klassen.
    - Den nye instans tilføjes til brugerlisten, og listen gemmes påny i localStorage under nøglen “User”.
 
- newSession()
    - Træneren kan tilføje en session og lokalet vil derefter blive vist som booket og optaget.
    - Vi laver en function kaldet newSession(), hvor vi vil kunne tilføje sessioner
        - Brugeren der er logget ind bliver hentet fra local storage
    - Vi opstiller et tomt array, hvor vi pusher coachens respektive sportsgrene ind igennem et for loop.
    - Vi henter den sport der er valgt, og gemmer informationen i currentSport
    - Vi opstiller en boolean variabel “sportsMatchCoach” der som udgangspunkt er false. 
    - Herefter looper vi igennem coachSports for at finde ud af om den stemmer med currentSport. Hvis dette er tilfældet redefinerer vi vores sportMatchCoach til “true”
        - Hvis ikke dette er tilfældet og den er false udløses alerten “Du underviser ikke dette hold”.
    - Vi looper igennem alle brugere og pusher dem til “users”
    - Vi henter den facility der er valgt, og gemmer informationen i facilitySport
    - Vi gør præcist det samme blot for facilitySport, hvor vi sammenligner den valgte sportsgren med faciliteten og antal users der er tilmeldt sportsgrenen.
        - Hvis dette ikke matcher kommer der en alert der viser antal elever på holdet i forhold til kapaciteten på faciliteten.
    - Vi henter den valgte dato og tider
    - Vi gemmer den ønskede start- og sluttid i variablerne startTimecode og endTimecode
    - Vi looper igennem de sessions der allerede er booket og pusher de sessioner, som foregår i den valgte facility, til sessionsCurrentFacility
    - Vi looper igennem sessionerne, som er gemt i sessionsCurrentFacility, og checker om der er et overlap med den valgte start- og sluttid (startTimecode og endTimecode).
        - Hvis der er et overlap alerters der "Overlappende sessioner""  
    - Til sidst, hvis alt stemmer, oprettes en ny instance af klassen session (se fil Session.js), som tager coachens username, de tilmeldte brugere, valgte sport, valgte facility og et tidsinterval som parametre.

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
    
#### Overvejelser/Ændringer
Vi bliver hurtigt klar over at localStorage fandtes, og vi har derfor valgt at gemme alle vores brugere, faciliteter og sessioner, i localStorage. På den måde har vi nu en ”database”, der gør det muligt at gemme vores nyoprettede brugere, faciliteter og sessioner, så de ikke bliver slettet, næste gang at siden bliver opdateret. Dertil gemmer vi også instansen af den bruger, som er logget ind, som slettes når der logges du. Vores brug af localStorage, er dog kun en midlertidig løsning, indtil vi lærer at bruge en faktisk database.
 
Vi har revurderet vores UML, men stadig holdt os tro til den oprindelige opbygning. I User-klassen, fandt vi hurtigt ud af, at vi skulle tilføje et brugernavn og en adgangskode, da dette var nødvendigt for at bygge en login-funktion. I Session-klassen valgte vi at tilføje ”students”, så vi kunne gemme alle tilmeldte elever i en oprettet session. Selvom at holdnavnet også er gemt i sessionen, og derved ville gøre det muligt at finde frem til eleverne, har vi valgt at tilføje students. Dette var med henblik på vores studentRemoveSession funktion, som gør det muligt for en elev at afmelde sig selv fra en session. Det virker umiddelbart enklere at fjerne en elev fra en session, end at skulle gemme alle afmeldte elever i localStorage, og derefter checke hvilke elever der ikke skal være med til en session, når det skal vises.
 
Vi har valgt at fjerne en række funktioner, da de endte med at være overflødige. Dette gælder showHallSport og showHallCapacity; en funktion der skulle vise hvilke sportsgrene der egner sig til hvilke faciliteter og en funktion der viser hvor meget plads der er i en facilitet. Dette er nu erstattet af tekst i HTML. showTeamDescription er også blevet fjernet. Den skulle vise holdets niveau og størrelse, hvilket vi nu har erstattet med en fejlmeddelelse, når man opretter en session, hvis niveau eller størrelse ikke passer til henholdsvis træneren eller faciliteten.
 
Slutteligt har vi valgt at ændre på mange af funktionernes navne. Dette er for at gøre det mere intuitivt, når man læser koden.


### UML
![UML](/Public/pictures/UML.png)

### Use Case Diagram
![UCD](/Public/pictures/UCD.png)