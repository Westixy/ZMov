<?php
	require('info.php'); // relie la page de la foncion API

	// transform les noms des fichiers
	function nameTransform(){
		// récupère le fichier json avec la liste des films
		$tmp = file_get_contents("list.json");
		$tmp = json_decode($tmp, true);

		// active le mode delete --> écrire dans l'url ?mode=delete pour supprimer des mot clés
		if(isset($_GET['mot']) && isset($_GET['mode']) && $_GET['mode'] == 'delete'){
			getforgivenWords($_GET['mot']);
		}


		// parcours chaque film
		for($i = 0; $i < count($tmp); $i++){
			$tmp[$i]['name'] = str_replace(".", " ", $tmp[$i]['name']); // remplace les points par des espaces
			$tmp[$i]['name'] = str_replace("-", " ", $tmp[$i]['name']); // remplace les tirets par des espaces
			$tmp[$i]['name'] = str_replace("_", " ", $tmp[$i]['name']); // remplace les tirets par des espaces
			$tmp[$i]['name'] = str_replace("[", "", $tmp[$i]['name']);
			$tmp[$i]['name'] = str_replace("]", "", $tmp[$i]['name']);

			$film[$i]='';
			$display = array();

			$tmp1[$i] = explode(" ", $tmp[$i]['name']); // split les mots séparés par des espaces dans un tableau

			for($d = 0; $d < count($tmp1[$i]); $d++){

				// Si le mot ne fais pas partis des mot interdits
				if(!findWord($tmp1[$i][$d]) && substr($tmp1[$i][$d], 0, -2) != '20'){
					if(isset($_GET['mode']) && $_GET['mode'] == 'delete'){
						$film[$i] .= '<a href="index.php?mode=delete&mot='.$tmp1[$i][$d].'">'.$tmp1[$i][$d]." </a>";
					}else{
						$film[$i] .= $tmp1[$i][$d]. ' '; // Ajoute le nom du film dans la variable
					}
				}
			}
			echo $film[$i] . '<br />';
			if(isset($_POST['entree']) && $_POST['entree'] != ''){
				if(preg_match(strtoupper("/".$_POST['entree']."/"), strtoupper($film[$i]))){
					api_search($film[$i]);
				}
			}
		}
	}

	// vérifie si le mot en paramètre fait partie de la liste
	function findWord($word){
		$list = file_get_contents('forgivenList.json'); // récupère liste de mot interdits
		$list = json_decode($list, true);

		// tableau de mots à enlever
		$forgivenWords = $list;

		// boucle qui parcours les mots à enlever
		for($i = 0; $i < count($forgivenWords); $i++){
			// si le mot interdit correspond à un bout de la chaine à comparer retourne TRUE
			if(preg_match("/".strtoupper($forgivenWords[$i])."/", strtoupper($word))){
				return true;
			}
		}
		return false;
	}

	function getforgivenWords($mot){
		$list = fopen('forgivenList.json','r+');
		$content = fgets($list);
		fseek($list, strlen($content)-1);
		fputs($list, ',"'.$mot.'"]');
		fclose($list);
	}
?>
<form action="#" method="post">
	<input type="text" name="entree"></input>
	<input type="submit"></input>
</form>
<div><?php nameTransform();?></div>
