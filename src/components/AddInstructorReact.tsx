import { useForm } from "../hooks/useForm";
import { type IndividualRequest } from "../request/IndividualRequest";
import { addInstructor} from "../services/individuals";
import AddButton from "./AddButton";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";


export default function AddInstructorReact() {
    const { sending, error, sendRequest, modifyRequest } =
        useForm<IndividualRequest>(addInstructor, {});

    function handleIdChange(id: number) {
        modifyRequest(() => 
            ({
                id: id,
            })
        )
    }
    function handleFirstNameChange(firstName: string) {
        modifyRequest(() => 
            ({
                first_Name: firstName,
            })
        )
    }
    function handleLastNameChange(lastName: string) {
        modifyRequest(() => 
            ({
                last_Name: lastName,
            })
        )
    }
    return(
        <div className="flex flex-col gap-2 mx-4 mt-4">
            <NumberInput onChange={handleIdChange} placeholder="DNI"/>
            <TextInput onChange={handleLastNameChange} placeholder="Apellido"/>
            <TextInput onChange={handleFirstNameChange} placeholder="Nombre"/>
            <AddButton onAdd={sendRequest}/>
            {error && <p>Ha ocurrido un error: {error.message}</p>}
            {sending && <p>Enviando peticion...</p>}
        </div>
    );
}