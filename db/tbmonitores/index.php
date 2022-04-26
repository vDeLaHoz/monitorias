<?php
require_once('conexion.php');
require_once('metodos.php');
require_once('cors.php');
$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    if(!empty($_GET['id'])){
      $id = $_GET['id'];  
      $api = new Api();
      $obj = $api->getMonitor($id);
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
    $nombres = $data['nombres'];
    $apellidos = $data['apellidos'];
    $programa = $data['programa'];
    $semestre = $data['semestre'];
    $documento = $data['documento'];
    $celular = $data['celular'];
    $correo = $data['correo'];
    $api = new Api();
    $json = $api->agregarMonitor($nombres, $apellidos, $programa, $semestre, $documento, $celular, $correo);
    echo $json;
}

if($method=="DELETE"){
    $json = null;
    $id = $_REQUEST['id'];
    $api = new Api();
    $json = $api->eliminarMonitor($id);
    echo $json;
}

if($method=="PUT"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $nombre = $data['nombre'];
    $apellidos = $data['apellidos'];
    $programa = $data['programa'];
    $semestre = $data['semestre'];
    $documento = $data['documento'];
    $celular = $data['celular'];
    $correo = $data['correo'];
    $api = new Api();
    $json = $api->editarMonitor($id, $nombres, $apellidos, $programa, $semestre, $documento, $celular, $correo);
    echo $json;
}

?>