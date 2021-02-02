import {Popup} from 'semantic-ui-react';
import React from 'react'

function Signal({ content, children}){
    return <Popup inverted content={content} trigger = {children}/>
}

export default Signal;