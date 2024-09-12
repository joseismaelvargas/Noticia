import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"
import Cardnoticias from './Cardnoticias';

function Formulario() {
  const { register, handleSubmit ,formState:{errors}} = useForm();
  const[noticia,setnoticia]=useState([])
  // const[noticia,setnoticia]=useState()
 const Api= async()=>{
  try{
    const api=await fetch("https://newsdata.io/api/1/latest?apikey=pub_53274a28b0b7fe9b499f4781c62b8b0e901e7&q=pizza&language=es")
     console.log(api)
    if(api.status===200){
      let leer=await api.json()
      let noti=leer.results

      
      setnoticia(noti)
    
       
    }
  }catch{
    alert("Error")
  }
}
Api()
  useEffect(()=>{
  
  },[])
 
console.log(noticia)
  return (
    <>
    <div className='div container'>
      <h2 className='text center ml-3'> Buscar por Categoria :</h2>
      <Form.Select className='select' aria-label="Default select example">
      <option className='title'>Opciones</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    </div>
    <div className='container cartas'>
      {noticia.map((element)=>(
          <Cardnoticias key={element.source_id} title={element.title} img={element.image_url}></Cardnoticias>
      ))
      
      }
     
    </div>
    </>
  );
}

export default Formulario;