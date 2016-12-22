# ZMov application

**ZMov** est une application de gestion de films locaux. Il permet de récupérer
les informations liées a un film grâce a son nom de fichier.

## Dependencies

|app      |version|
|---      |---    |
|Firefox  |50+    |
|ZMov-ext |[1.0.5+](http://maw.dev/documentation/external/zmov_extention-1.0.5.xpi)|

## How to start

1. Ouvrir Firefox
2. Installer  http://maw.dev/documentation/external/zmov_extention-1.0.5.xpi
3. Aller sur le site (http://maw.dev/interface/)
4. There u go :D

## Host at home

### Requirment

- Serveur PHP 5.6 +
- php-curl installé

### What to do

- Copier les répertoires "interface" et "function_transform" à la racine du
serveur web
- Modifier la cle api de [TheMovieDataBase](https://www.themoviedb.org/account/signup?language=fr)
se trauvant dans le fichier `function_transform/info.php` à la ligne `8:15`

## Licence

```
ZMov
"THE BEER-WARE LICENSE" (Revision 42):
<westixy@gmail.com> and <de.sousa.joel@cpnv.ch> wrote this file. As long as
you retain this notice you can do whatever you want with this stuff. If we meet
some day, and you think this stuff is worth it, you can buy us a beer in return

Esteban Sotillo & Joel De Sousa
```
