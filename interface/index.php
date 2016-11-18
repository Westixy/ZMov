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
    <script type="text/javascript" src="src/js/settings.js"></script>
    <script type="text/javascript" src="src/js/mainzmov.js"></script>
  </head>
  <body>
    <div class="hidden forExt" id="hiddenData">
    [{"isDir":false,"isSymLink":false,"name":"13.2010.LiMiTED.FRENCH.DVDRip.XviD-AYMO.avi","winCreationDate":"2016-08-26T09:38:00.771Z","winLastWriteDate":"2015-12-24T12:00:31.000Z","winLastAccessDate":"2016-08-26T09:38:00.771Z","path":"K:\\SI-T1a\\Cours\\MAW11\\data\\FILM_a_trier\\13.2010.LiMiTED.FRENCH.DVDRip.XviD-AYMO.avi"},{"isDir":false,"isSymLink":false,"name":"A.Resurrection.2013.TRUEFRENCH.DVDRip.XviD-UTT.avi","winCreationDate":"2016-08-26T09:38:00.787Z","winLastWriteDate":"2015-12-24T12:00:31.000Z","winLastAccessDate":"2016-08-26T09:38:00.787Z","path":"K:\\SI-T1a\\Cours\\MAW11\\data\\FILM_a_trier\\A.Resurrection.2013.TRUEFRENCH.DVDRip.XviD-UTT.avi"}]</div>
    <div class="hidden forExt" id="actualize"></div>
    <div class="hidden forExt" id="actualizeRep"></div>
    <div class="hidden forExt" id="set"></div>
    <div class="hidden forExt" id="setRep"></div>
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
                <div><img src="src/img/noimgbig.jpg" alt="" /></div>
                <div class="cnt-textInfo">
                  <h1 class="movieTitle"><em>&lt;Title&gt;</em></h1>
                  <div class="cnt-desc">
                    <h2>Description</h2>
                      <p id="txt-desc" class="preRawText"><em>&lt;Description&gt;</em>
                      </p>
                  </div>
                  <div class="cnt-acteurs">
                    <h2>Acteurs</h2>
                    <p>
                      <p id="txt-acteurs" class="preRawText"><em>&lt;Actors&gt;</em>
                      </p>
                    </p>
                  </div>
                  <!--<div class="cnt-moreinfo">
                    <h2>Plus d'info</h2>
                    <div id="cnt-pinfo">
                      <em>&lt;MoreInfo&gt;</em>
                    </div>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="settings" class="hidden">
        <div class="voile"></div>
        <div class="frame">
          <div id="btn-settings-close">
            X
          </div>
          <div class="settings-main">
            <h2>Settings</h2>
            <div class="settings-inner">
              <h3>Folders</h3>
              <div class="folder-list">
                <div class="folder-item"><span class="fdata">C:\domefolder\another\one\</span><span class="delete-folder">X</span></div>
                <div class="folder-item"><span class="fdata">C:\domefolder\another\one\</span><span class="delete-folder">X</span></div>
                <div class="folder-item"><span class="fdata">C:\domefolder\another\one\</span><span class="delete-folder">X</span></div>
              </div>
              <input class="input" type="text" id="inpaddfolder" />
              <div class="btn" id="btn-addfolder">Ajouter</div>
              <h3>Extentions <small>séparées par des ";"</small></h3>
              <h6>Don't fill to use default</h6>
              <input class="input" type="text" id="inpextentions" />
              <div class="btn" id="btn-confExt">Confirmer</div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        2016 &copy; BeerWare @ ESO JDA
      </footer>
    </div>
    <script type="text/javascript">
    var zm = new mainZMov();
    window.onload=zm.init();
    </script>
  </body>
</html>
