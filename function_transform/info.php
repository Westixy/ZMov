<?php
	if(isset($_GET['search']) && $_GET['search'] != ''){
		api_search($_GET['search']);
	}
	function api_search($query){
		$ch = curl_init();
		
		$query = str_replace(" ","%20", $query);
		curl_setopt($ch, CURLOPT_URL, "http://api.themoviedb.org/3/search/movie?api_key=9363ea2ad2a249607945e6df3f35ea9b&query=".$query."&language=fr");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		  "Accept: application/json"
		));

		$response = curl_exec($ch);
		curl_close($ch);
		
		$movieResults = json_decode($response, true);

		// affichage !
		echo '<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2'.$movieResults['results'][0]['poster_path'].'"/>';

		
		/*echo '<pre>';
		print_r($movieResults);
		echo '</pre>';*/
		//var_dump($response);
	}