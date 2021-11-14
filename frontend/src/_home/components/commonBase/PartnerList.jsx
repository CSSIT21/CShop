import { Box } from "@mui/system"
import { Typography, ImageListItem, ImageList } from '@mui/material';
import { For } from "~/common/utils/index"; 

const PartnerList = ({
	title = "",
	items = [],
}) => {

	return (
		<>
            <Typography 
				component="h6" 
				fontSize="14px" 
				fontWeight={500} 
				color="#A0A3BD"
				mb={4}
			>
				{title}
			</Typography>

            <ImageList cols={3} gap={6} >
                <For each={items} children={(item) => (
                    <ImageListItem key={item.id}>
                        <img
                            style={imgStyle}
                            src={item.url}
                            alt={item.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                    )} />
            </ImageList>
        </>
	);
};

const imgStyle = {
    objectFit: "contain", 
    borderRadius: "15px", 
    width: "90px"
};

export default PartnerList;
