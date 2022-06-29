import $ from 'jquery';

export function unLoad() { 
    return $("#pre-loader").fadeOut();
}
export function Load() { 
    return $("#pre-loader").fadeIn();
}