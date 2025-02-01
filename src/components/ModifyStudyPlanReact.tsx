import { useEffect, useState, type ReactElement } from "react";
import useStudyPlanEffect from "../hooks/useStudyPlan";
import ButtonAlt from "./ButtonAlt";
import CardAddNew from "./Cards/CardAddNew.tsx";
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import './swiperStyles.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TopicCard from "./Cards/TopicCard.tsx";
import type { TopicCardProps } from "../models/TopicCardProps.ts";
import {useTopicEffect, useTopicByIdEffect} from "../hooks/useTopic.tsx";
import BottomList, { BottomListItem, type BottomListItemProps } from "./BottomList.tsx";
import CardAlt from "./Cards/CardAlt.tsx";
import { TopicList } from "../models/TopicList.ts";
import { DeleteButton } from "./DeleteButton.tsx";
import AddButton from "./AddButton.tsx";
import TopicCardInput from "./Cards/TopicCardInput.tsx";
import type { CustomResponse } from "../response/CustomResponse.ts";
import { modifyTopicStudyPlan } from "../services/topicsStudyPlans.ts";

interface Props {

}


const enum MenuType {
    NONE,
    STUDY_PLAN,
    TOPIC,
}

const enum Mode {
    ADD,
    MODIFY
}

interface StudyPlan {
    id: number;
    title: string;
}

const defaultStudyPlan: StudyPlan = 
{
    id: -1,
    title: "Seleccionar Plan De Estudio"
}
function useNewTopics(study_plan: StudyPlan, all_cards: TopicCardProps[]) {
    const {topicByIdCards, setRefetchTopicsById} = useTopicByIdEffect(study_plan.id);
    const [topicList, setTopicList] = useState<TopicList>(new TopicList([], study_plan.id));
    const [newTopicCards, setNewTopicCards] = useState<TopicCardProps[]>([]);


    function add(topic_id: number) {
        topicList.add(topic_id);
        addCard(topic_id);
    }

    function addCard(topic_id: number) {
        const card = all_cards.find((card) => card.topic_id == topic_id);
        if(!card)
            throw new Error("couldn't find topic with id: " + topic_id);

        setNewTopicCards(newTopicCards.concat(card));
    }

    function remove(topic_id: number) {
        topicList.remove(topic_id);
        removeCard(topic_id);
    }

    function removeCard(topic_id: number) {
        const index = newTopicCards.findIndex((card) => card.topic_id === topic_id);
        if(index === -1)
            throw new Error("topic doesn't exists");

        setNewTopicCards(newTopicCards.filter((card) => card.topic_id !== topic_id));
    }

    function modify(old_id: number, new_id: number) {
        topicList.modify(old_id, new_id);
        modifyCard(old_id, new_id);
    }

    function modifyCard(old_id: number, new_id: number) {
        const newCard = all_cards.find((card) => card.topic_id == new_id);
        if(!newCard)
            throw new Error("couldn't find topic with id: " + new_id);

        console.log(newCard);
        setNewTopicCards(newTopicCards.map((card) => {
            if(card.topic_id === old_id) {
                console.log("FOUND");
                return newCard;
            }
                
            return card;
        }));
        console.log(newTopicCards);
    }
    function getRequest() {
        return topicList.getRequest();
    }
    useEffect(()=> {
        setRefetchTopicsById(true);
        console.log("refetching topics...")
    },[study_plan]);

    useEffect(() => {
        console.log("reconstructing topic cards");
        setTopicList(new TopicList(topicByIdCards.map((topicCard) => {
            return {topic_id: topicCard.topic_id, relation_id: topicCard.relationship_id!}
        }), study_plan.id))
        setNewTopicCards(topicByIdCards);
        console.log(topicByIdCards);

    },[topicByIdCards])
    return { add, remove, modify, newTopicCards, getRequest}
}



function ModifyStudyPlanReact({} : Props) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuType, setMenuType] = useState<MenuType>(MenuType.NONE);
    const {studyPlanCards, setRefetchStudyPlans} = useStudyPlanEffect();
    const {topicCards} = useTopicEffect();
    const [studyPlan, setStudyPlan] = useState<StudyPlan>(defaultStudyPlan);
    const [mode, setMode] = useState<Mode>(Mode.MODIFY);
    const [selectedId, setSelectedId] = useState(-1);
    const [showAddTopicMenu, setShowAddTopicMenu] = useState(false);
    const [fullCard, setFullCard] = useState<TopicCardProps>();
    
    const { add, remove, modify, newTopicCards, getRequest} = useNewTopics(studyPlan, topicCards);

    function toggleMenu(newMenuType: MenuType) {
        if(newMenuType == menuType || showMenu == false)
            setShowMenu(!showMenu);
        setMenuType(newMenuType);
    }


    function handleStudyPlanSelection(id: number) {
        const card = studyPlanCards.find((studyPlan) => studyPlan.id == id);
        if(card !== undefined) {
            const studyPlan: StudyPlan =
            {
                id: id,
                title: card.title 
            }
            setStudyPlan(studyPlan);
        } else {
            setStudyPlan(defaultStudyPlan);
        }
    }
    function handleAddTopicToList() {
        setMode(Mode.ADD);
        console.log("entering ADD mode");
        toggleMenu(MenuType.TOPIC)
    }
    function handleModifyTopicFromList(topic_id: number) {
        setMode(Mode.MODIFY);
        console.log("entering MODIFY mode");
        setSelectedId(topic_id);
        toggleMenu(MenuType.TOPIC)
    }
    function showFullCard(topic_id: number) {
        const card = newTopicCards.find((topicCard) => topicCard.topic_id == topic_id);
        if(card !== undefined) {
            setFullCard(card);
        }
        
    }
    function handleTopicSelectionFromList(id: number) {
        console.log(`adding topic with id: ${id}`);
        switch(mode) {
            case Mode.ADD:
                add(id);
                break;
            case Mode.MODIFY:
                console.log(`trying modify old: ${selectedId}, new: ${id}`)
                modify(selectedId, id);
                break;
        }
        toggleMenu(menuType);
    }
    function handleTopicRemoveFromList() {
        console.log(`removing topic with id: ${selectedId}`);
        remove(selectedId);
        toggleMenu(menuType)
    }

    function handleTopicAdded(response: Promise<CustomResponse<number>>) {
        setShowAddTopicMenu(false);
        console.log("se esta añadiendo el topic");
        response
            .then((response) => {
                if(response.success === 1)
                    console.log("se ha añadido correctamente el topic!");
                if(response.success === 0)
                    console.log(`no se pudo añadir el topic... motivo: ${response.message}`);
            })
            .catch((reason) => {
                console.error(`error añadiendo el topic! motivo: ${reason}`);
            })
    }

    function handleModifyStudyPlan() {
        const request = getRequest();
        console.log(request);
        modifyTopicStudyPlan(request)
            .then((response) => {
                if(response.success === 1) {
                    setRefetchStudyPlans(true);
                    console.log("se ha modificado correctamente el studyPlan");
                }
                    
                if(response.success === 0)
                    console.log(`no se pudo modificar el studyPlan... motivo: ${response.message}`);
            })
            .catch((reason) => {
                console.error(`error modificando el studyPlan! motivo: ${reason}`);
            })
    }

    

    function getItems(): ReactElement<BottomListItemProps>[] {
        switch(menuType) {
            case MenuType.STUDY_PLAN:
                const result = studyPlanCards.map((studyPlan) => (
                    <BottomListItem key={studyPlan.id} id={studyPlan.title}>
                        <CardAlt id={studyPlan.id} title={studyPlan.title} onClick={handleStudyPlanSelection} className="px-2"/>
                    </BottomListItem>
                    
                ))
                result.unshift(
                    <BottomListItem key="añadir" id="añadir">
                        <div className="flex basis-full justify-center">
                            <div className="w-1/2">
                                <AddButton className="size-14 p-3 w-full"/>
                            </div>
                        </div>
                    </BottomListItem>
                );
                return result;

            case MenuType.TOPIC:
                const controls = [
                    <BottomListItem key="controls" id="añadir">
                        <div className={`basis-full grid gap-4 ${mode === Mode.MODIFY?"grid-cols-2" : "grid-cols-1"}` }>
                            <AddButton onAdd={() => setShowAddTopicMenu(true)} className="size-14 p-3 w-full"/>
                            {mode === Mode.MODIFY && <DeleteButton onClick={handleTopicRemoveFromList} className="w-full"/>}
                        </div>
                    </BottomListItem>,
                    ];
                const result2 = topicCards.map((topicCard) => (
                    <BottomListItem key={topicCard.topic_id} id={topicCard.topic_name}>
                        <CardAlt onClick={handleTopicSelectionFromList} id={topicCard.topic_id} title={topicCard.topic_name} className="px-2"/>
                    </BottomListItem>
                ));
                controls.push(...result2);
                return controls;

            default: return [];
        }
    }

    return (
    <>
    {fullCard && 
    <div 
        onClick={() => setFullCard(undefined)}
        className="z-20 absolute w-full h-svh flex flex-col justify-center items-center bg-[#0000007a]">
        <div className="size-fit">
            <TopicCard
                showExtra
                topic_id={fullCard.topic_id}
                topic_name={fullCard.topic_name}
                description={fullCard.description}
            />
        </div>
    </div>
    }
    <nav className="flex flex-col py-4 px-2">
        <ButtonAlt text={studyPlan.title} onClick={()=> toggleMenu(MenuType.STUDY_PLAN)}/>
        <Swiper
        className="size-full py-8"
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation= {true}
        pagination={{ clickable: true }}
        
        >
            {
                newTopicCards.map((topicCard) => (
                    <SwiperSlide key={topicCard.topic_id} className="py-10 px-12 ">
                        <TopicCard onEdit={handleModifyTopicFromList} onClick={showFullCard} onDelete={handleTopicRemoveFromList} topic_id={topicCard.topic_id} topic_name={topicCard.topic_name} description={topicCard.description}/>
                    </SwiperSlide>
                ))
            }
            <SwiperSlide className="py-10 px-12 ">
                <CardAddNew title="añadir nuevo tema" onAdd={handleAddTopicToList} className="p-5"/>
            </SwiperSlide>
        </Swiper>
        <ButtonAlt text="GUARDAR CAMBIOS" onClick={handleModifyStudyPlan}/>
    </nav>
    <BottomList show={showMenu}>
        {getItems()}
    </BottomList>
    <BottomList show={showMenu} hidden={!showAddTopicMenu}>
        <BottomListItem key="input" id="name">
            <TopicCardInput onAdd={handleTopicAdded} onCancel={() => setShowAddTopicMenu(false)} className="w-full"/>
        </BottomListItem>
    </BottomList>
    </>
    );
}


export default ModifyStudyPlanReact;