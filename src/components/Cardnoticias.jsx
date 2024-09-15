import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// Componentes:
// Título
// Formulario (este contiene el select)
// ListaNoticias
// Noticia 

// Desde el select superior, debe poder elegir las diferentes categorías (provistas por la api ver en la documentación) y cargar en cards las mismas.

function Cardnoticias( {key,title,img}) {
  return (
    <Card style={{ width: '18rem' }} key={key} className='carta'>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default Cardnoticias;