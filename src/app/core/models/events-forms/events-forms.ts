import { Renderer2, Injector } from '@angular/core';

export class EventsForms {

    private renderer: Renderer2;
    private isItem = false;

    constructor(injector: Injector) {
        this.renderer = injector.get(Renderer2);
    }

    private delEvents(items: any[]) {
        let cont = 0;
        items.forEach((item: any) => {
            cont = 0;
            items.forEach((c: any) => {
                if ((c.id === item.id)) {
                    cont++;
                }
            });
            if (cont > 1) {
                item.events = undefined;
                item.route = undefined;
            }
            if (item.items) {
                this.delEvents(item.items);
            }
        });
    }

    public events(params: any[], rootElement: any, menuParams?: any) {
        setTimeout(() => {
            if (params) {
                if (menuParams === undefined) {
                    params.forEach((i: any) => {
                        this.addEvents(i, rootElement);
                        if (i.items) {
                            this.events(i.items, rootElement);
                        }
                    });
                } else {
                    this.addEvents(menuParams, rootElement);
                    if (menuParams.items) {
                        this.events(menuParams.items, rootElement);
                    }
                }
            }
        }, 0);
    }

    private addEvents(item: any, rootElement: any) {
        if (item.events) {
            item.events.forEach(e => {
                const nativeE = this.getElementById(rootElement, item.id);
                if (nativeE !== null) {
                    this.renderer.listen(nativeE, e.name, e.event);
                }
            });
        }
    }

    private getElementById(rootElement: any, id: any) {
        let result = null;
        this.isItem = false;
        if (rootElement !== void 0 && rootElement.nativeElement !== void 0) {
            const items = rootElement.nativeElement.children;
            result = this.children(items, id);
        }
        return result;
    }

    private children(children: any[], id: string): any {
        let item = null;
        if (!this.isItem) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].id === id) {
                    item = children[i];
                    this.isItem = true;
                    break;
                }
            }
            if (!this.isItem) {
                for (let i = 0; i < children.length; i++) {
                    const it = this.children(children[i].children, id);
                    if (it) {
                        item = it;
                        break;
                    }
                }
            }
            return item;
        }
    }
}
