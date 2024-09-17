import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { Riple } from "react-loading-indicators"
import Cardnoticias from './Cardnoticias';

function Formulario() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [noticia, setNoticia] = useState([]);
  const [loading,setloading]=useState(true)


  const Api = async (valor,region) => {
    try {
    
      const api = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_53274a28b0b7fe9b499f4781c62b8b0e901e7&q=${valor}&language=es&country=${region}`);
      console.log(api)
       setloading(false)
      if (api.status === 200) {
       
        let leer = await api.json();
        let noti = leer.results;
        console.log(leer);
        setNoticia(noti);

      } 
    } catch (error) {
      console.error("Error al hacer fetch:", error);
   
    }
  };


  const buscar = (data) => {  
    setloading(true)
    if (data.opciones !== 'Opciones'&&data.region!=='Opciones') {
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
        <h2 className='text-center ml-3 my-3'>Buscar por Categoría:</h2>
      
        <Form onSubmit={handleSubmit(buscar)} className='d-flex justify-content-center'>
          <Form.Select className='select' aria-label="Default select example" aria-placeholder='opciones' {...register("opciones", { required: true })}>
            <option value="deporte">Opciones</option>
            <option value="deporte">Deporte</option>
            <option value="tecnologia">Tecnología</option>
            <option value="Criptomoneda">Criptomoneda</option>
            <option value="politica">Politica</option>
          </Form.Select>
          <Form.Select className='select' aria-label='Default select example' {...register("region",{required:true})}>
            <option value="ar">Region</option>
            <option value="ar">Latino America</option>
            <option value="us">Norte America</option>
            

          </Form.Select>

           {errors.region&&<span>Seleciona una region</span>}
          {errors.opciones && <span>Por favor, selecciona una opción</span>}
          <br />
          <button className='buscar btn btn-primary mt-3' type='submit'>Buscar</button>
        </Form>
      </div>

       <hr />
      <div className='container cartas mt-4'>
        {loading===true? (<Riple color="black" size="50px" text="Espere.." textColor="" /> 
         
          )
         : (
         
          
          noticia.map((element, index) => (
            <Cardnoticias 
              key={index} 
              title={element.title} 
              img={element.image_url} 
            />))
        )}
      </div>
    </>
  );
}

export default Formulario;
