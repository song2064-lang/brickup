<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// $url = "https://script.google.com/macros/s/AKfycbxOGiQWC4ELAUneFEL_cmjNL_mR6Z4VUTiEmkpVB_rhHIPNYO_0ufv1CWdEsQ8_DYaRDA/exec";
$url = "https://script.google.com/macros/s/AKfycbyGvqHdDDssyTF6ZFFQpaiBzRT_sNaiTlt6w7_FmUbI2CAxaUlBC-_f-AqzpuPbvqXy/exec";


$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
