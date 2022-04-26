<?php

class Api{

public function getDatos(){

   $vector = array();
   $conexion = new Conexion();
   $db = $conexion->getConexion();
   $sql = "SELECT * FROM monitorias";
   $consulta = $db->prepare($sql);
   $consulta->execute();
   while($fila = $consulta->fetch()) {
       $vector[] = array(
         "id" => $fila['id'],
         "materia" => $fila['materia'],
         "monitor" => $fila['monitor'],
         "fecha" => $fila['fecha'],
         "salon" => $fila['salon'],);
         }//fin del ciclo while 

   return $vector;
}

public function getMonitoria($id){

  $vector = array();
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "SELECT * FROM monitorias WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);  
  $consulta->execute();
  while($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "materia" => $fila['materia'],
         "monitor" => $fila['monitor'],
         "fecha" => $fila['fecha'],
         "salon" => $fila['salon'],);
        }//fin del ciclo while 

  return $vector[0];
}


public function agregarMonitoria($materia, $monitor, $fecha, $salon){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO monitorias (materia, monitor, fecha, salon) VALUES
   (:materia,:monitor,:fecha,:salon)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':materia', $materia);
  $consulta->bindParam(':monitor', $monitor);
  $consulta->bindParam(':fecha', $fecha);
  $consulta->bindParam(':salon', $salon);
  $consulta->execute();

  return '{"msg":"monitoria agregada"}';
}

public function eliminarMonitoria($id){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM monitorias WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id); 
  $consulta->execute();

  return '{"msg":"monitoria eliminada"}';
}

public function editarMonitoria($id, $materia, $monitor, $fecha, $salon){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "UPDATE monitorias SET materia=:materia, monitor=:monitor, fecha=:fecha,
  salon=:salon  WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);  
  $consulta->bindParam(':materia', $materia);
  $consulta->bindParam(':monitor', $monitor);
  $consulta->bindParam(':fecha', $fecha);
  $consulta->bindParam(':salon', $salon);
  $consulta->execute();

  return '{"msg":"datos actualizados"}';
}


}

?>