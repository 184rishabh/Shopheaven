import React , {Component} from "react";
import { Route ,Redirect } from "react-router";
import { isauthenticated } from "./authenticate";

const privateroute=({component:Component,...rest})=>(
    <Route {...rest} render={props=>isauthenticated() ? (
        <Component {...props}/>
    ) : (
        <Redirect to={{pathname:"/login"}}/>
    )}
    />
)

export default privateroute;