import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import SideBar from "./components/CustomizationBase/SideBar";
import React, {useState} from "react";
import { Box } from "@mui/system";
import { nanoid } from 'nanoid';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log(source)
    let sourceClone = Array.from(source);
    let destClone = Array.from(destination);
    let cloneSource = Array.from(sourceClone);
    let removed = sourceClone[droppableSource.index];//sourceClone.splice(droppableSource.index, 1);
    removed.id += nanoid();
    sourceClone = cloneSource;
    destClone.splice(droppableDestination.index, 0, removed);
    console.log(destClone);
    let result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

const id2List = {
    droppable: 'items',
    droppable2: 'selected'
};



const SellerShopCustomization = () => {
    const [items, setItems] = useState(getItems(10));
    const [selects, setSelects] = useState(getItems(5, 10));

    const getList = id => ({items, selected: selects})[id2List[id]];

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                setSelects(items);
            }else{
                setItems(items);
            }
            console.log('DROPPED!')

        } else {

            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            setItems(result.droppable);
            setSelects(result.droppable2);
            // this.setState({
            //     items: result.droppable,
            //     selected: result.droppable2
            // });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{display: 'flex'}}>
            <Box sx={{ flexGrow: 1}}>
            <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </Box>
            <SideBar>
                <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {selects.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </SideBar>
            </Box>
        </DragDropContext>
    );
};

export default SellerShopCustomization;
