import AddButton from "./AddButton";
import Card from "./Cards/Card";
import CardAlt from "./Cards/CardAlt";
import TextInput from "./TextInput";

export default function AddClassGroupReact() {
    return (
        <div className="flex flex-col">
            <div>
                <Card title="Elegir materia"/>
                <TextInput placeholder="Codigo"/>
                <CardAlt title="Elegir profesor"/>
            </div>
            <AddButton/>
        </div>
    )
}