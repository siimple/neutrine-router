import React from "react";
import {Router} from "../router.js";
import {unescape} from "../util/unescape.js";

//Get the current hash
let getCurrentHashbangPath = function () {
    //Get the current hash value
    //let hash = unescape(window.location.hash.substring(1));
    let hash = window.location.hash.substring(1);
    //Check for empty hash --> home route
    if (hash.trim() === "") {
        return "/";
    }
    //Check if is a vaid hashbang url
    return (hash.charAt(0) === "!") ? hash.substring(1) : "/";
};

//Hashbang router component
export class HashbangRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "path": getCurrentHashbangPath() //Get current path
        };
        //Bind hash change method
        this.handleHashChange = this.handleHashChange.bind(this);
    }
    //Hash change listener
    handleHashChange() {
        return this.setState({
            "path": getCurrentHashbangPath()
        });
    }
    //Component did mount
    componentDidMount () {
        let self = this;
        window.addEventListener("hashchange", self.handleHashChange, false);
    }
    //Component will unmount
    componentWillUnmount() {
        let self = this;
        window.removeEventListener("hashchange", self.handleHashChange); 
    }
    //Render the router component
    render() {
        return React.createElement(Router, {"path": this.state.path}, this.props.children);
    }
}

//Hashbang redirect
export function redirectHashbang (path) {
    if (typeof path !== "string") {
        //Invalid path
        throw new Error("Expected string path in redirect method");
    }
    //Parse the path string --> trim the path 
    let parsedPath = path.trim();
    //while (parsedPath.charAt(0) === "#" || parsedPath.charAt(0) === "!") {
    //    parsedPath = parsedPath.substring(1);
    //}
    //Check if the first character is not a slash mark
    if (parsedPath.charAt(0) !== "/") {
        parsedPath = "/" + parsedPath;
    }
    window.location.hash = "#!" + parsedPath;
}

