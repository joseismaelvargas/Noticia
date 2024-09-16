import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Cardnoticias from './Cardnoticias';

function Formulario() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [noticia, setNoticia] = useState([]);


  const Api = async (valor,region) => {
    try {
      
      const api = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_53274a28b0b7fe9b499f4781c62b8b0e901e7&q=${valor}&language=es&country=${region}`);
      console.log(api)
      if (api.status === 200) {
        let leer = await api.json();
        let noti = leer.results;
        console.log(leer);
        setNoticia(noti);
      } else {
        alert("Error en la solicitud: " + api.status);
      }
    } catch (error) {
      console.error("Error al hacer fetch:", error);
      alert("Error al obtener las noticias");
    }
  };


  const buscar = (data) => {
    if (data.opciones !== 'Opciones'&data.region!=='Opciones') {
      Api(data.opciones,data.region); 
    } else {
      alert('Por favor, selecciona una categoría.');
    }
  };
  useEffect(()=>{
 Api()
  },[])

  return (
    <>
      <div className='container'>
        <h2 className='text-center ml-3'>Buscar por Categoría:</h2>
        <Form onSubmit={handleSubmit(buscar)}>
          <Form.Select className='select' aria-label="Default select example" aria-placeholder='opciones' {...register("opciones", { required: true })}>
            <option value="Opciones">Opciones</option>
            <option value="deporte">Deporte</option>
            <option value="tecnologia">Tecnología</option>
            <option value="Criptomoneda">Criptomoneda</option>
            <option value="politica">Politica</option>
          </Form.Select>
          <Form.Select className='select' aria-label='Default select example' {...register("region",{required:true})}>
            <option value="Opciones">Region</option>
            <option value="ar">Latino America</option>
            <option value="us">Norte America</option>
            

          </Form.Select>

           {errors.region&&<span>Seleciona una region</span>}
          {errors.opciones && <span>Por favor, selecciona una opción</span>}
          <button className='btn btn-primary mt-3' type='submit'>Buscar</button>
        </Form>
      </div>

  
      <div className='container cartas mt-4'>
        {noticia.length > 0 ? (
          noticia.map((element, index) => (
            <Cardnoticias 
              key={index} 
              title={element.title} 
              img={element.image_url} 
            />
          ))
        ) : (
          <p>No hay noticias disponibles para la categoría seleccionada.</p>
        )}
      </div>
    </>
  );
}

export default Formulario;
