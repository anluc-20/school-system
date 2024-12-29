import BottomList, { BottomListItem } from "./BottomList";
import IndividualCard from "./Cards/IndividualCard";

export default function IndividualList() {
    return(
        <BottomList show>
            <BottomListItem id="1">
                <IndividualCard id={44760525} firstName='Tomas' lastName='Aban'/>
            </BottomListItem>
            <BottomListItem id="2">
                <IndividualCard id={44760525} firstName='Tomas' lastName='Aban'/>
            </BottomListItem>
            <BottomListItem id="3">
                <IndividualCard id={44760525} firstName='Tomas' lastName='Aban'/>
            </BottomListItem>
            <BottomListItem id="4">
                <IndividualCard id={44760525} firstName='Tomas' lastName='Aban'/>
            </BottomListItem>
        </BottomList>
    );
}