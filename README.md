## Idræts-booking-system

### Beskrivelse
Dette er et bookingsystem til forskellige idrætsforeninger, for at undgå forvirring om, hvem der har hvilken hal. Mange foreninger bruger de samme faciliteter, men de snakker ikke sammen, og der kan derfor opstå forvirring om, hvem der har hvilken hal og hvornår de har det. De store arenaer kan de også have store arrangementer i længere tid, der gør foreninger ikke kan træne som normalt, og skal derfor finde en anden hal at træne i. Denne platform skal gøre dette lettere for foreningerne. Her kan alle undervisere i de forskellige foreninger lave en bruger, hvor de kan oprette et hold, der kan meldes på de forskellige haller i en given arena eller anden træningsfacilitet. Vi tager udgangspunkt i én arena, men platformen ville sagtens kunne udvides, så alle træningshaller i Danmark ville blive vist. Så vælger man blot vælger en arena i starten af siden. Hvis der så ikke var plads i ens lokale arena, så ville foreningerne kunne se, hvor der var nogen andre ledige haller. Når underviseren har lavet en bruger, vil han/hun skulle vælge sit hold og hvilket tidsrum, som de vil træne i, og vælger derefter hvilken hal han/hun kunne tænke sig. Da det er mange forskellige foreninger, der kan lave en bruger på vores platform, skal de også bruge forskelligt udstyr til den sportsgren de nu dyrker, f.eks. håndbolde, gymnastikredskaber, hockeystave mv. Om den given hal har de rette redskaber, vil blive vist når man skal booke en hal. Derudover vil der også blive vist kapacitet, så underviseren ved hvor mange elever, der er plads til. Når underviseren har tilknyttet et givent hold til en træningssession, vil den blive vist på gymnastens side, der er tilknyttet samme hold. Gymnaster/forældre vil også kunne lave en bruger, hvor de vælger de hold, som de er tilknyttet. Når de logger ind, vil de kun kunne se deres egne træningssessioner, hvor de kan se dato, tid og hvor de skal træne den pågældende uge. 
### Kravspecifikationer
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
- login()
    - Succes eller ikke succesfuld.
- addUser()
    - Tilføjer en bruger til login systemet.
- deleteUser()
    - Fjerner en bruger fra en træningssession
- showHallSport()
    - Viser hvilken sportsgren hallen er egnet til.
- showHallCapacity()
    - Viser mængden af elever der kan være i en hal.
- showSessionPeriod()
    - Vi ser tidsintervallet hallen er booket i.
- addSession()
    - Træneren kan tilføje en session og lokalet vil derefter blive vist som booket og optaget.
- removeSession()
    - Træner fjerner booking.
- studentRemoveSession()
    - Eleven afmelder kun sig selv fra en session.
- showAvailability()
    - Lokalets status bliver vist (optaget = rød / ledigt = grøn).
- editSessionDescription()
    - Træneren skal kunne ændre holdlister, niveau og sportsgrene på bookinger.
- checkSession()
    - Eleven/træner skal kunne se en samlet oversigt over personlig bookinger.
showTeamDescription()
    - Vi ser holdets niveau og størrelse.

### UML
![UML](/pictures/UML.png)