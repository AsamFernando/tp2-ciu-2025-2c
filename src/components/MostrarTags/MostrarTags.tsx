import { useContext, useEffect, useState } from "react"
import { TagsContext } from "../../Contexts"
import { Badge, Button, Stack } from "react-bootstrap"
import type { handleClickType, tagSeleccionadoType } from "../../Types/Types"

const TagSeleccionado = ({handleClick, tag}:tagSeleccionadoType) => {
    const [seleccionado, setSeleccionado] = useState<boolean>(false)
    const {id, name} = tag

    const handleSeleccionado = () => {
        setSeleccionado(!seleccionado)
    }

    useEffect(() => {
            handleClick({id, seleccionado})
        },[seleccionado])
    
    return (
        <Badge
            as={Button}
            value={tag.id}
            pill
            bg={seleccionado?"danger":"dark"}
            onClick={handleSeleccionado}
            style={{color:'white', marginBottom:'1rem', borderColor:seleccionado?"rgb(220 53 69)":"white"}}
        >
            {`${name} `}
            <i className={seleccionado?"bi bi-x-circle":""}></i>
        </Badge>
    )
}

const MostrarTags = ({handleClick}:handleClickType) => {
    const {tags} = useContext(TagsContext)
    return (
        tags.length > 0 ?
        <Stack direction="horizontal" gap={2}>
            {tags.map((tag, i) =>
                <TagSeleccionado key={i} tag={tag} handleClick={handleClick} />
            )}
        </Stack>
        :
        <p>No hay tags disponibles</p>
    )
}

export default MostrarTags;