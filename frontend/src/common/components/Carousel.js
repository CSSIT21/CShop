import CarouselBase from "./CarouselBase"; ฃ

const Carousel = ({
  items = [],
  itemsPerRow = 1,
  rows = 1,
  gap = 10,
  loop = false,
  pageState = 0,
  setPageState = void 0,
  children,
  ...rest
}) => {
  return (
    <CarouselBase
      cols={itemsPerRow}
      rows={rows}
      gap={gap}
      loop={loop}
      pageState={pageState}
      setPageState={setPageState}
      hideArrow
      {...rest}
    >
      {items.map((item, idx) => (
        <CarouselBase.Item key={idx}>{children(item, idx)}</CarouselBase.Item>
      ))}
    </CarouselBase>
  );
};

export default Carousel;
