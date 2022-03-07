<?php
//Controller
$tabRes = array();
$tabRes['action'] = null;
$action = $_POST['action'];

switch ($action) {
    case "payer":
        payer($_POST['item']);
        break;
}


function payer($item){
    global $tabRes;
    
}















?>