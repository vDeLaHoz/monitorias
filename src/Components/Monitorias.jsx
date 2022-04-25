import axios from "axios";
import React, { useEffect, useState } from "react";

const Monitorias = () => {
    const [materia, setMateria] = React.useState('')
    const [monitor, setMonitor] = React.useState('')
    const [fecha, setFecha] = React.useState('')
    const [salon, setSalon] = React.useState()
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [lista, setLista] = React.useState([])
    const [vald, setVald] = React.useState(true)

    useEffect(() => {
        obtenerMonitorias();
      },[])

      async function obtenerMonitorias(){
        const res = await axios.get('http://localhost/db/tbmonitorias/');
        setLista(res.data) 
        console.log(res.data)
    } 

    async function guardar() {
        const obj = {materia, monitor, fecha, salon};
        const res = await axios.post('http://localhost/db/tbmonitorias/', obj);
        console.log(res.data)
        obtenerMonitorias();
        clear();
    }

    async function eliminarMonitoria(id){ 
 
        if(window.confirm('¿Deseas eliminar la monitoria?')){
           const res = await axios.delete('http://localhost/db/tbmonitorias/?id='+id);
           obtenerMonitorias();
           console.log(res.data)
       }
     }

     async function editarMonitoria() {
          const obj = {materia, monitor, fecha, salon};
          const res = await axios.put('http://localhost/db/tbmonitorias/', obj);
          console.log(res.data)
          obtenerMonitorias();
      
      }

      function guardarEditar(e) {
        if (!materia.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!monitor.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!fecha.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!salon.trim()) {
            setError('Llenar todos los campos')
            return
        }
        e.preventDefault(); 
        vald? guardar():editarMonitoria();
        clear();
    }

    async function getMonitoria(id){
        const res = await axios.get('http://localhost/db/tbmonitorias/?id='+id);
        setId(res.data.id);
        setMateria(res.data.materia);
        setMonitor(res.data.monitor);
        setFecha(res.data.fecha);
        setSalon(res.data.salon)
        setVald(false)
    } 

     function clear(){
        setMateria('')
        setMonitor('')
        setFecha('')
        setSalon('')
        setError(null)
        setVald(true)
  }


    return (
        <div className="container mt-4 my-4">
            <div className="card">
                <div className="card-header text-center bg-primary text-white">
                    <h2>Monitorias</h2>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <label><b>Materia:</b></label>
                                <input
                                    className='form-control mb-2'
                                    type="text"
                                    placeholder='Ingrese la materia'
                                    onChange={(e) => setMateria(e.target.value)}
                                    value={materia}
                                />
                            </div>
                            <div className="col-6">
                                <label><b>Monitor:</b></label>
                                <input
                                    className='form-control mb-2'
                                    placeholder='Ingrese el monitor asignado'
                                    type="text"
                                    onChange={(e) => setMonitor(e.target.value)}
                                    value={monitor}
                                /></div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label><b>Fecha:</b></label>
                                <input
                                    className='form-control mb-2'
                                    placeholder='Ingrese la fecha'
                                    type="date"
                                    onChange={(e) => setFecha(e.target.value)}
                                    value={fecha}
                                /></div>
                                <div className="col-6">
                                <label><b>Salón:</b></label>
                                <input
                                    className='form-control mb-2'
                                    placeholder='Ingrese el salon'
                                    type="text"
                                    onChange={(e) => setSalon(e.target.value)}
                                    value={salon}
                                />
                                </div>
                        </div>
                    </form>
                    <button  className="btn btn-primary btn-sm" 
                onClick={(e) => guardarEditar(e)} >
                  {vald?"Agregar":"Editar"} </button> 
                </div>
                {error ? <span className='text-danger'>{error}</span> : null}
            </div>
            {
                    lista.map(item => (
                        <>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Materia</th>
                                        <th scope="col">Monitor</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Salon</th>
                                        <th scope="col">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.materia}</td>
                                        <td>{item.monitor}</td>
                                        <td>{item.fecha}</td>
                                        <td>{item.salon}</td>
                                        <td>
                                        <button className="btn btn-success btn-sm mr-2" 
                           onClick={() => getMonitoria(item.id)} >Editar</button>
                                            <button  className="btn btn-outline-danger btn-sm " 
                           onClick={() => eliminarMonitoria(item.id)}>Eliminar</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ))
                }
        </div>
    )

}

export default Monitorias