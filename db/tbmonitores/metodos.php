<?php

class Api{

public function getDatos(){

   $vector = array();
   $conexion = new Conexion();
   $db = $conexion->getConexion();
   $sql = "SELECT * FROM monitores";
   $consulta = $db->prepare($sql);
   $consulta->execute();
   while($fila = $consulta->fetch()) {
       $vector[] = array(
         "id" => $fila['id'],
         "nombres" => $fila['nombres'],
         "apellidos" => $fila['apellidos'],
         "programa" => $fila['programa'],
         "semestre" => $fila['semestre'],
         "documento" => $fila['documento'],
         "celular" => $fila['celular'],
         "correo" => $fila['correo']);
         }//fin del ciclo while 

   return $vector;
}

public function getMonitor($id){

  $vector = array();
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "SELECT * FROM monitores WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);  
  $consulta->execute();
  while($fila = $consulta->fetch()) {
      $vector[] = array(
        "id" => $fila['id'],
        "nombres" => $fila['nombres'],
         "apellidos" => $fila['apellidos'],
         "programa" => $fila['programa'],
         "semestre" => $fila['semestre'],
         "documento" => $fila['documento'],
         "celular" => $fila['celular'],
         "correo" => $fila['correo'] );
        }//fin del ciclo while 

  return $vector[0];
}


public function agregarMonitor($nombres, $apellidos, $programa, $semestre, $documento, $celular, $correo){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO monitores (nombres, apellidos, programa, semestre, documento, 
  celular, correo) VALUES (:nombres,:apellidos,:programa,:semestre,:documento,:celular,:correo)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':nombres', $nombres);
  $consulta->bindParam(':apellidos', $apellidos);
  $consulta->bindParam(':programa', $programa);
  $consulta->bindParam(':semestre', $semestre);
  $consulta->bindParam(':documento', $documento);
  $consulta->bindParam(':celular', $celular);
  $consulta->bindParam(':correo', $correo);
  $consulta->execute();

  return '{"msg":"monitor agregado"}';
}

public function eliminarMonitor($id){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM monitores WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id); 
  $consulta->execute();

  return '{"msg":"monitor eliminado"}';
}

public function editarMonitor($id, $nombres, $apellidos, $programa, $semestre, $documento, $celular, $correo){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "UPDATE monitores SET nombres=:nombres, apellidos=:apellidos, programa=:programa,
  semestre=:semestre, documento=:documento, celular=:celular, correo=:correo  WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);  
  $consulta->bindParam(':nombres', $nombres);
  $consulta->bindParam(':apellidos', $apellidos);
  $consulta->bindParam(':programa', $programa);
  $consulta->bindParam(':semestre', $semestre);
  $consulta->bindParam(':documento', $documento);
  $consulta->bindParam(':celular', $celular);
  $consulta->bindParam(':correo', $correo);
  $consulta->execute();

  return '{"msg":"datos actualizados"}';
}


}

?>