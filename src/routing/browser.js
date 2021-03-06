import {addLeadingSlash} from "../util/paths.js";

//Get the current path with a leading slash
let getCurrentBrowserPath = function () {
    return addLeadingSlash(window.location.pathname + window.location.search + window.location.hash);
};

//Browser history routing manager
export class BrowserRouting {
    constructor(listener) {
        this.type = "browser"; //Save routing type
        this.listener = listener;
    }
    //Get the current path
    getCurrentPath() {
        return getCurrentBrowserPath();
    }
    //Mount the listener
    mount() {
        let self = this;
        window.addEventListener("popstate", self.listener, false);
    }
    //Component will unmount listener
    unmount() {
        let self = this;
        window.removeEventListener("popstate", self.listener, false);
    }
    //Redirect to the provided url
    redirect(newPath) {
        let self = this;
        window.history.pushState({}, null, addLeadingSlash(newPath)); //Add to the history
        //Terrible hack to automatically call the listener with the new path
        return setTimeout(function () {
            return self.listener(); //Call the listener manually
        }, 10);
    }
}

