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
    <script type="text/javascript" src="src/js/comm.js"></script>
    <script type="text/javascript" src="src/js/item.js"></script>
    <script type="text/javascript" src="src/js/itemlist.js"></script>
    <script type="text/javascript" src="src/js/settings.js"></script>
    <script type="text/javascript" src="src/js/mainzmov.js"></script>
  </head>
  <body>
    <div class="hidden forExt" id="hiddenData">
    [{"isDir":false,"isSymLink":false,"name":"13.2010.LiMiTED.FRENCH.DVDRip.XviD-AYMO.avi","winCreationDate":"2016-08-26T09:38:00.771Z","winLastWriteDate":"2015-12-24T12:00:31.000Z","winLastAccessDate":"2016-08-26T09:38:00.771Z","path":"K:\\SI-T1a\\Cours\\MAW11\\data\\FILM_a_trier\\13.2010.LiMiTED.FRENCH.DVDRip.XviD-AYMO.avi"},{"isDir":false,"isSymLink":false,"name":"A.Resurrection.2013.TRUEFRENCH.DVDRip.XviD-UTT.avi","winCreationDate":"2016-08-26T09:38:00.787Z","winLastWriteDate":"2015-12-24T12:00:31.000Z","winLastAccessDate":"2016-08-26T09:38:00.787Z","path":"K:\\SI-T1a\\Cours\\MAW11\\data\\FILM_a_trier\\A.Resurrection.2013.TRUEFRENCH.DVDRip.XviD-UTT.avi"}]</div>
    <div class="hidden forExt" id="FromExt">void</div>
    <div class="hidden forExt" id="FromWeb">void</div>
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
              <input class="input" type="text" id="inpextentions" placeholder="mp4;avi;mkv;dvx;mov;mpg;mpa;asf;wma;vob;wmv"/>
              <div class="btn" id="btn-confExt">Confirmer</div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        2016 - BeerWare <!--


                                                      `.=======..`
                                              `:+oydNNNMMNNNNNNMMNNmhyo/=`
                                         `=+ymNMNdys+/:==......==:+oshmNMNds/.
                                      ./yNNNhs/.``                    ``=+ydNNms:`
                                   `+hNNds:`                               `./ymMmy:`
                                 =smMdo=`                `...`                 `:yNNm+`
                               =yNNy:`         `.==.` ./yNNNNmy/==.`              .+dMmo.
                             .yNNy=           :mNNNNmdNNms:=:smNNNNds:`             `/dMmo`
                           `oNMh=             yMN:=:oys=`     .===/ymNms`             `/mMd:
                          =hMm/`          `=/+dMd`                  `/NMy               `sMNs`
                         :mMh.          `odNNmdy=                     +MM/                /mMh.
                        /NMs`           /MM+.``                       `mMy                 =dMm.
                       /NMo`            +MMo//////////////////////////+mMy    `...`         .dMm.
                      :NMs              `dMMNmNmmmmmmmmmmmmmmmmmmmmmNmNMMy `/yhhyhhy+`       .mMd`
                     .mMd`               hMN+/////////////////////////+MMy/dd+.```./hd/       =NMs
                     sMN=                hMm/::+/:::::::::::::::::::::/MMNNo`       `yN:       oMN:
                    .NMs                 hMm/:+Nh:::/o+:::::::::::::::/MMNo          `Nh       `mMh
                    oMN.                 hMm/:+Mh:::+Nm:::/hy:::::::::/MMy           `Nh        +MM=
                    mMh                  hMm/:+Mh:::+Nm:::/Nm:::+ds:::/MMy           =Ms        .NMo
                   `MMs                  hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy           dm.        `dMh
                   =MM/                  hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy         `yN/          hMN
                   =MM:                  hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy        .hN:           hMN
                   .MM/                  hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy       :md=            hMm
                    MMs                  hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy     .hN+`            `dMh
                    dMd                  hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy   .yNs.              =MMo
                    +MM=                 hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy =hNs.                oMM.
                    `NMy                 hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMmmm+`                 `NMy
                     +MM:                hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMd:                    sMN.
                     `hMm`               hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy                    :MMo
                      .mMh`              hMm/:+Mh:::+Nm:::/Nm:::oMh:::/MMy                   =NMy
                       =NMh`             hMm/:+Nh:::+Nm:::/Nm:::oMh:::/MMy                  =mMh`
                        =mMh.            hMm/:://:::/dh:::/Nm:::oMh:::/MMy                 :NMh`
                         .dMm:           hMm/::::::::/::::/oo:::oMh:::/MMy                oNMs`
                          `sNNs.         hMm/:::::::::::::::::::/s+:::/MMy              =dMm/
                            :dMm+`       hMNyyyyyyyyyyyyyyyyyyyyyyyyyyyMMy            .sNMy.
                             `omMd/`     sdddddddddddddddddddddddddddddddo          .sNMh:
                               .omMmo.   `````````````````````````````````       `:yNMh/`
                                 `/hNNh+.                                     `=odNNy:`
                                   `=odNNho:.                             `./sdNNh+.
                                      `=ohmNmhs/=.`                  `.:+ydNNmy/.
                                          .:+ydmNmddyso+////////+oshdmNNmhs/=`
                                              `.=/+syddmmmmmmmmmddhys+:=``
                                                       ``......``

          ````````     ````````   `````````  ````````    ````   ```    ```    ````      ````````     ````````
          +mmmddmdy=  =mmmddddd.  hmmmdddd+  +mmmddmdy=  /mm+  `dmmo  `hmm`  `ymmms     ymmmdmmho`  `dmmmdddd:
          +MMh==oMMm  =MMN:====`  mMM+====.  +MMh==sMMh  .mMm` /MmMm. :MMy   oMMhMM/    hMMo=:hMM+  `NMM/====`
          +MMmyymMN/  =MMMyyyys   mMMdyyyy.  +MMd/+hMm/   oMM+ dM/yMo dMN=  :NMy`dMN.   hMMy/+mMd=  `NMMhyyyy`
          +MMd++oNMd. =MMNoooo+   mMMyoooo.  +MMNhdMMs`   .NMm/Mm =Mm:MMh  .mMN/:oMMd   hMMdhmMN+   `NMMooooo`
          +MMy`..mMM/ =MMN.....`  mMM/....`  +MMy  +MMd`   sMMNM/  hMNMM:  hMMmmmmmMMo  hMM/ `yMMs` `NMM=....`
          +NNNNNNNd+  =NNNNNNNN/  dNNNNNNNh  +NNy   +NNh`  .NNNm`  :NNNh  +NNs    `hNN: hNN/   yNNo `mNNNNNNNo
           ```````     ````````   `````````   ``     ```    ````    ```   ```       ``  ```     ```  ````````


          /* ZMov
          * "THE BEER-WARE LICENSE" (Revision 42):
          * <westixy@gmail.com> and <de.sousa.joel@cpnv.ch> wrote this file. As long as you retain this notice you
          * can do whatever you want with this stuff. If we meet some day, and you think
          * this stuff is worth it, you can buy me a beer in return
          * Esteban Sotillo & Joel De Sousa
          *
          * Poul-Henning Kamp
          */

          /* ORIGINAL LICENCE
          * "THE BEER-WARE LICENSE" (Revision 42):
          * <phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you
          * can do whatever you want with this stuff. If we meet some day, and you think
          * this stuff is worth it, you can buy me a beer in return Poul-Henning Kamp
          */
  --> - ESO JDA
      </footer>
    </div>
    <script type="text/javascript">
    var zm = new mainZMov();
    window.onload=zm.init();
    </script>
  </body>
</html>
