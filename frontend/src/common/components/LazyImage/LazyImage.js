import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LayImageInner = styled.div`
    position: relative;
    z-index: 2;
`;

const LazyImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 100%;
    ${props => !!props.height ? `height: ${props.height}` : ''}
`;

const LazyImagePlaceholder = styled.img`
    width: 100%;
    height: 100%;
    filter: blur(4px);
    transform: scale(1.1);
    transition: all ${props => props.duration || '.5s'} ease-in-out;
    pointer-events: none;
    z-index: 1;
    opacity: ${props => props.isLoaded ? 0 : 1};
`;

const LazyImageSource = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 0;
    opacity: 0;
    opacity: ${props => props.isLoaded ? 1 : 0};
`;

const LazyImage = ({
    src="",
    lazy,
    duration='.5s',
    children,
    onLoadedHandler=()=>{},
    ...rest
}) => {
    const [isLoaded, setLoaded] = useState({ value: false, event: null});

    useEffect(() => {
        if(isLoaded.value)
            onLoadedHandler(isLoaded.event)
    },[isLoaded,onLoadedHandler]);

    const onLoaded = event => {
        setLoaded({
            event,
            value: true
        });
    };

    return <LazyImageWrapper {...rest}>
        {(children) ? <LayImageInner>
            {children}
        </LayImageInner> : <></>}
        <LazyImageSource duration={duration} src={src} isLoaded={isLoaded.value} onLoad={onLoaded}/>
        <LazyImagePlaceholder duration={duration} src={lazy || src} isLoaded={isLoaded.value}/>
    </LazyImageWrapper>;
}

export default LazyImage;