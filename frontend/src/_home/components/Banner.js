import { useState } from "react";
import Carousel from "../../common/components/Carousel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Banner = () => {
  const items = [
    {
      id: 1,
      title: "1",
      description: "werewrwerwe",
    },
    {
      id: 2,
      title: "2",
      description: "pytuiui",
    },
    {
      id: 3,
      title: "3",
      description: "pytuiui",
    },
    {
      id: 4,
      title: "4",
      description: "pytuiui",
    },
    {
      id: 5,
      title: "5",
      description: "pytuiui",
    },
  ];
  const [page, setPage] = useState(0);

  return (
    <>
      <Button variant="contained" onClick={() => setPage(page - 1)}>
        &larr;
      </Button>
      <Button variant="contained" onClick={() => setPage(page + 1)}>
        &rarr;
      </Button>
      <Carousel
        items={items}
        pageState={page}
        setPageState={setPage}
        loop={true}
        itemsPerRow={2}
      >
        {(item, idx) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image=""
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        )}
      </Carousel>
    </>
  );
};

export default Banner;
