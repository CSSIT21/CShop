import React from 'react'
import p1 from "../picture/1.jpg"
import p2 from "../picture/2.jpg"
import p3 from "../picture/3.jpg"
import p4 from "../picture/4.jpg"
import p5 from "../picture/5.jpg"
import p6 from "../picture/Banner.png"
import Carousel from "../../common/components/Carousel";
import { useState } from "react";
import LazyImage from "../../common/components/LazyImage/LazyImage";
import { makeStyles } from "@mui/styles";
import { border, display } from '@mui/system'

const Showpic = () => {

    const bannerItems = [
        {id: 0, url: p6,},
        {id: 1, url: p6,},
        {id: 2, url: p6,},
        {id: 3, url: p6,},
        {id: 4, url: p6,},
        {id: 5, url: p6,},
      ];

      const [page, setPage] = useState(0);
      const classes = useStyles();

    return (
        <div className={classes.picture} style={{}}>
             <Carousel
             items={bannerItems}
             pageState={page}
             setPageState={setPage}
             loop={true}
             itemsPerRow={1}
             hideArrow={false}
           >
             {(item) => (
               <LazyImage
                 src={item.url}
                 lazy="https://via.placeholder.com/1140x516.png"
                 key={item.id}
               />
             )}
           </Carousel>
           </div>
    )
}
const useStyles = makeStyles({
    picture: {
      width: '70%',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '15vw',
      marginTop: '2%',
      
    },
  
  });
  


export default Showpic
