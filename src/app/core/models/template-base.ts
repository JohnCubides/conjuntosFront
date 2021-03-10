import { Events } from './events/events';

export abstract class TemplateBase {
    public abstract id: string | undefined;
    public abstract class?: string | undefined;
    public abstract text?: string | undefined;
    public abstract icon?: string | undefined;
    public abstract svgIcon?: string | undefined;
    public abstract svgIconUrl?: string | undefined;
    public abstract route?: string | undefined;
    public abstract feature?: string | undefined;
    public abstract events?: Events[] | undefined;
    public abstract permissionName?: string | undefined;
    constructor() {}
}
