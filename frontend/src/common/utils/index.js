import { useLocation } from "react-router";
import qs from 'qs';

export function For(props){
    const each = props.each || [];
    return <>{each.map(props.children)}</>;
}

export function useQuery() {
    return qs.parse(useLocation().search,{ ignoreQueryPrefix: true});
}

export function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;
            
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
};