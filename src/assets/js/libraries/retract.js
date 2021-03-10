/*global window, console*/
/*jshint esversion:6*/

/*
 * Author: John Sanchez Alvarez
 * Email: esutoraiki@gmail.com
 * Description:
 * Creation : 20190910
 *
 */

class Retract {
    constructor(attr_e) {
        let attr = attr_e || {};

        this.node = attr.node || document;
        this.selector = attr.selector || "retract_js";
        this.class_i = attr.class_items || "item_js";
        this.class_t = attr.class_title || "title_js";
        this.class_c = attr.class_content || "content_js";
        this.class_h = attr.class_hide || "hide_js";
        this.accordion = attr.accordion || false;

        this.object = this.node.getElementsByClassName(this.selector);
        this.clickHandler = [];
        this.status_r = "none";
    }

    static version() {
        return "20190929";
    }

    static creation() {
        return "20190910";
    }

    init() {
        for (let object of this.object) {
            for (let item of object.getElementsByClassName(this.class_i)) {
                let content,
                    hc;

                for (let content_item of item.getElementsByClassName(this.class_c)) {
                    // find height
                    content = content_item;
                    hc = content.scrollHeight + "px";
                    // end find height

                    // initial class
                    item.classList.remove(this.class_h);

                    if (typeof item.dataset.openRetract === "undefined") {
                        item.classList.add(this.class_h);
                        content.style.setProperty("height", "0");
                    } else {
                        content.style.setProperty("height", hc);
                    }
                    // end initial class
                }

                // click event
                this.clickHandler.push(this.click_title.bind(this, item, object));
                item.getElementsByClassName(this.class_t)[0]
                    .addEventListener("click", this.clickHandler[this.clickHandler.length - 1]);
                // end click event
            }
        }

        // resize event
        this.resizeHandler = this.collapse.bind(this);
        window.addEventListener("resize", this.resizeHandler);

        this.status_r = "init";
        return this;
    }

    collapse() {
        for (let object of this.object) {
            for (let item of object.getElementsByClassName(this.class_i)) {
                let content = item.getElementsByClassName(this.class_c)[0];

                item.classList.add(this.class_h);
                content.style.setProperty("height", "0");
            }
        }
    }

    click_title(item, object) {
        let item_class = item.classList,
            content,
            hc,
            sentinel;

        item_class.toggle(this.class_h);

        for (let content_item of item.getElementsByClassName(this.class_c)) {
            content = content_item;
            hc = content.scrollHeight + "px";

            if (this.accordion) {
                sentinel = item_class.contains(this.class_h);

                for (let item_a of object.getElementsByClassName(this.class_i)) {
                    let content = item_a.getElementsByClassName(this.class_c)[0];

                    item_a.classList.add(this.class_h);
                    content.style.setProperty("height", "0");

                    if (!sentinel) {
                        item_class.remove(this.class_h);
                    }
                }
            }

            if (item_class.contains(this.class_h)) {
                content.style.setProperty("height", "0");
            } else {
                content.style.setProperty("height", hc);
            }
        }

        /*
        if (!item_class.contains(this.class_h)) {
            // Adjusting the height
            window.setTimeout(() => {
                for( let content_item of item.getElementsByClassName(this.class_c)) {
                    hc = content_item.scrollHeight + "px";
                    content_item.style.setProperty("height", hc);
                }
            }, 320);
        }
        */

    }

    destroy() {
        if (this.status_r !== "destroy") {
            for (let object of this.object) {
                for (let item of object.getElementsByClassName(this.class_i)) {
                    item.classList.remove(this.class_h); // remove class hide
                    item.getElementsByClassName(this.class_c)[0].removeAttribute("style"); // remove attr style

                    // remove title event
                    for (let handler of this.clickHandler) {
                        item.getElementsByClassName(this.class_t)[0]
                            .removeEventListener("click", handler);
                    } // end remove title event

                    window.removeEventListener("resize", this.resizeHandler); // remove resize event
                }
            }

            this.status_r = "destroy";
        }

        return this;
    }

    getStatus() {
        return this.status_r;
    }
}
