import { useLocation } from "react-router";
import qs from 'qs';

export function For(props){
    const each = props.each || [];
    return each.map(props.children);
}

export function useQuery() {
    return qs.parse(useLocation().search,{ ignoreQueryPrefix: true});
}