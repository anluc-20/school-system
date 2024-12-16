import TextAreaInput from "./TextAreaInput.tsx";
import ButtonAlt from "./ButtonAlt.tsx";
import IconPicker from "./IconPicker.tsx";
import PopupMenu from "./PopupMenu.tsx";

import { useState } from "react";
import { addStudyPlan} from "../services/studyPlans.ts";
import { getIcons } from "../services/icons.ts"
import { type CardProps } from "../models/CardProps.ts";
import type { SubjectRequest } from "../request/SubjectRequest.ts";
import { addSubject } from "../services/subjects.ts";
import AddNewMenu from "./AddNewMenu.tsx";
import type { StudyPlanRequest } from "../request/StudyPlanRequest.ts";
import useStudyPlanEffect from "../hooks/useStudyPlan.tsx"

enum MenuTypes {
  STUDY_PLAN,
  ICON,
}

const icons = await getIcons()

const iconCards: CardProps[] = icons.map((icon) => ({
  id: icon.id,
  icon: icon.icon_Name,
  title: icon.icon_Name,
}));

const defaultIcon = "circle_plus";
const defaultStudyPlan = "Seleccionar Plan De Estudio";


function AddSubjectReact() {
  const [showMenu, setShowMenu] = useState(false);
  const [addNewHref, setAddNewHref] = useState("");
  const [menuType, setMenuType] = useState<MenuTypes>();
  const [iconSelection, setIconSelection] = useState(defaultIcon);
  const [studyPlanSelection, setStudyPlanSelection] = useState(defaultStudyPlan);
  const [iconSelectionId, setIconSelectionId] = useState(-1);
  const [studyPlanSelectionId, setStudyPlanSelectionId] = useState(-1);
  const [subjectName, setSubjectName] = useState("");
  const [yearOfCreation, setYearOfCretion] = useState(-1);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const {studyPlanCards, setRefetchStudyPlans} = useStudyPlanEffect();

  

  const toggleMenu = () => { setShowMenu(!showMenu) }
  const toggleAddMenu = () => { setShowAddMenu(!showAddMenu); }
  const cancelAddStudyPlan = () => { setShowAddMenu(false); setRefetchStudyPlans(true) }

  function getCards(): CardProps[] {
    switch(menuType) {
      case MenuTypes.STUDY_PLAN:
        return studyPlanCards;
      
      case MenuTypes.ICON:
        return iconCards;
  
      default:
        return [];
    }
  }
  
  function sendStudyPlanRequest() {
    const request: StudyPlanRequest = {
      year_of_creation: yearOfCreation,
      associated_subject: subjectName
    }
    addStudyPlan(request).then((response) => {setRefetchStudyPlans(true); console.log(response)});
  }

  function sendSubjectRequest() {
    const request: SubjectRequest = {
      subject_name: subjectName,
      id_study_plan: studyPlanSelectionId,
      id_icon: iconSelectionId,
    }
    addSubject(request);
  }

  function handleIconSelection(id: number) {
    setIconSelection(icons.find((icon) => icon.id == id)?.icon_Name ?? defaultIcon);
    setIconSelectionId(id);
  }
  function handleStudyPlanSelection(id: number) {
    setStudyPlanSelection(studyPlanCards?.find((studyPlan) => studyPlan.id == id)?.title ?? defaultStudyPlan);
    setStudyPlanSelectionId(id);
  }

  function handleStudyPlanSelectionMenu() {
    setAddNewHref("/add_study_plan");
    setMenuType(MenuTypes.STUDY_PLAN);
    toggleMenu();
  }
  function handleIconSelectionMenu() {
    setMenuType(MenuTypes.ICON); 
    toggleMenu();
  }

  const getItemSelectionHandler = () => {
    switch(menuType) {
      case MenuTypes.STUDY_PLAN:
        return handleStudyPlanSelection;
      case MenuTypes.ICON:
        return handleIconSelection;
    default:
        return undefined;
    }
  }

  return (
    <>
      <section className="grid gap-2 p-2 grid-cols-2 grid-rows-3">
        <TextAreaInput value={subjectName} onChange={setSubjectName} placeholder="Nombre de la materia" className="row-start-1 row-span-1 col-start-1 col-span-1" ></TextAreaInput>
        <ButtonAlt text={studyPlanSelection} className="row-start-2 row-span-1 col-start-1 col-span-1" onClick={handleStudyPlanSelectionMenu} />
        <IconPicker title="Seleccionar Icono" iconName={iconSelection} className="row-start-1 row-span-2 col-start-2 col-span-1" onClick={handleIconSelectionMenu} />
        <ButtonAlt text="AÑADIR" className="row-start-3 row-span-1 col-start-1 col-span-2" onClick={sendSubjectRequest}/>
      </section>
      <PopupMenu onAdd={toggleAddMenu} show={showMenu} add={menuType === MenuTypes.ICON? false: true} cards={getCards()} onItemSelection={getItemSelectionHandler()}/>
      <AddNewMenu value={subjectName} onAdded={sendStudyPlanRequest} onYearChange={setYearOfCretion} onSubjectChange={setSubjectName} onCancel={cancelAddStudyPlan} show={showMenu} className={showAddMenu? "z-10" : "-z-10"}/>
    </>
  );
}

export default AddSubjectReact; 