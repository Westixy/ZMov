<?php

// TODO : preg_match api !


require('info.php'); // relie la page de la foncion API

	// transforme le nom des films dans $_POST et retourne une chaine json
	function nameTransform(){
		
		$_POST[0] = 'test.avi';
		$_POST[1] = 'test2-lol.mkv';
		
		// active le mode delete --> écrire dans l'url ?mode=delete pour supprimer des mot clés
		if(isset($_GET['mot']) && isset($_GET['mode']) && $_GET['mode'] == 'delete'){
			getforgivenWords($_GET['mot']);
		}
		
		$json = array();
		
		for($i = 0; $i < count($_POST); $i++){
			$_POST[$i] = str_replace(".", " ", $_POST[$i]); // remplace les points par des espaces
			$_POST[$i] = str_replace("-", " ", $_POST[$i]); // remplace les tirets par des espaces
			$_POST[$i] = str_replace("_", " ", $_POST[$i]); // remplace les tirets par des espaces
			$_POST[$i] = str_replace("[", "", $_POST[$i]);
			$_POST[$i] = str_replace("]", "", $_POST[$i]);
			
			$film[$i]='';
			
			$tmp1[$i] = explode(" ", $_POST[$i]); // split les mots spéarés par des espaces dans un tableau
			
			for($d = 0; $d < count($tmp1[$i]); $d++){
				// si le mot ne fais pas partis des mots interdits
				if(!findWord($tmp1[$i][$d]) && substr($tmp1[$i][$d], 0, -2) != '20'){
					if(isset($_GET['mode']) && $_GET['mode'] == 'delete'){
						$film[$i] .= '<a href="index.php?mode=delete&mot='.$tmp1[$i][$d].'">'.$tmp1[$i][$d]." </a>";
					}else{
						$film[$i] .= $tmp1[$i][$d]. ' '; // Ajoute le nom du film dans la variable
					}
				}
			}
			$json[$i] = $film[$i];
		}
		
		return json_encode($json);
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