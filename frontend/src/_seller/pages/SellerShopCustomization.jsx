import React, { useState, useEffect } from "react";
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
import { getUrl } from "~/common/utils";
import axios from "axios";
import config from "~/common/constants";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import authState from "~/common/store/authState";
import LoadingButton from "@mui/lab/LoadingButton";

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
    type: "Banner",
  },
  {
    id: nanoid(),
    type: "BannerCarousel",
  },
  {
    id: nanoid(),
    type: "Video",
  },
  {
    id: nanoid(),
    type: "ProductCarousel",
  },
  {
    id: nanoid(),
    type: "ProductCarouselSelect",
  },
];
const SellerShopCustomization = () => {
  const auth = useRecoilValue(authState);
  const shopName = "Shop name";
  const dropArea = "area";
  const [loading, setloading] = useState(false);
  const [state, setState] = useState({
    [dropArea]: [],
  });
  const [categories, setcategories] = useState([]);
  const [sectionInfos, setSectionInfos] = useState({});
  const [sectionInfosHistory, setSectionInfosHistory] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };
  console.log("sectionInfos", sectionInfos);
  console.log("sectionInfosHistory", sectionInfosHistory);
  console.log("state", state);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `${config.SERVER_URL}/shopcustomization/category/${auth.user.shop_info[0].id}`
        )
        .then(({ data }) => {
          const computedcategories = data.categories.map((e) => {
            return { title: e.title, id: e.id };
          });
          return computedcategories;
        })
        .then((computedcategories) => {
          setcategories(computedcategories);
        });
      await axios
        .get(
          `${config.SERVER_URL}/shopcustomization/info/${auth.user.shop_info[0].id}`
        )
        .then(async ({ data }) => {
          await setSectionInfos(data.sections_info);
          await setSectionInfosHistory(data.sections_info);
        });
      await axios
        .get(
          `${config.SERVER_URL}/shopcustomization/${auth.user.shop_info[0].id}`
        )
        .then(({ data }) => setState({ area: data.sections }));
    })();
  }, []);
  const saveChange = async () => {
    setloading(true);
    await axios
      .patch(
        `${config.SERVER_URL}/shopcustomization/${auth.user.shop_info[0].id}`,
        { sections: state.area, device: getDeviceType() }
      )
      .then(async () => {
        await Object.entries(sectionInfos).forEach(async (e) => {
          const item = state.area.find((item) => e[0] == item.id);
          switch (item.type) {
            case "Banner":
              if (sectionInfosHistory[e[0]] !== sectionInfos[e[0]]) {
                const url = await getUrl(e[1].content.file);
                if (url.success) {
                  axios.post(`${config.SERVER_URL}/shopcustomization/banner`, {
                    id: e[0],
                    path: url.original_link,
                    thumbnail: url.original_link,
                    title: e[1].content.title.slice(0, 50),
                  });
                }
              }
              break;
            case "BannerCarousel":
              if (sectionInfosHistory[e[0]] !== sectionInfos[e[0]]) {
                const banners = [];
                for (const element of e[1].content.banners) {
                  if (element.file) {
                    const url = await getUrl(element.file);
                    if (url.success) {
                      banners.push({
                        id: element.id,
                        title: element.title.slice(0, 50),
                        path: url.original_link,
                      });
                    }
                  } else {
                    banners.push({
                      id: element.id,
                      title: element.title.slice(0, 50),
                      path: element.path,
                    });
                  }
                }
                if (banners.length != 0) {
                  await axios.post(
                    `${config.SERVER_URL}/shopcustomization/bannercarousel`,
                    {
                      id: e[0],
                      banners: banners,
                    }
                  );
                }
              }
              break;
            case "Video":
              if (sectionInfosHistory[e[0]] !== sectionInfos[e[0]]) {
                await axios.post(
                  `${config.SERVER_URL}/shopcustomization/video`,
                  {
                    id: e[0],
                    path: e[1].content.path,
                  }
                );
              }
              break;
            case "ProductCarousel":
              if (sectionInfosHistory[e[0]] !== sectionInfos[e[0]]) {
                await axios.post(
                  `${config.SERVER_URL}/shopcustomization/productcarousel`,
                  {
                    id: e[0],
                    category: e[1].content.category,
                  }
                );
              }
              break;
            case "ProductCarouselSelect":
              if (sectionInfosHistory[e[0]] !== sectionInfos[e[0]]) {
                await axios.post(
                  `${config.SERVER_URL}/shopcustomization/productcarouselselect`,
                  {
                    id: e[0],
                    filter_name: e[1].header,
                    products: e[1].content.products,
                  }
                );
              }
              break;
          }
        });
        setloading(false);
        Swal.fire({
          title: "Success",
          text: "Sections Successfully Save!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((e) => {
        console.log(e.message);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const deleteItem = (source, id) => {
    const target = source.find((item) => item.id === id);
    const index = source.indexOf(target);
    const cloneSource = [...source];
    if (typeof sectionInfos[id] !== "undefined") {
      setSectionInfos((sectionInfos) => {
        delete sectionInfos[id];
        return sectionInfos;
      });
    }
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

  const GetComponent = ({ type, ...rest }) => {
    const Components = {
      Video: <YoutubeSection {...rest} />,
      Banner: <ImageBanner {...rest} />,
      ProductCarousel: <CarouselProduct {...rest} />,
      BannerCarousel: <CarouselBanner {...rest} />,
      ProductCarouselSelect: <CarouselProductSelect {...rest} />,
    };

    return Components[type] || Components["Banner"];
  };

  const GetIcon = ({ type, ...rest }) => {
    const Components = {
      Banner: <ImageBannerIcon {...rest} />,
      BannerCarousel: <CarouselBannerIcon {...rest} />,
      Video: <YoutubeEmbedIcon {...rest} />,
      ProductCarousel: <ProductCarouselIcon {...rest} />,
      ProductCarouselSelect: <ProductCarouselSelectIcon {...rest} />,
    };

    return Components[type] || Components["Banner"];
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: `calc(100vw - 280px)`,
          height: "100px",
          padding: "1rem 5rem 1rem 1rem",
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

        <LoadingButton
          loading={loading}
          onClick={saveChange}
          variant="contained"
          sx={{ padding: "10px 30px", width: "100px" }}
        >
          Save
        </LoadingButton>
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
                          <GetIcon type={item.type} />
                        </Item>
                        {snapshot.isDragging && (
                          <Clone>
                            <GetIcon type={item.type} />
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
                                    type={item.type}
                                    id={item.id}
                                    information={sectionInfos}
                                    setInformation={setSectionInfos}
                                    categories={categories}
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
