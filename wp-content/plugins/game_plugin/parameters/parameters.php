<?php

$connexion_string = "mysql:dbname=last_constitution_wp;host=127.0.0.1;charset=utf8";

$login = "root";
$mdp = "123456";



function openBDD()
{
    global $connexion_string;
    global $login;
    global $mdp;
    //$bdd = new PDO($connexion_string, $login, $mdp);
    $bdd = new PDO("mysql:dbname=last_constitution_wp;host=127.0.0.1;charset=utf8", "root","123456");
    return $bdd;
}
