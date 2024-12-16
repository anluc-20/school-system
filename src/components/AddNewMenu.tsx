import TitleBar from "./TitleBar.tsx";
import NumberInput from "./NumberInput.tsx";
import ButtonAlt from "./ButtonAlt.tsx";
import TextAreaInput from "./TextAreaInput.tsx";


interface Props {
  className?: string;
  onAdded?: () => void;
  onCancel?: () => void;
  onSubjectChange?: (input: string) => void;
  onYearChange?: (input: number) => void;
  show: boolean;
  value: string;
}

function AddNewMenu({value, show, className, onAdded, onCancel, onSubjectChange, onYearChange }: Props) {

  return (
    <nav className={`fixed bg-primary w-full h-1/2  ${className} ${show ? "top-1/2" : "top-full"} flex flex-col`}>
      <TitleBar title="Añadir nuevos" icon="circle_plus"/>
      <section className="flex flex-col justify-center gap-4 px-2 flex-1">
        <TextAreaInput placeholder="Nombre de la materia" onChange={onSubjectChange} value={value}/>
        <NumberInput placeholder="Año" onChange={onYearChange}/>
        <div className="grid grid-flow-col gap-2 ">
          <ButtonAlt text="CANCELAR" onClick={onCancel}/>
          <ButtonAlt text="AÑADIR" onClick={onAdded}/>
        </div>
      </section>
    </nav>
  );
};

export default AddNewMenu; 