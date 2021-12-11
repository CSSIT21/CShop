import React, { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageBanner from "./components/CustomizationBase/ImageBanner";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import YoutubeSection from "./components/CustomizationBase/YoutubeSection";
import IconButton from "@mui/material/IconButton";
import CarouselProduct from "./components/CustomizationBase/CarouselProduct";
import CarouselBanner from "./components/CustomizationBase/CarouselBanner";
import CarouselProductSelect from "./components/CustomizationBase/CarouselProductSelect";
import ImageBannerIcon from "./components/CustomizationBase/DragableIcon/ImageBannerIcon";
import CarouselBannerIcon from "./components/CustomizationBase/DragableIcon/CarouselBannerIcon";
import YoutubeEmbedIcon from "./components/CustomizationBase/DragableIcon/YoutubeEmbedIcon";
import ProductCarouselIcon from "./components/CustomizationBase/DragableIcon/ProductCarouselIcon";
import ProductCarouselSelectIcon from "./components/CustomizationBase/DragableIcon/ProductCarouselSelectIcon";
import Button from "@mui/material/Button";

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

  destClone.splice(droppableDestination.index, 0, { ...item, id: nanoid() });
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
  margin-top: 100px;
  margin-right: 300px;
`;

const Item = styled.div`
  user-select: none;
  background-color: #ffffff;
  border-radius: 3px;

  padding: 1rem 2.5rem;
  border: 1px ${(props) => props.isDragging && "dashed #4099ff"};
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
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
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 0;
  width: 300px;
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
    id: nanoid(),
    content: "ImageBanner",
  },
  {
    id: nanoid(),
    content: "CarouselBanner",
  },
  {
    id: nanoid(),
    content: "Youtube",
  },
  {
    id: nanoid(),
    content: "CarouselProduct",
  },
  {
    id: nanoid(),
    content: "CarouselProductSelect",
  },
];

const SellerShopCustomization = () => {
  const shopName = "Shop name";
  const dropArea = "area";
  const [state, setState] = useState({
    [dropArea]: [],
  });
  const [sectionInfos, setSectionInfos] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
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
  console.log(state);
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

  const GetComponent = ({ type, ...rest }) => {
    const Components = {
      Youtube: <YoutubeSection {...rest} />,
      ImageBanner: <ImageBanner {...rest} />,
      CarouselProduct: <CarouselProduct {...rest} />,
      CarouselBanner: <CarouselBanner {...rest} />,
      CarouselProductSelect: <CarouselProductSelect {...rest} />,
    };

    return Components[type] || Components["ImageBanner"];
  };

  const GetIcon = ({ type, ...rest }) => {
    const Components = {
      ImageBanner: <ImageBannerIcon {...rest} />,
      CarouselBanner: <CarouselBannerIcon {...rest} />,
      Youtube: <YoutubeEmbedIcon {...rest} />,
      CarouselProduct: <ProductCarouselIcon {...rest} />,
      CarouselProductSelect: <ProductCarouselSelectIcon {...rest} />,
    };

    return Components[type] || Components["ImageBanner"];
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: `calc(100vw - 280px)`,
          height: "100px",
          padding: "1rem",
          backgroundColor: "#FFE8E1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: "999",
        }}
      >
        <Typography
          fontWeight="600"
          fontSize="20px"
          color="#FD6637"
          sx={{ padding: "0 2rem" }}
        >
          {shopName}
        </Typography>
        <Button variant="contained">Save</Button>
      </Box>
      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="ITEMS" isDropDisabled={true}>
            {(provided, snapshot) => (
              <Kiosk
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <Typography
                  fontWeight="600"
                  fontSize="20px"
                  color="#FD6637"
                  sx={{ padding: "0 2rem" }}
                >
                  Drag item to section
                </Typography>
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
                          <GetIcon type={item.content} />
                        </Item>
                        {snapshot.isDragging && (
                          <Clone>
                            <GetIcon type={item.content} />
                          </Clone>
                        )}
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
                                  key={item.id}
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
                                        setInformation((info) => {
                                          delete info[item.id];
                                          return info;
                                        });
                                        console.log(item);
                                        handleClose();
                                      }}
                                    >
                                      <DeleteRoundedIcon />
                                    </IconButton>
                                  </Box>
                                  <GetComponent
                                    type={item.content}
                                    id={item.id}
                                    information={sectionInfos}
                                    setInformation={setSectionInfos}
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
      </Box>
    </>
  );
};

export default SellerShopCustomization;
