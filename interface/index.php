<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Interface</title>
    <link rel="stylesheet" href="src/css/style.css" media="screen" title="no title">
    <script type="text/javascript" src="assets/jquery.min.js"></script>
    <script type="text/javascript" src="src/js/loader.js"></script>
    <link rel="stylesheet" href="src/css/loader.css" media="screen" title="no title">
    <script type="text/javascript" src="src/js/ajax.js"></script>
    <script type="text/javascript" src="src/js/item.js"></script>
    <script type="text/javascript" src="src/js/itemlist.js"></script>
    <script type="text/javascript" src="src/js/mainzmov.js"></script>
  </head>
  <body>
    <div id="hiddenData">
    [{"isDir":false,"isSymLink":false,"name":"13.2010.LiMiTED.FRENCH.DVDRip.XviD-AYMO.avi","winCreationDate":"2016-08-26T09:38:00.771Z","winLastWriteDate":"2015-12-24T12:00:31.000Z","winLastAccessDate":"2016-08-26T09:38:00.771Z","path":"K:\\SI-T1a\\Cours\\MAW11\\data\\FILM_a_trier\\13.2010.LiMiTED.FRENCH.DVDRip.XviD-AYMO.avi"},{"isDir":false,"isSymLink":false,"name":"A.Resurrection.2013.TRUEFRENCH.DVDRip.XviD-UTT.avi","winCreationDate":"2016-08-26T09:38:00.787Z","winLastWriteDate":"2015-12-24T12:00:31.000Z","winLastAccessDate":"2016-08-26T09:38:00.787Z","path":"K:\\SI-T1a\\Cours\\MAW11\\data\\FILM_a_trier\\A.Resurrection.2013.TRUEFRENCH.DVDRip.XviD-UTT.avi"}]</div>
    <header>
      <div id="cnt-search">
        <input id="in-search" type="text" placeholder="Search"/>
        <img src="src/img/search.png"/>
      </div>
      <div id="btnSettings">
        <img src="src/img/set.png"/>
      </div>
    </header>
    <div id="bdy">
      <div id="bdy2">
        <div id="cnt-main">
          <div id="loader-mvlst">
            <div id="cnt-movieList"><!-- CONTAINER MOVIE LIST -->

            </div><!-- END CONTAINER MOVIE LIST -->
          </div>
          <div id="loader-info">
            <div id="cnt-movieInfo">
              <div id="cnt-movieCard">
                <div><img src="src/img/nb.jpg" alt="" /></div>
                <div class="cnt-textInfo">
                  <h1 class="movieTitle">Titre du film</h1>
                  <div class="cnt-desc">
                    <h2>Description</h2>
                      <p id="txt-desc" class="preRawText">Une petite description au calme
sur plusieurs lignes
                      </p>
                  </div>
                  <div class="cnt-acteurs">
                    <h2>Acteurs</h2>
                    <p>
                      <p id="txt-acteurs" class="preRawText">acteur1
acteur2
acteur3
                      </p>
                    </p>
                  </div>
                  <div class="cnt-moreinfo">
                    <h2>Plus d'info</h2>
                    <div id="cnt-pinfo">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        2016 &copy; BeerWare @ ESO JDA DDG
      </footer>
    </div>
    <script type="text/javascript">
    var zm = new mainZMov();
    window.onload=zm.init();
    </script>
  </body>
</html>
