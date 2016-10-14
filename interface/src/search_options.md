# Search option

<b>Exemple :</b>
`a:John Cena|Edit Piaf;n:My&title;d:<20101231|>20160731|=20161014`

<b>Explication</b>
- Bloc
  - commence par :
    - `a`(acteur)
    - `n`(nom/titre)
    - `d`(date)
  - suivi de `:`
  - contient un ou plusiers mots
    - les noms peuvent contenir des espaces
    - la date doit commencer par un opérateur de compraison:
      - `<` plus petit que la date(`<yyyymmdd`)
      - `>` plus grand que la date(`>yyyymmdd`)
      - `=` égal à la date(`=yyyymmdd`)
  - séparé à l'intérieur par des portes :
    - `|` OU
    - `&` ET
  - se termine par `;`
