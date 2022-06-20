import React from 'react'
import { useState, useEffect } from 'react'
import Error from './Error';

function Formulario({ pacientes, setPacientes, paciente, setPaciente}) {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  //Error
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])


  //id
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay por lo menos un campo vacio')

      setError(true);
      return;
    }
    setError(false);

    //Objeto de pacientes
    const objetoPacientes = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      //editando el Registro
      objetoPacientes.id = paciente.id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === 
        paciente.id ? objetoPacientes : pacienteState); 
      setPacientes(pacientesActualizados);
      setPaciente({});

    } else {
      //agregando un nuevo Registro
      objetoPacientes.id = generarId();
      setPacientes([...pacientes, objetoPacientes]);
    }

    // Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }


  return (
    <div className="ms:w-1/2 lg:w-2/5 mx-5 my-10">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>


      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg py-10 px-5">

        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>

          <input
            id='mascota'
            type="text"
            placeholder='Nombre de la Mascota'
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='propietarios' className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>

          <input
            id='propietario'
            type="text"
            placeholder='Nombre del Propietario'
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>E-mail</label>

          <input
            id='email'
            type="email"
            placeholder='Email Contacto Propietario'
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Alta</label>

          <input
            id='alta'
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>Sintomas</label>

          <textarea
            id='sintomas'
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            placeholder='Describe los Sintomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-500 w-full p-3 text-white uppercase font-bold 
         hover:bg-indigo-900 cursor-pointer transition-all rounded-md"
          value={paciente.id ? 'Editar Paciente' : 'Añadir Paciente'}
        />

      </form>
    </div>
  )
}

export default Formulario