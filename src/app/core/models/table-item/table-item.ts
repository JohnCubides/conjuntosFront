import { TemplateBase } from './../template-base';
import { Events } from './../events/events';
export interface ITableItem extends TemplateBase {
    id: string;
    items?: ITableItem[] | undefined;
    type?: 'button' | 'checkbox' | 'text' | 'link';
    positionIcon?: 'left' | 'right';
    state?: boolean | false;
    disabled?: boolean | false;
    visible?: boolean | false;
    tooltip?: string;
}

/**
 * Clase para la especificacion de un elemento de menu
 */
export class TableItem implements ITableItem {
    id: string;
    class?: string;
    text?: string;
    state?: boolean | false;
    permissionName?: string;
    icon?: string;
    svgIcon?: string;
    svgIconUrl?: string;
    route?: string;
    items?: TableItem[];
    events?: Events[];
    feature?: string;
    visible?: boolean | false;
    disabled?: boolean | false;
    type?: 'button' | 'checkbox' | 'text' | 'link';
    positionIcon?: 'left' | 'right';
    tooltip?: string;

    constructor(menu: ITableItem) {
        this.id = menu.id;
        this.class = menu.class;
        this.text = menu.text;
        this.permissionName = menu.permissionName;
        this.icon = menu.icon;
        this.svgIcon = menu.svgIcon;
        this.svgIconUrl = menu.svgIconUrl;
        this.route = menu.route;
        this.items = menu.items;
        this.events = menu.events;
        this.feature = menu.feature;
        this.type = menu.type;
        this.positionIcon = menu.positionIcon;
        this.state = menu.state;
        this.visible = menu.visible;
    }
}
