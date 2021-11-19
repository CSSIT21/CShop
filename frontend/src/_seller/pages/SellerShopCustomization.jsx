import React, { useState } from "react";
import uuid from "uuid/v4";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageBanner from "./components/CustomizationBase/ImageBanner";
import { Box } from "@mui/system";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import YoutubeSection from "./components/CustomizationBase/YoutubeSection";
import IconButton from "@mui/material/IconButton";
import CarouselProduct from "./components/CustomizationBase/CarouselProduct";
import CarouselBanner from "./components/CustomizationBase/CarouselBanner";
import CarouselProductSelect from "./components/CustomizationBase/CarouselProductSelect";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Content = styled.div`
  margin-right: 200px;
`;

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? "dashed #4099ff" : "solid #ddd")};
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #ffffff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const List = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background: #ffffff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
`;

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
  background: #ffffff;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
  border-radius: 5px;
  background-color: #e9eef1;
`;

const ITEMS = [
  {
    id: uuid(),
    content: "ImageBanner",
  },
  {
    id: uuid(),
    content: "CarouselBanner",
  },
  {
    id: uuid(),
    content: "Image",
  },
  {
    id: uuid(),
    content: "CarouselProductSelect",
  },
  {
    id: uuid(),
    content: "CarouselProduct",
  },
  {
    id: uuid(),
    content: "Youtube",
  },
];

const SellerShopCustomization = () => {
  const dropArea = "area";
  const [state, setState] = useState({
    [dropArea]: [],
  });
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteItem = (source, id) => {
    const target = source.find((item) => item.id === id);
    const index = source.indexOf(target);
    const cloneSource = [...source];
    cloneSource.splice(index, 1);
    return cloneSource;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log("==> result", result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState({
          [destination.droppableId]: reorder(
            state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case "ITEMS":
        setState({
          [destination.droppableId]: copy(
            ITEMS,
            state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        setState(
          move(
            state[source.droppableId],
            state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  const GetComponent = ({ content, ...rest }) => {
    const Components = {
      Youtube: <YoutubeSection {...rest} id="UbYPG1GsZEI" />,
      ImageBanner: <ImageBanner {...rest} />,
      CarouselProduct: <CarouselProduct {...rest} />,
      CarouselBanner: <CarouselBanner {...rest} />,
      CarouselProductSelect: <CarouselProductSelect {...rest} />,
    };

    return Components[content] || Components["ImageBanner"];
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
            <Kiosk
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {ITEMS.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        {item.content}
                      </Item>
                      {snapshot.isDragging && <Clone>{item.content}</Clone>}
                      {/* <Clone>sdfsdfsdfsds{item.content}</Clone> */}
                    </React.Fragment>
                  )}
                </Draggable>
              ))}
            </Kiosk>
          )}
        </Droppable>
        <Content>
          {Object.keys(state).map((list, i) => {
            console.log("==> list", list);
            return (
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <Container
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {state[list].length
                      ? state[list].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                                id={index}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <IconButton
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={() => {
                                      setState(({ area }) => ({
                                        area: deleteItem(area, item.id),
                                      }));
                                      console.log(item);
                                      handleClose();
                                    }}
                                  >
                                    <DeleteRoundedIcon />
                                  </IconButton>
                                </Box>
                                <GetComponent
                                  content={item.content}
                                  {...provided.dragHandleProps}
                                  order={index}
                                />
                                <Box>
                                  Hello {item.content} {JSON.stringify(item)}
                                </Box>
                              </div>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && (
                          <Notice>Drop items here</Notice>
                        )}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            );
          })}
        </Content>
      </DragDropContext>
    </>
  );
};

export default SellerShopCustomization;
