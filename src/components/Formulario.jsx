import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Cardnoticias from './Cardnoticias';

function Formulario() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [noticia, setNoticia] = useState([]);

  // Función para llamar a la API con el valor seleccionado
  const Api = async (valor) => {
    try {
      const api = await fetch(`https://newsapi.org/v2/everything?q=${valor}&apiKey=aea3419985dd49e29d64da46792d32ea`);
      if (api.status === 200) {
        let leer = await api.json();
        let noti = leer.articles;
        console.log(noti);
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
    if (data.opciones !== 'Opciones') {
      Api(data.opciones); 
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
          <Form.Select className='select' aria-label="Default select example" {...register("opciones", { required: true })}>
            <option value="Opciones">Opciones</option>
            <option value="deporte">Deporte</option>
            <option value="tecnologia">Tecnología</option>
            <option value="Criptomoneda">Criptomoneda</option>
          </Form.Select>
          {errors.opciones && <span>Por favor, selecciona una opción</span>}
          <button className='btn btn-primary mt-3' type='submit'>Buscar</button>
        </Form>
      </div>

      {/* Mostrar noticias */}
      <div className='container cartas mt-4'>
        {noticia.length > 0 ? (
          noticia.map((element, index) => (
            <Cardnoticias 
              key={index} 
              title={element.title} 
              img={element.urlToImage} 
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
