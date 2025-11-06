import { useEffect, useState } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";

const MostrarImagenes = ({urls, handleClick}:{urls:string[], handleClick:(urlBorrar:string)=> void}) => {
    const [url, setUrl] = useState<string>("")

    const handleBorrarImagen = (urlBorrar:string) => {
        setUrl(urlBorrar)
        console.log(urlBorrar)
    }

    useEffect(() => {
        handleClick(url)
    },[url])

    return (
        urls.length > 0 ?
            <ListGroup variant="flush" style={{margin:'3rem'}}>
                {urls.map((url:string, i:number) => (
                    <ListGroup.Item
                        key={i}
                        className="d-flex justify-content-between"
                    >
                        ${url}
                        <Badge
                            as={Button}
                            bg="black"
                            style={{width:'fit-content', height:'fit-content', border:'none'}}
                            value={url}
                            onClick={() => handleBorrarImagen(url)}
                        >
                            <i className="bi bi-x-lg"></i>
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        :
        <p>No hay imagenes cargadas</p>
    )
}

export default MostrarImagenes;