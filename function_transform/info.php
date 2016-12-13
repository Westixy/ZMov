<?php


	if(isset($_GET['search']) && $_GET['search'] != ''){
		api_search($_GET['search']);
	}
	function api_search($query){
		$api_key = '9363ea2ad2a249607945e6df3f35ea9b';
		// Query to get the specified movie
		$ch = curl_init();

		$query = str_replace(" ","%20", $query);
		curl_setopt($ch, CURLOPT_URL, "http://api.themoviedb.org/3/search/movie?api_key=$api_key&query=$query&language=fr");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		  "Accept: application/json"
		));

		$response = curl_exec($ch);
		curl_close($ch);

		$movieResults = json_decode($response, true);

		// Query to get all the cast from the movie
		$cha = curl_init();

		curl_setopt($cha, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($cha, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt_array($cha, array(
		  CURLOPT_URL => "https://api.themoviedb.org/3/movie/".$movieResults['results'][0]['id']."/credits?api_key=$api_key",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_POSTFIELDS => "{}",
		));
		$response = curl_exec($cha);
		curl_close($cha);
		$actorsResults = json_decode($response, true)['results'][0];
		$movieResults['actors'] = $actorsResults['cast'];
		$movieResults['directors'] = [];
		$movieResults['directors'][] = $actorsResults['crew'][0];
		if (empty($actorsResults['crew'][1]) && $actorsResults['crew'][1]['department']=='Directing') {
			$movieResults['directors'][] = $actorsResults['crew'][1];
		}


		return $movieResults;
	}


// exemple to take actors : https://api.themoviedb.org/3/movie/346672/credits?api_key=9363ea2ad2a249607945e6df3f35ea9b
