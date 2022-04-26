<?php
require_once('conexion.php');
require_once('metodos.php');
require_once('cors.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    if(!empty($_GET['id'])){
      $id = $_GET['id'];  
      $api = new Api();
      $obj = $api->getMonitoria($id);
      $json = json_encode($obj);
      echo $json;     

    }else{
      $vector = array();
      $api = new Api();
      $vector = $api->getDatos();
      $json = json_encode($vector);
      echo $json;
    }
}

if($method=="POST"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $materia = $data['materia'];
    $monitor = $data['monitor'];
    $fecha = $data['fecha'];
    $salon = $data['salon'];
    $api = new Api();
    $json = $api->agregarMonitoria($materia, $monitor, $fecha, $salon);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $id = $_REQUEST['id'];
    $api = new Api();
    $json = $api->eliminarMonitoria($id);
    echo $json;
}

if($method=="PUT"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $materia = $data['materia'];
    $monitor = $data['monitor'];
    $fecha = $data['fecha'];
    $salon = $data['salon'];
    $api = new Api();
    $json = $api->editarMonitoria($id, $materia, $monitor, $fecha, $salon);
    echo $json;
}

?>