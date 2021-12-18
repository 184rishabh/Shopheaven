import React , {Component} from "react";
import { Route ,Redirect } from "react-router";
import { isauthenticated } from "./authenticate";

const adminroute=({component:Component,...rest})=>(
    <Route {...rest} render={props=>isauthenticated() && isauthenticated().user.isadmin ? (
        <Component {...props}/>
    ) : (
        <Redirect to={{pathname:"/login"}}/>
    )}
    />
)

export default adminroute;