import axios from "axios";
import React, { useEffect, useState } from "react";

const Monitores = () => {
    const [nombres, setNombres] = React.useState('')
    const [apellidos, setApellidos] = React.useState('')
    const [programa, setPrograma] = React.useState('')
    const [semestre, setSemestre] = React.useState()
    const [documento, setDocumento] = React.useState()
    const [celular, setCelular] = React.useState()
    const [correo, setCorreo] = React.useState()
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [lista, setLista] = React.useState([])
    const [vald, setVald] = React.useState(true)

    useEffect(() => {
        obtenerMonitores();
      },[])

      async function obtenerMonitores(){
        const res = await axios.get('http://localhost/db/tbmonitores/');
        setLista(res.data) 
        console.log(res.data)
    } 
    
    async function guardar() {
        const obj = {nombres, apellidos, programa, semestre, documento, celular, correo};
        const res = await axios.post('http://localhost/db/tbmonitores/', obj);
        console.log(res.data)
        obtenerMonitores();
        clear();
    }

    async function eliminarMonitor(id){ 
 
        if(window.confirm('¿Deseas eliminar el monitor?')){
           const res = await axios.delete('http://localhost/db/tbmonitores/?id='+id);
           obtenerMonitores();
           console.log(res.data)
       }
     }

     async function editarMonitor(e) {
        e.preventDefault();
          const obj = {nombres, apellidos, programa, semestre, documento, celular, correo};
          const res = await axios.put('http://localhost/db/tbmonitores/', obj);
          console.log(res.data)
          obtenerMonitores();
      
      }

      function guardarEditar(e) {
        if (!nombres.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!apellidos.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!programa.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!semestre.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!documento.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!celular.trim()) {
            setError('Llenar todos los campos')
            return
        }

        if (!correo.trim()) {
            setError('Llenar todos los campos')
            return
        }
        e.preventDefault(); 
        vald? guardar():editarMonitor();
        clear();
    }

    async function getMonitor(id){
        const res = await axios.get('http://localhost/db/tbmonitores/?id='+id);
        setId(res.data.id);
        setNombres(res.data.nombres);
        setApellidos(res.data.apellidos);
        setPrograma(res.data.programa);
        setSemestre(res.data.semestre);
        setDocumento(res.data.documento);
        setCelular(res.data.celular);
        setCorreo(res.data.correo);
        setVald(false)
    } 

     function clear(){
            setNombres('')
            setApellidos('')
            setPrograma('')
            setSemestre('')
            setDocumento('')
            setCelular('')
            setCorreo('')
            setError(null)
            setVald(true)
      }

    return (
        <div className="container mt-4 my-4">
            <div className="card">
                <div className="card-header text-center bg-primary text-white">
                    <h2>Monitores</h2>
                </div>
                <div className="card-body">
                <form>
                        <div className="row">
                            <div className="col-4">
                                <label><b>Nombres:</b></label>
                                <input
                                    className='form-control mb-2'
                                    type="text"
                                    placeholder='Ingrese los nombres'
                                    onChange={(e) => setNombres(e.target.value)}
                                    value={nombres}
                                />
                            </div>
                            <div className="col-4">
                                <label><b>Apellidos:</b></label>
                                <input
                                    className='form-control mb-2'
                                    placeholder='Ingrese los apellidos'
                                    type="text"
                                    onChange={(e) => setApellidos(e.target.value)}
                                    value={apellidos}
                                /></div>
                            <div className="col-4">
                                <label><b>Programa Académico:</b></label>
                                <input
                                    className='form-control mb-2'
                                    placeholder='Ingrese el programa academico'
                                    type="text"
                                    onChange={(e) => setPrograma(e.target.value)}
                                    value={programa}
                                /></div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <label><b>Semestre:</b></label>
                                <input
                                    min={0}
                                    className='form-control mb-2'
                                    placeholder='Ingrese el semestre'
                                    type="number"
                                    onChange={(e) => setSemestre(e.target.value)}
                                    value={semestre}
                                />
                            </div>
                            <div className="col-4">
                                <label><b>Documento:</b></label>
                                <input
                                    min={0}
                                    className='form-control mb-2'
                                    placeholder='Ingrese el numero de documento'
                                    type="number"
                                    onChange={(e) => setDocumento(e.target.value)}
                                    value={documento}
                                />
                            </div>
                            <div className="col-4">
                                <label><b>Celular:</b></label>
                                <input
                                    min={0}
                                    className='form-control mb-2'
                                    placeholder='Ingrese el numero de celular'
                                    type="number"
                                    onChange={(e) => setCelular(e.target.value)}
                                    value={celular}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <label><b>Correo Electronico:</b></label>
                                <input
                                    className='form-control mb-2'
                                    placeholder='Ingrese el correo electronico'
                                    type="email"
                                    onChange={(e) => setCorreo(e.target.value)}
                                    value={correo}
                                />
                            </div>
                        </div>
                    </form>
                    <button  className="btn btn-primary mb-2" 
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
                                        <th scope="col">Documento</th>
                                        <th scope="col">Nombres</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Programa</th>
                                        <th scope="col">Semestre</th>
                                        <th scope="col">Celular</th>
                                        <th scope="col">Correo Electronico</th>
                                        <th scope="col"> Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{item.documento}</th>
                                        <td>{item.nombres}</td>
                                        <td>{item.apellidos }</td>
                                        <td>{item.programa}</td>
                                        <td>{item.semestre}</td>
                                        <td>{item.celular}</td>
                                        <td>{item.correo}</td>
                                        <td>
                                        <button className="btn btn-success btn-sm mr-2" 
                           onClick={() => getMonitor(item.id)} >Editar</button>
                                            <button  className="btn btn-outline-danger btn-sm " 
                           onClick={() => eliminarMonitor(item.id)}>Eliminar</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        
                    ))
                }
                <br/><br/>
        </div>
    )

}

export default Monitores