export const BASIC_MODAL_CONFIG = {
    resizable: false,
    adaptive: false,
    draggable: false,
    scrollable: false,
    minHeight: 0,
    minWidth: 0,
    height: 'auto',
    width: '450',
    shiftX: 0.5,
    transition: 'modal',
    overlayTransition: 'fade',
    clickToClose: true,
    focusTrap: true
}

export const NEWSLETTER_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: 382
}

export const MOBILE_MENU_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: '100%',
    height: '100%'
}

export const PRODUCT_INQUIRY_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: '100%',
    adaptive: true,
    maxWidth: 1200
}

export const MOBILE_FILTER_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: '100%',
    adaptive: true,
    maxWidth: 382
}
export const PRODUCT_FILTERS_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: '100%',
    height: '100%',
    adaptive: true
}

export const PRODUCT_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: '100%',
    adaptive: true,
    maxWidth: 1200
}

export const CONFIRMATION_MODAL_CONFIG = {
    ...BASIC_MODAL_CONFIG,
    width: 382
}